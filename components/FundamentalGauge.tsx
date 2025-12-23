
import React from 'react';
import { BarChart4, Activity, ShieldCheck, Zap, TrendingUp, Info, ShieldAlert, Cpu, Layers, MousePointer2, PieChart, LineChart, MoveUpRight, ArrowDownRight, Globe } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  status: 'Optimal' | 'Fair' | 'Healthy' | 'Stable' | 'Caution';
  desc: string;
  type: 'CORE' | 'RISK' | 'CAPITAL' | 'SHORT_TERM' | 'TECHNICAL';
}

const FundamentalGauge: React.FC = () => {
  const metrics: Metric[] = [
    { label: 'ROIC vs WACC Spread', value: '+8.4%', status: 'Optimal', desc: 'Elite capital efficiency multiplier.', type: 'CAPITAL' },
    { label: 'Institutional Flow (Net)', value: 'Overweight', status: 'Optimal', desc: 'Concentrated FII/DII accumulation.', type: 'CORE' },
    { label: 'Price Velocity (10D)', value: 'Accelerating', status: 'Healthy', desc: 'Positive short-term momentum delta.', type: 'SHORT_TERM' },
    { label: 'Altman Z-Score', value: '5.2', status: 'Healthy', desc: 'Superior balance sheet durability.', type: 'RISK' },
    { label: 'RSI / ADX Profile', value: 'Bullish', status: 'Stable', desc: 'Strong trend strength confirmation.', type: 'TECHNICAL' },
    { label: 'Liquidity Depth', value: 'High', status: 'Optimal', desc: 'Minimal slippage on large tickets.', type: 'CORE' },
    { label: 'Systemic Beta', value: '0.82', status: 'Healthy', desc: 'Lower volatility relative to NIFTY 50.', type: 'RISK' },
    { label: 'Fibonacci Support', value: 'Verified', status: 'Healthy', desc: 'Price holding above 0.618 retracement.', type: 'TECHNICAL' },
  ];

  return (
    <div className="bg-[#12141c] border border-indigo-500/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
      {/* Institutional Grid Mask */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
            <Cpu className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Institutional Audit Node</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Registry: SK-MUM-NODE-01</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Real-time Sync</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-5 relative z-10">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#0a0b10]/40 backdrop-blur-xl border border-white/5 p-5 rounded-2xl hover:border-indigo-500/30 hover:bg-[#0a0b10]/60 transition-all group/item">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{m.label}</span>
              <div className={`p-1.5 rounded-lg ${
                m.type === 'RISK' ? 'bg-rose-500/10' : 
                m.type === 'SHORT_TERM' ? 'bg-amber-500/10' : 
                m.type === 'TECHNICAL' ? 'bg-blue-500/10' : 'bg-indigo-500/10'}`}>
                {m.type === 'RISK' ? <ShieldAlert className="w-3 h-3 text-rose-500" /> : 
                 m.type === 'SHORT_TERM' ? <TrendingUp className="w-3 h-3 text-amber-500" /> : 
                 m.type === 'TECHNICAL' ? <LineChart className="w-3 h-3 text-blue-500" /> :
                 <Activity className="w-3 h-3 text-indigo-500" />}
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-white tracking-tighter font-mono">{m.value}</span>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                m.status === 'Optimal' || m.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
              }`}>{m.status}</span>
            </div>
            <p className="text-[9px] text-slate-600 font-bold mt-3 leading-tight uppercase opacity-0 group-hover/item:opacity-100 transition-all">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-3xl relative overflow-hidden z-10 shadow-inner">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Zap className="w-24 h-24 text-indigo-500" />
        </div>
        <div className="flex items-center gap-3 text-[10px] font-black text-indigo-400 uppercase mb-4 tracking-[0.2em]">
          <Zap className="w-4 h-4" />
          Institutional Audit Summary
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-semibold italic border-l-4 border-indigo-500/50 pl-5 mb-6">
          "Target entity demonstrates <span className="text-white">superior capital allocation durability</span>. Quantitative technical factors confirm a structural breakout, supported by robust institutional delivery accumulation and RSI momentum stability."
        </p>
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                ))}
              </div>
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Multi-Channel Data Sync Active</span>
           </div>
           <div className="text-[11px] font-black text-emerald-400 bg-emerald-500/10 px-5 py-2 rounded-xl border border-emerald-500/20 animate-pulse uppercase tracking-[0.1em]">
             ALPHA CONVICTION: HIGH
           </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentalGauge;
