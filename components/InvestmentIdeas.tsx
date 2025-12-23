
import React, { useState } from 'react';
import { Target, ShieldCheck, ChevronRight, BarChart4, Star, Zap, Loader2, Sparkles, AlertCircle, Info, TrendingUp, Globe } from 'lucide-react';
import { conductTopDownResearch } from '../services/marketIntelligence';
import { TopDownOpportunity } from '../types';

interface Props {
  onSelectOpportunity?: (ticker: string) => void;
}

const InvestmentIdeas: React.FC<Props> = ({ onSelectOpportunity }) => {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<TopDownOpportunity[]>([
    { company: 'HDFC Bank', ticker: 'HDFCBANK', sector: 'Financials', rating: 'ACCUMULATE', upside: '22%', rationale: 'Valuations at 5-year lows, strong credit growth expected.', institutionalScore: 88 },
    { company: 'Tata Motors', ticker: 'TATAMOTORS', sector: 'Auto', rating: 'BUY', upside: '18%', rationale: 'Dominance in EV segment and JLR margin expansion.', institutionalScore: 92 },
    { company: 'Infosys', ticker: 'INFY', sector: 'IT Services', rating: 'HOLD', upside: '8%', rationale: 'Conservative guidance but strong deal pipeline.', institutionalScore: 78 },
  ]);
  const [lastScan, setLastScan] = useState<string | null>(null);

  const handleScan = async () => {
    setLoading(true);
    try {
      const result = await conductTopDownResearch();
      if (result.topDownOpportunities && result.topDownOpportunities.length > 0) {
        setIdeas(result.topDownOpportunities);
      }
      setLastScan(new Date().toLocaleTimeString());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#12141c] border border-[#262b3d] rounded-3xl overflow-hidden shadow-2xl transition-all hover:shadow-indigo-500/10">
      <div className="bg-[#1a1d29] px-6 py-5 border-b border-[#262b3d] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/10 rounded-xl border border-indigo-500/20">
            <Globe className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Top-Down Alpha Hub</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Macro -> Sector -> Equity Selection</p>
          </div>
        </div>
        <button 
          onClick={handleScan}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl text-[10px] font-black transition-all shadow-xl active:scale-95 uppercase tracking-widest"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {loading ? 'Reasoning...' : 'Scan Best Opportunities'}
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
              <Sparkles className="w-12 h-12 text-indigo-500 animate-pulse" />
              <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full animate-ping" />
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mb-2">Executing Institutional Multi-Factor Audit</p>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-600 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>
          </div>
        ) : (
          <>
            {ideas.map((idea, idx) => (
              <div 
                key={idx} 
                onClick={() => onSelectOpportunity?.(idea.ticker)}
                className="bg-[#0a0b10] border border-white/5 p-5 rounded-2xl hover:border-indigo-500/30 transition-all group cursor-pointer relative overflow-hidden"
              >
                {/* Score Tab */}
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-indigo-500/10 border-b border-l border-indigo-500/20 rounded-bl-xl">
                   <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Savan Score</span>
                      <span className="text-xs font-black text-indigo-400">{idea.institutionalScore}</span>
                   </div>
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-black text-white leading-tight tracking-tight group-hover:text-indigo-400 transition-colors">{idea.company}</h4>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-tighter">{idea.ticker}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">{idea.sector}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border ${
                      idea.rating === 'BUY' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 'bg-indigo-500/5 text-indigo-400 border-indigo-500/20'
                    }`}>
                      {idea.rating}
                    </span>
                    <p className="text-sm font-black text-emerald-400 mt-2.5 flex items-center justify-end gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {idea.upside} Upside
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-5 font-medium border-l-2 border-white/5 pl-4 italic">
                  "{idea.rationale}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase">
                       <ShieldCheck className="w-4 h-4 text-emerald-500" />
                       Moat: Wide
                     </div>
                     <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase">
                       <BarChart4 className="w-4 h-4 text-indigo-500" />
                       Fundamental: Elite
                     </div>
                   </div>
                   <div className="flex items-center gap-1.5 text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                     Audit Breakdown
                     <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            ))}

            {lastScan && (
              <div className="flex items-center gap-2 justify-center pt-2">
                <AlertCircle className="w-3.5 h-3.5 text-slate-700" />
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Last Institutional Audit Sync: {lastScan}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-black/20 p-5 border-t border-white/5 flex items-center justify-center gap-4 group/footer cursor-help">
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] group-hover/footer:text-slate-400 transition-colors">
          Institutional Node SK-2025-01 Operating at Full Capacity
        </span>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default InvestmentIdeas;
