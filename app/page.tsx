'use client';
import '../styles/globals.css';

import BlogForm from './components/BlogForm';
import History from './components/History';
import { useState } from 'react';

<h1 className="bg-red-500 text-white text-5xl p-10">If This Is Not Red, Tailwind Is NOT Working!</h1>

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const [dark, setDark] = useState(false);

  return (
    <main className={dark 
      ? "min-h-screen bg-gradient-to-br from-zinc-900 via-gray-900 to-black flex flex-col items-center justify-center px-2 transition-colors"
      : "min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-white flex flex-col items-center justify-center px-2 transition-colors"}>
      
      {/* Dark mode toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-6 right-6 bg-black/60 dark:bg-white/80 text-white dark:text-gray-800 rounded-full p-2 shadow-lg z-50 border border-white/20 hover:scale-110 transition"
        title="Toggle Dark/Light Mode"
      >
        {dark ? '🌞' : '🌙'}
      </button>
      
      <div className="w-full max-w-xl">
        {/* Hero Card */}
        <div className={
            dark 
            ? "relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-10 mx-auto flex flex-col items-center animate-fade-in"
            : "relative z-10 bg-white/90 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-2xl p-10 mx-auto flex flex-col items-center animate-fade-in"
          }>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3580/3580166.png"
            alt="Blog Summariser Logo"
            className="w-14 h-14 mb-2 rounded-2xl shadow-lg bg-blue-50"
          />
          <h1 className={
            "text-3xl md:text-4xl font-extrabold text-center mb-2 tracking-tight" +
            (dark ? " text-white" : " text-blue-700")
          }>
            Blog Summariser <span className={dark ? "text-pink-400" : "text-indigo-500"}>(with Urdu)</span>
          </h1>
          <p className={
            "text-md text-center mb-6 " +
            (dark ? "text-zinc-200" : "text-gray-500")
          }>
            Paste any blog URL to get a quick English summary <br />
            <span className={dark ? "text-pink-200" : "text-indigo-500"}>— and its Urdu translation!</span>
          </p>
          <BlogForm onSuccess={() => setRefresh(r => r + 1)} />
        </div>

        {/* History Timeline */}
        <div className="mt-10 animate-fade-in-slow">
          <History refresh={refresh} dark={dark}/>
        </div>
      </div>

      <footer className="text-center mt-16 mb-2 text-gray-400 text-xs animate-fade-in-slow">
        Assignment 2 &copy; {new Date().getFullYear()} • Powered by Next.js, Tailwind & AI
      </footer>
      
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.33,.67,.55,1.26) both;
        }
        @keyframes fade-in-slow {
          from { opacity: 0;}
          to { opacity: 1;}
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 2s ease both;
        }
      `}</style>
    </main>
  );
}
