import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { supabase } from '@/lib/supabase';
import clientPromise from '@/lib/mongodb';

// Simple static Urdu dictionary (expand as you like)
const urduDict: Record<string, string> = {
  "blog": "بلاگ", "summary": "خلاصہ", "the": "یہ", "is": "ہے", "about": "کے بارے میں",
  "and": "اور", "it": "یہ", "in": "میں", "a": "ایک", "this": "یہ", "to": "پر",
};

function fakeSummarise(text: string) {
  const sentences = text.split('.').map(s => s.trim()).filter(Boolean);
  return sentences.slice(0, 2).join('. ') + (sentences.length >= 2 ? '.' : '');
}

function translateToUrdu(summary: string) {
  return summary
    .split(' ')
    .map(word => urduDict[word.toLowerCase()] || word)
    .join(' ');
}

// POST: summarise and save
export async function POST(req: NextRequest) {
  const { url } = await req.json();
  try {
    // Scrape
    const { data } = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(data);
    const text = $('article').text() || $('body').text();
    if (!text || text.length < 50) {
      return NextResponse.json({ error: 'Could not extract blog text.' }, { status: 400 });
    }

    // Summary and translate
    const summary = fakeSummarise(text);
    const urduSummary = translateToUrdu(summary);

    // Save summary in Supabase
    await supabase.from('summaries').insert([
      { url, summary, urdu_summary: urduSummary, created_at: new Date().toISOString() }
    ]);

    // Save full blog in MongoDB
    const client = await clientPromise;
    const db = client.db();
    await db.collection('blog_texts').insertOne({
      url,
      text,
      created_at: new Date(),
    });

    return NextResponse.json({ summary, urduSummary });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to process blog.' }, { status: 500 });
  }
}

// GET: latest 5 summaries for UI
export async function GET() {
  const { data } = await supabase.from('summaries').select('*').order('created_at', { ascending: false }).limit(5);
  return NextResponse.json({ data });
}
