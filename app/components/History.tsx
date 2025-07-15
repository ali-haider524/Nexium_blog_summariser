'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

type Summary = { url: string; summary: string; urdu_summary: string; created_at: string };

export default function History({ refresh, dark }: { refresh?: any, dark?: boolean }) {
  const [items, setItems] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/summarise')
      .then(res => res.json())
      .then(data => {
        setItems(data.data || []);
        setLoading(false);
      });
  }, [refresh]);

  if (loading) return <div className="text-center mt-4">Loading history...</div>;
  if (!items.length) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <h2 className={`font-bold text-2xl mb-7 ${dark ? 'text-white' : 'text-blue-800'}`}>Recent Summaries</h2>
      <ol className="relative border-l-2 border-blue-200 dark:border-zinc-600 space-y-8 pl-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-4 group animate-fade-in">
            <span className={`flex-shrink-0 w-4 h-4 mt-2 rounded-full border-2 border-white 
              ${dark ? 'bg-pink-600' : 'bg-blue-500'} shadow-lg group-hover:scale-110 transition`}></span>
            <Card className={`flex-1 shadow-lg rounded-xl border-0 transition hover:shadow-xl ${dark ? 'bg-zinc-900/90' : 'bg-white/90'}`}>
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" 
                     className={`font-semibold underline ${dark ? 'text-pink-400' : 'text-blue-700'}`}>
                    {item.url.replace(/^https?:\/\//, '').slice(0, 40)}{item.url.length > 40 && "..."}
                  </a>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${dark ? 'bg-zinc-700 text-pink-200' : 'bg-blue-50 text-blue-500'}`}>
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>
                <div>
                  <strong className={dark ? "text-pink-300" : "text-blue-600"}>Summary:</strong>
                  <span> {item.summary}</span>
                </div>
                <div className="mt-1" dir="rtl">
                  <strong className={dark ? "text-pink-300" : "text-indigo-600"}>Urdu:</strong>
                  <span className="font-urdu text-xl"> {item.urdu_summary}</span>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(.33,.67,.55,1.26) both;
        }
      `}</style>
    </div>
  );
}
