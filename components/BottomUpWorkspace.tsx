
import React, { useState } from 'react';
import { Search, Zap, Cpu, Loader2, Briefcase, TrendingUp, AlertCircle, LayoutDashboard, Fingerprint } from 'lucide-react';
import { conductBottomUpAnalysis } from '../services/marketIntelligence';
import { ResearchOutput } from '../types';
import BottomUpReport from './BottomUpReport';

const BottomUpWorkspace: React.FC = () => {
  const [mode, setMode] = useState<'ENTITY' | 'NEWS_IMPACT'>('ENTITY');
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<ResearchOutput | null>(null);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsAnalyzing(true);
    setReport(null);
    try {
      const result = await conductBottomUpAnalysis(query, mode);
      setReport(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col gap-8 animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
      {/* Control Module */}
      <div className="bg-[#0f1117] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-indigo-600/10 rounded-2xl border border-indigo-500/20">
              <Briefcase className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Institutional Alpha Hub</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Bottom-Up Research Engine</p>
            </div>
          </div>

          <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setMode('ENTITY')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${mode === 'ENTITY' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-white'}`}
            >
              <Fingerprint className="w-3.5 h-3.5" />
              Company Audit
            </button>
            <button 
              onClick={() => setMode('NEWS_IMPACT')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${mode === 'NEWS_IMPACT' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-white'}`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Impact Mapping
            </button>
          </div>
        </div>

        <form onSubmit={handleRun} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={mode === 'ENTITY' ? "Enter Company (e.g. Reliance, HDFC)..." : "Enter News Event (e.g. H1-B Visa price hike)..."}
              className="w-full bg-[#050505] border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-sm text-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all font-medium"
            />
          </div>
          <button 
            type="submit"
            disabled={isAnalyzing || !query.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white text-[10px] font-black px-12 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            Initiate Reasoning
          </button>
        </form>
      </div>

      {/* Results Workspace */}
      <div className="flex-grow">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-40">
             <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mb-10 relative">
               <Cpu className="w-10 h-10 text-indigo-500 animate-spin" />
               <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full animate-ping opacity-20" />
             </div>
             <h2 className="text-sm font-black text-white uppercase tracking-[0.6em] mb-4">Activating Institutional Reasoning</h2>
             <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">Cross-referencing global data pools...</p>
          </div>
        ) : report ? (
          <BottomUpReport data={report} query={query} />
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center opacity-30">
             <div className="p-10 bg-white/5 rounded-full mb-8">
                <Search className="w-20 h-20 text-slate-500" />
             </div>
             <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-3">Analysis Node Standby</h3>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest max-w-sm leading-relaxed">Select analysis mode and enter search parameters to begin deep bottom-up research.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomUpWorkspace;
