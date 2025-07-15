'use client';
import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

export default function BlogForm({ onSuccess }: { onSuccess?: () => void }) {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{ summary: string, urduSummary: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSummarise(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/summarise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.summary) {
      setResult({ summary: data.summary, urduSummary: data.urduSummary });
      setUrl('');
      onSuccess?.();
    } else {
      alert(data.error || 'Failed to summarise blog.');
    }
  }

  return (
    <Card className="w-full shadow-md rounded-xl border-blue-100">
      <CardContent className="py-6 px-4">
        <form onSubmit={handleSummarise} className="flex flex-col gap-4 items-center">
          <Input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Paste Blog URL"
            required
            className="text-lg px-4 w-full max-w-md border-blue-300 focus:border-blue-600 transition"
          />
          <Button type="submit" disabled={loading} className="w-full font-bold bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 transition text-white">
            {loading ? (
              <span>
                <span className="loader mr-2"></span> Summarising...
              </span>
            ) : "Summarise"}
          </Button>
        </form>
        {result && (
          <div className="mt-8 space-y-3 text-left">
            <h3 className="font-bold text-lg mb-1 text-blue-700">Summary:</h3>
            <div className="bg-gray-50 border border-blue-100 rounded-md p-3">{result.summary}</div>
            <h3 className="font-bold text-lg mt-4 mb-1 text-indigo-700">Urdu Translation:</h3>
            <div dir="rtl" className="bg-gray-50 border border-indigo-100 rounded-md p-3 font-urdu text-xl leading-loose">
              {result.urduSummary}
            </div>
          </div>
        )}
      </CardContent>
      <style jsx>{`
        .loader {
          border: 2px solid #e5e7eb;
          border-top: 2px solid #6366f1;
          border-radius: 50%;
          width: 1.25em;
          height: 1.25em;
          animation: spin 1s linear infinite;
          display: inline-block;
          vertical-align: middle;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </Card>
  );
}
