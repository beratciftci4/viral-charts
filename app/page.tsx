'use client';

import React, { useState, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Download, LayoutTemplate, Palette, Type, Sparkles, Loader2 } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

export default function Home() {
  // --- STATE MANAGEMENT ---
  // Default data is now in English
  const [csvData, setCsvData] = useState(`Year,Revenue
2020,500
2021,850
2022,1200
2023,1900
2024,3200`);
  
  const [chartColor, setChartColor] = useState('#8b5cf6'); // Default: Purple
  const [chartType, setChartType] = useState<'bar' | 'area'>('bar');
  const [chartTitle, setChartTitle] = useState('Annual Revenue Growth');
  const [aiInsight, setAiInsight] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null);

  // --- DATA PARSING ---
  const parseData = (text: string) => {
    try {
      const lines = text.trim().split('\n');
      return lines.slice(1).map((line) => {
        const values = line.split(/[,\t]/);
        return {
          name: values[0],
          value: parseFloat(values[1]) || 0,
        };
      });
    } catch (e) {
      return [];
    }
  };

  const chartData = parseData(csvData);

  // --- API INTERACTION ---
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAiInsight(''); 
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataInput: csvData }),
      });
      
      const data = await response.json();
      setAiInsight(data.result);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAiInsight("Connection error. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- IMAGE DOWNLOAD ---
  const handleDownload = async () => {
    if (chartRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(chartRef.current);
        const link = document.createElement('a');
        link.download = 'viral-chart.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Download failed:", err);
      }
    }
  };

  return (
    <main className="min-h-screen p-8 bg-black text-white font-sans selection:bg-purple-500/30">
      
      {/* HEADER */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
          Viral Charts <span className="text-xs bg-white text-black px-2 py-1 rounded-full ml-2 align-middle">AI</span>
        </h1>
        <p className="text-zinc-500">Paste your data, customize the style, let AI analyze it.</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT PANEL: CONTROLS */}
        <div className="space-y-8">
          
          {/* DATA INPUT SECTION */}
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <LayoutTemplate size={18} />
                <h2 className="font-semibold text-sm uppercase tracking-wide">Dataset</h2>
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-xs font-bold px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
              >
                {isAnalyzing ? <Loader2 size={14} className="animate-spin"/> : <Sparkles size={14} />}
                {isAnalyzing ? 'Analyzing...' : 'AI Analyze'}
              </button>
            </div>
            <textarea
              className="w-full h-64 bg-black/50 border border-zinc-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all"
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              placeholder="Year,Value..."
            />
          </div>

          {/* DESIGN CONTROLS SECTION */}
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-6">
            <div className="flex items-center gap-2 mb-4 text-zinc-400">
              <Palette size={18} />
              <h2 className="font-semibold text-sm uppercase tracking-wide">Design</h2>
            </div>

            {/* Chart Type Selector */}
            <div>
              <label className="text-xs text-zinc-500 mb-2 block">Chart Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setChartType('bar')} 
                  className={`p-2 rounded-lg text-sm border transition-all ${chartType === 'bar' ? 'bg-zinc-800 border-zinc-600 text-white' : 'border-transparent text-zinc-500 hover:bg-zinc-800/50'}`}
                >
                  Bar
                </button>
                <button 
                  onClick={() => setChartType('area')} 
                  className={`p-2 rounded-lg text-sm border transition-all ${chartType === 'area' ? 'bg-zinc-800 border-zinc-600 text-white' : 'border-transparent text-zinc-500 hover:bg-zinc-800/50'}`}
                >
                  Area
                </button>
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <label className="text-xs text-zinc-500 mb-2 block">Theme Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={chartColor} 
                  onChange={(e) => setChartColor(e.target.value)} 
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" 
                />
                <span className="text-xs font-mono text-zinc-400">{chartColor}</span>
              </div>
            </div>

             {/* Title Input */}
             <div>
              <label className="text-xs text-zinc-500 mb-2 block">Chart Title</label>
              <div className="flex items-center gap-2 bg-black/50 border border-zinc-700 rounded-lg px-3 py-2">
                <Type size={14} className="text-zinc-500"/>
                <input 
                  type="text" 
                  value={chartTitle} 
                  onChange={(e) => setChartTitle(e.target.value)} 
                  className="bg-transparent text-sm w-full outline-none text-white placeholder-zinc-600" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="lg:col-span-2 flex flex-col items-center justify-start pt-10">
          
          {/* Exportable Area */}
          <div 
            ref={chartRef}
            className="bg-zinc-950 p-12 rounded-xl border border-zinc-800 shadow-2xl w-full max-w-3xl flex flex-col relative overflow-hidden group"
          >
            {/* Top Gradient Line */}
            <div 
              className="absolute top-0 left-0 w-full h-1 opacity-80" 
              style={{ background: `linear-gradient(90deg, transparent, ${chartColor}, transparent)` }} 
            />
            
            {/* Window Controls Decoration */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-white tracking-tight">{chartTitle}</h3>
              </div>
            </div>

            {/* Chart Rendering */}
            <div className="w-full aspect-video">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#666" 
                      tick={{fill: '#666', fontSize: 12}} 
                      axisLine={false} 
                      tickLine={false} 
                      dy={10} 
                    />
                    <YAxis 
                      stroke="#666" 
                      tick={{fill: '#666', fontSize: 12}} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                    />
                    <Bar dataKey="value" fill={chartColor} radius={[6, 6, 0, 0]} animationDuration={1000} />
                  </BarChart>
                ) : (
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#666" 
                      tick={{fill: '#666', fontSize: 12}} 
                      axisLine={false} 
                      tickLine={false} 
                      dy={10} 
                    />
                    <YAxis 
                      stroke="#666" 
                      tick={{fill: '#666', fontSize: 12}} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={chartColor} 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      strokeWidth={3} 
                      animationDuration={1000} 
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* AI Insight Box */}
            {aiInsight && (
              <div className="mt-6 p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                <div className="flex gap-3">
                  <Sparkles className="text-purple-400 shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">AI Insight</h4>
                    <p className="text-sm text-zinc-300 leading-relaxed font-medium">{aiInsight}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="absolute bottom-4 right-6 text-zinc-700 text-xs font-mono font-bold opacity-50">
              viral-charts.app
            </div>
          </div>

          <button 
            onClick={handleDownload} 
            className="mt-8 group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
            <span className="font-bold">Export Chart</span>
          </button>
        </div>
      </div>
    </main>
  );
}