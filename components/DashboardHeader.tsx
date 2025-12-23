
import React, { useState, useEffect } from 'react';
import { Activity, LogOut, Calendar, Database, Sparkles, Cpu, RefreshCcw } from 'lucide-react';
import { PriceData } from '../types';

interface Props {
  user: { email: string; name: string };
  onLogout: () => void;
  onRefresh: () => void;
}

const DashboardHeader: React.FC<Props> = ({ user, onLogout, onRefresh }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-[#050505]/80 border-b border-white/5 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-0 z-50 backdrop-blur-2xl">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-2xl shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white leading-none tracking-tighter uppercase">SK Alpha Intelligence</h1>
            <span className="text-[9px] text-blue-400 font-black uppercase tracking-[0.4em] block mt-1.5 opacity-80 flex items-center gap-2">
              <Sparkles className="w-2 h-2" />
              AI SMART Intelligence Portal
            </span>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-white/10 hidden xl:block" />

        <div className="hidden lg:flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Global Status</span>
            <div className="flex items-center gap-1.5">
               <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
               <span className="text-[8px] text-blue-400 font-black uppercase">Institutional Node Active</span>
            </div>
          </div>
          <span className="text-lg font-mono font-black text-white tracking-tighter uppercase">
            Global Equity Research Portal
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden 2xl:flex flex-col items-end">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">
            <Calendar className="w-3 h-3 text-blue-500" />
            {currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
            <Database className="w-3 h-3 text-blue-500" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
              Registry: <span className="text-emerald-400">Verified</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] text-white font-black uppercase truncate max-w-[150px] tracking-tight">{user.name}</p>
            <button 
              onClick={onLogout}
              className="text-[9px] text-rose-500 font-black hover:text-rose-400 transition-all mt-0.5 uppercase tracking-widest"
            >
              Terminate Session
            </button>
          </div>
          <button 
            onClick={onRefresh}
            className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/5 hover:text-white hover:border-blue-500 transition-all group"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-black shadow-2xl shadow-blue-600/20 border border-white/10 ring-4 ring-blue-500/5">
            <span className="text-lg">{user.name.charAt(0)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
