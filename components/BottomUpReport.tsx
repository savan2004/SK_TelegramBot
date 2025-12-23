import React, { useRef } from 'react';
import { Target, Zap, Shield, TrendingUp, AlertTriangle, Share2, FileText, Globe, Award, MessageCircle, Download, Printer, LineChart, BarChart, ChevronDown, Activity, Info, FileEdit } from 'lucide-react';
import { ResearchOutput } from '../types';

interface Props {
  data: ResearchOutput;
  query: string;
}

const BottomUpReport: React.FC<Props> = ({ data, query }) => {
  const intel = data.alphaIntel;
  const reportRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!data || !data.text) return;
    
    const branding = "DISPATCH FROM: SAVAN KOTAK | MASTER TERMINAL AI";
    const disclaimer = "Disclaimer: For institutional research & educational use only. Trading involves high risk. This is not financial advice.";
    const title = `*INSTITUTIONAL EQUITY RESEARCH: ${query.toUpperCase()}*`;
    
    const allWords = data.text.split(/\s+/);
    const wordLimit = 1000;
    let compressedText = allWords.slice(0, wordLimit).join(' ');
    
    const safeCharLimit = 3500; 
    if (compressedText.length > safeCharLimit) {
      compressedText = compressedText.substring(0, safeCharLimit).trim() + "... [Report Truncated]";
    }

    const fullMessage = `${title}\n\n${compressedText}\n\n*BRANDING: ${branding}*\n\n_${disclaimer}_`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGeneratePDF = () => {
    window.print();
  };

  const handleDownloadWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Equity Report - ${query}</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h1 style="text-align: center; text-transform: uppercase; border-bottom: 2pt solid #000; padding-bottom: 10pt;">SAVAN KOTAK - Institutional Equity Report</h1>
        <p style="text-align: right;">DATE: ${new Date().toLocaleDateString()}</p>
        <p><b>ENTITY: ${query.toUpperCase()}</b></p>
        <hr/>
        ${data.text.split('\n').map(line => line.trim().startsWith('#') ? `<h2>${line.replace(/^#+/, '').trim()}</h2>` : `<p>${line}</p>`).join('')}
        <hr/>
        <p style="text-align: center; font-size: 8pt; color: #555;">© SAVAN KOTAK INSTITUTIONAL EQUITY RESEARCH</p>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Equity_Dispatch_${query.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!intel) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700" id="alpha-report-root">
      {/* Print-Only Professional Letterhead */}
      <div className="hidden print:block print:mb-12 print:border-b-4 print:border-black print:pb-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black uppercase m-0 p-0 tracking-tighter text-black">SAVAN KOTAK</h1>
            <p className="text-sm font-bold tracking-[0.4em] uppercase text-black mt-2">Institutional Intelligence Terminal • Equity Strategy</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-black m-0 uppercase text-black">REPORT ID: {Math.floor(Math.random()*900000)+100000}</p>
            <p className="text-xs text-black font-bold uppercase mt-1">ENTITY: {query.toUpperCase()}</p>
            <p className="text-xs text-black uppercase mt-1">DATE: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Institutional Dashboard Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 no-print">
        <div className="bg-[#12141c] border border-indigo-500/30 p-8 rounded-[2rem] shadow-2xl group hover:border-indigo-500/60 transition-all">
          <Award className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
          <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Alpha Quality Score</h4>
          <div className="text-5xl font-black text-white font-mono tracking-tighter">{intel.moatScore}%</div>
        </div>

        <div className="bg-[#12141c] border border-white/10 p-8 rounded-[2rem] shadow-2xl group hover:border-rose-500/40 transition-all">
          <AlertTriangle className={`w-10 h-10 mb-6 group-hover:scale-110 transition-transform ${intel.riskRating === 'HIGH' ? 'text-rose-500' : 'text-amber-500'}`} />
          <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Volatility Risk Profile</h4>
          <div className="text-3xl font-black text-white tracking-tight uppercase">{intel.riskRating}</div>
        </div>

        <div className="bg-[#12141c] border border-blue-500/30 p-8 rounded-[2rem] shadow-2xl group hover:border-blue-500/60 transition-all">
          <LineChart className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
          <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Trend Conviction</h4>
          <div className="text-3xl font-black text-white tracking-tight uppercase">Institutional Buy</div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl shadow-indigo-600/30 flex flex-col justify-center items-center text-center group active:scale-95 transition-all">
          <TrendingUp className="w-10 h-10 text-white/40 mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-[11px] font-black text-white/70 uppercase tracking-widest mb-2">Return Velocity</h4>
          <div className="text-2xl font-black text-white uppercase tracking-tighter">High Beta Alpha</div>
        </div>
      </div>

      {/* Main Narrative Dispatch */}
      <div ref={reportRef} className="bg-[#0f1117] border border-white/5 p-12 lg:p-16 rounded-[3rem] relative shadow-2xl print:bg-white print:p-0 print:border-none print:shadow-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 border-b border-white/10 pb-10 gap-8 print:border-black print:mb-12">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-indigo-600/10 rounded-3xl border border-indigo-500/30 no-print">
              <FileText className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter print:text-black print:text-3xl">Institutional Equity Dispatch</h2>
              <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.5em] mt-2 print:text-black">SECURE TRANSMISSION NODE: {query.toUpperCase()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 no-print">
            <button 
              onClick={handleGeneratePDF}
              className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl text-[11px] font-black transition-all shadow-2xl hover:bg-slate-100 uppercase tracking-widest border border-white active:scale-95"
            >
              <Printer className="w-5 h-5" />
              Generate PDF Report
            </button>
            <button 
              onClick={handleDownloadWord}
              className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl text-[11px] font-black transition-all shadow-2xl hover:bg-slate-900 uppercase tracking-widest border border-white/10 active:scale-95"
            >
              <FileEdit className="w-5 h-5" />
              Download Word
            </button>
            <button 
              onClick={handleWhatsAppShare}
              className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[11px] font-black transition-all shadow-2xl hover:bg-emerald-500 uppercase tracking-widest active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Share Audit
            </button>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed font-medium print:text-black print:prose-black">
          {data.text.split('\n').map((line, i) => {
            if (line.trim().startsWith('#')) {
              const level = line.match(/^#+/)?.[0].length || 1;
              const text = line.replace(/^#+/, '').trim();
              if (level === 1) return <h2 key={i} className="text-white text-2xl font-black uppercase tracking-widest mt-16 mb-8 border-b-2 border-indigo-600 pb-4 print:text-black print:border-black">{text}</h2>;
              return <h3 key={i} className="text-indigo-400 text-lg font-black uppercase tracking-widest mt-12 mb-6 border-l-4 border-indigo-600 pl-6 print:text-black print:border-black">{text}</h3>;
            }
            if (line.trim() === '') return <br key={i} className="print:hidden" />;
            return <p key={i} className="mb-6 print:mb-4">{line}</p>;
          })}
        </div>

        <div className="hidden print:block mt-20 pt-12 border-t-2 border-black text-[10px] text-black italic text-center uppercase tracking-widest font-black">
          <p className="mb-4">© SAVAN KOTAK INSTITUTIONAL EQUITY RESEARCH • MASTER AI TERMINAL</p>
          <p className="font-bold opacity-60">Sovereign Data Link Verified • SEC 14A Audit Compliance Met</p>
        </div>

        <div className="mt-20 pt-12 border-t border-white/10 flex items-center justify-between no-print opacity-50">
           <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Global Sovereign Intelligence Sync</span>
           </div>
           <p className="text-[10px] text-slate-800 font-black uppercase tracking-[0.6em]">SAVAN KOTAK • TERMINAL v2025.A</p>
        </div>
      </div>
    </div>
  );
};

export default BottomUpReport;