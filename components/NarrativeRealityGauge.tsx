
import React from 'react';
import { Cpu, Zap, Activity, ShieldAlert, Target } from 'lucide-react';

interface Props {
  fidelityScore?: number;
  managementTone?: number;
  executionReality?: number;
  summary?: string;
  loading?: boolean;
}

const NarrativeRealityGauge: React.FC<Props> = ({ 
  fidelityScore = 75, 
  managementTone = 80, 
  executionReality = 70, 
  summary = "Management claims are generally aligned with capital allocation. Structural moat remains intact.",
  loading = false
}) => {
  const scores = [
    { label: 'Management Tone (AI Sentiment)', value: managementTone, color: 'bg-indigo-500' },
    { label: 'Execution Reality (Asset Audit)', value: executionReality, color: 'bg-emerald-500' },
  ];

  if (loading) {
    return (
      <div className="bg-[#12141c] border border-indigo-500/30 rounded-3xl p-8 flex flex-col items-center justify-center animate-pulse min-h-[300px]">
        <Cpu className="w-12 h-12 text-indigo-500/20 mb-4 animate-spin" />
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Cross-Referencing Earnings Calls with Balance Sheet...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#12141c] border border-indigo-500/30 rounded-3xl p-6 shadow-[0_0_40px_-10px_rgba(79,70,229,0.2)] relative overflow-hidden group">
      {/* Decorative AI Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            Corporate Narrative vs Reality (CNvR)
          </h3>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Grounded Intelligence Audit</p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
          <Zap className="w-3 h-3 text-amber-400" />
          <span className="text-[9px] font-black text-indigo-400 uppercase">Fidelity Engine Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="space-y-6">
          {scores.map((score, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
                <span className="text-slate-400">{score.label}</span>
                <span className="text-white">{score.value}%</span>
              </div>
              <div className="h-2 bg-[#0a0b10] rounded-full overflow-hidden border border-[#262b3d]">
                <div 
                  className={`h-full ${score.color} shadow-[0_0_10px_rgba(79,70,229,0.5)] transition-all duration-1000`}
                  style={{ width: `${score.value}%` }}
                />
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-[#262b3d]">
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium line-clamp-3 italic">
              "{summary}"
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-[#0a0b10] border border-indigo-500/20 rounded-[2.5rem] shadow-inner relative">
          <div className="absolute top-4 right-4 opacity-20">
             <Target className="w-8 h-8 text-indigo-500" />
          </div>
          <div className="relative w-36 h-36 flex items-center justify-center mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
              <circle 
                cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" 
                className="text-indigo-500 transition-all duration-1000"
                strokeDasharray={402}
                strokeDashoffset={402 - (402 * fidelityScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-white font-mono tracking-tighter">{fidelityScore}</span>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">N-Fidelity</span>
            </div>
          </div>
          <div className="text-center">
            <p className={`text-[11px] font-black uppercase mb-1 ${fidelityScore > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {fidelityScore > 70 ? 'Trustworthy Profile' : 'High Hype Warning'}
            </p>
            <p className="text-[8px] text-slate-600 font-medium leading-relaxed uppercase max-w-[150px]">
              {fidelityScore > 70 ? 'Capital allocation supports growth narrative.' : 'Significant gap between management tone and asset growth.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#262b3d] flex items-center justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-indigo-400" />
          Asset Integrity: 0.94
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3 h-3 text-rose-500" />
          Risk Delta: Low
        </div>
      </div>
    </div>
  );
};

export default NarrativeRealityGauge;
