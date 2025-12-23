
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Activity, Terminal, Download, Trash2, RefreshCcw, Database, Search } from 'lucide-react';
import { GoogleSheetsService } from '../services/googleSheetsService';
import { AdminLog } from '../types';

const AdminPanel: React.FC = () => {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    setLogs(GoogleSheetsService.getLogs());
  };

  const filteredLogs = logs.filter(log => 
    log.email.toLowerCase().includes(filter.toLowerCase()) || 
    log.mobile.includes(filter)
  );

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Mobile,Timestamp,Metadata\n"
      + logs.map(e => `${e.email},${e.mobile},${e.timestamp},${e.metadata}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Alpha_Terminal_Audit_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="flex-grow flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#12141c] border border-blue-500/20 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-500/10 p-2.5 rounded-xl">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Terminal Accesses</span>
          </div>
          <div className="text-3xl font-black text-white font-mono">{logs.length}</div>
        </div>
        
        <div className="bg-[#12141c] border border-emerald-500/20 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-500/10 p-2.5 rounded-xl">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active System Nodes</span>
          </div>
          <div className="text-3xl font-black text-white font-mono">Mum-01 / Blr-04</div>
        </div>

        <div className="bg-[#12141c] border border-indigo-500/20 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-indigo-500/10 p-2.5 rounded-xl">
              <Database className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Master Cloud Status</span>
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SYNCED
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-[#12141c] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 border-b border-white/5 bg-black/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Institutional Audit Trail</h3>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input 
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search Email/Mobile..."
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <button 
              onClick={loadLogs}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-all border border-white/5"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">User Email (A)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Mobile Number (B)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp IST (C)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">System Metadata (D)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.length > 0 ? filteredLogs.map((log, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs">
                        {log.email.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-slate-200 font-mono">{log.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-400 font-mono">{log.mobile}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-blue-400/80 font-mono">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 group-hover:text-slate-400 transition-colors">
                      {log.metadata}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-600">
                      <ShieldCheck className="w-12 h-12 opacity-20" />
                      <p className="text-xs font-black uppercase tracking-widest">No terminal sessions recorded.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-black/20 border-t border-white/5 flex justify-between items-center">
           <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">
             Cloud Link: 1LyS8hgsTg-OxPhI0ALZOG61WnWNqQkx0tdRwSppBljg
           </p>
           <button 
             onClick={() => { if(confirm("Institutional Reset?")) { GoogleSheetsService.clearLogs(); loadLogs(); }}}
             className="text-[9px] text-rose-500/50 hover:text-rose-500 font-black uppercase flex items-center gap-2 transition-colors"
           >
             <Trash2 className="w-3 h-3" />
             Clear Local Audit Cache
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
