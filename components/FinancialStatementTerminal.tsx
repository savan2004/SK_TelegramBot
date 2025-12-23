
import React from 'react';
import { Database, FileText, TrendingUp, Wallet, ArrowRight } from 'lucide-react';

const FinancialStatementTerminal: React.FC = () => {
  const statementData = {
    balanceSheet: [
      { label: 'Total Equity', value: '₹1,42,500 Cr', delta: '+12%' },
      { label: 'Total Debt', value: '₹42,100 Cr', delta: '-5%', positive: true },
      { label: 'Fixed Assets', value: '₹88,200 Cr', delta: '+8%' },
      { label: 'Cash & Equiv', value: '₹12,400 Cr', delta: '+15%' },
    ],
    cashFlow: [
      { label: 'Operating CF', value: '₹18,200 Cr', health: 'Strong' },
      { label: 'Investing CF', value: '-₹9,400 Cr', health: 'Expanding' },
      { label: 'Financing CF', value: '-₹4,100 Cr', health: 'Repaying' },
      { label: 'Free Cash Flow', value: '₹8,800 Cr', health: 'Elite' },
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#12141c] border border-[#262b3d] rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-[#1a1d29] px-5 py-3 border-b border-[#262b3d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Balance Sheet Audit</span>
          </div>
          <Database className="w-3 h-3 text-slate-600" />
        </div>
        <div className="p-4 space-y-3">
          {statementData.balanceSheet.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#0a0b10] border border-[#262b3d] rounded-xl hover:bg-indigo-500/5 transition-colors group">
              <span className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</span>
              <div className="text-right">
                <div className="text-sm font-black text-white font-mono">{item.value}</div>
                <div className={`text-[9px] font-black ${item.positive ? 'text-emerald-500' : 'text-slate-500'}`}>
                  {item.delta} vs LY
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#12141c] border border-[#262b3d] rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-[#1a1d29] px-5 py-3 border-b border-[#262b3d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Cash Flow Velocity</span>
          </div>
          <TrendingUp className="w-3 h-3 text-slate-600" />
        </div>
        <div className="p-4 space-y-3">
          {statementData.cashFlow.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#0a0b10] border border-[#262b3d] rounded-xl hover:bg-emerald-500/5 transition-colors">
              <span className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</span>
              <div className="text-right">
                <div className="text-sm font-black text-white font-mono">{item.value}</div>
                <div className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">
                  {item.health}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialStatementTerminal;
