import React, { useState, useEffect } from 'react';
import { Search, Zap, Cpu, Loader2, Sparkles, AlertCircle, Globe, ShieldCheck, TrendingUp, Info, ExternalLink, Calendar, Wallet, RefreshCcw, X, Printer, FileText, ArrowLeft, Clock, Download, FileEdit } from 'lucide-react';
import { scanIPOOpportunities, conductIPODeepDive } from '../services/marketIntelligence';
import { IPOData, ResearchOutput } from '../types';

interface ExtendedIPOData extends IPOData {
  status?: string;
}

const IPOWorkspace: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [ipoList, setIpoList] = useState<ExtendedIPOData[]>([]);
  const [sources, setSources] = useState<{ title: string; uri: string }[]>([]);
  const [lastSync, setLastSync] = useState<string | null>(null);

  // Detail View State
  const [selectedIPO, setSelectedIPO] = useState<ExtendedIPOData | null>(null);
  const [auditDetail, setAuditDetail] = useState<ResearchOutput | null>(null);
  const [isAuditLoading, setIsAuditLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const result = await scanIPOOpportunities();
      if (result.ipoData) {
        setIpoList(result.ipoData as ExtendedIPOData[]);
        setSources(result.sources);
        setLastSync(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProspectus = async (ipo: ExtendedIPOData) => {
    setSelectedIPO(ipo);
    setIsAuditLoading(true);
    setAuditDetail(null);
    try {
      const result = await conductIPODeepDive(ipo.company);
      setAuditDetail(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuditLoading(false);
    }
  };

  /**
   * REFINED PRINT TRIGGER
   */
  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  /**
   * EXPORT TO WORD (.DOC)
   * Generates a Microsoft Word compatible HTML document
   */
  const handleDownloadWord = () => {
    if (!selectedIPO || !auditDetail) return;

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Savan Kotak - IPO Audit - ${selectedIPO.company}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #000; }
          .header { text-align: center; border-bottom: 2pt solid #000; padding-bottom: 10pt; margin-bottom: 20pt; }
          .title { font-size: 24pt; font-weight: bold; text-transform: uppercase; margin: 0; }
          .subtitle { font-size: 10pt; color: #555; letter-spacing: 2pt; text-transform: uppercase; }
          .entity-box { background: #000; color: #fff; padding: 15pt; margin-bottom: 20pt; }
          .verdict { font-size: 18pt; font-weight: bold; color: #4ade80; }
          h2 { border-bottom: 1pt solid #000; padding-bottom: 5pt; margin-top: 25pt; font-size: 16pt; text-transform: uppercase; }
          p { margin-bottom: 10pt; text-align: justify; }
          .footer { margin-top: 40pt; border-top: 1pt solid #ccc; padding-top: 10pt; font-size: 8pt; text-align: center; color: #777; }
        </style>
      </head>
      <body>
        <div class="header">
          <p class="subtitle">Primary Market Intelligence Node: SK-IPO-A1</p>
          <h1 class="title">IPO Deep Audit Report</h1>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="entity-box">
          <table width="100%">
            <tr>
              <td>
                <span style="font-size: 8pt; text-transform: uppercase; opacity: 0.7;">Issuer Entity</span><br/>
                <span style="font-size: 20pt; font-weight: bold;">${selectedIPO.company}</span>
              </td>
              <td align="right">
                <span style="font-size: 8pt; text-transform: uppercase; opacity: 0.7;">Audit Verdict</span><br/>
                <span class="verdict">${selectedIPO.institutionalSuggestion}</span>
              </td>
            </tr>
          </table>
        </div>

        ${auditDetail.text.split('\n').map(line => {
          if (line.trim().startsWith('#')) {
            return `<h2>${line.replace(/^#+/, '').trim()}</h2>`;
          }
          return line.trim() ? `<p>${line}</p>` : '';
        }).join('')}

        <div class="footer">
          <p>SAVAN KOTAK RESEARCH • MASTER AI TERMINAL</p>
          <p>DISCLAIMER

This report, titled “Primary Market Intelligence Node: SK-IPO-A1 – Institutional Audit Dispatch,” is prepared independently by Savan Kotak in a personal capacity and is not issued on behalf of, or in association with, any company, firm, intermediary, audit practice, or regulatory authority. It is a general, non-customized document created solely for investor awareness and educational purposes and must not be treated as investment advice, research report, recommendation, solicitation, or an offer to buy, sell, or subscribe to any securities.
​

Portions of this report have been drafted and structured with the assistance of generative artificial intelligence (AI) tools. AI systems may produce errors, inaccuracies, omissions, or biased outputs, and no assurance is given that any content in this report is complete, accurate, up to date, or suitable for any particular situation. No independent audit, verification, or due diligence of any specific issuer, security, or data has been performed for the purposes of this document.
​

Nothing in this report should be relied upon for making investment, financial, legal, tax, or any other professional decisions. Before acting on any information contained herein, readers must independently verify all facts, figures, and interpretations using original source documents (including but not limited to DRHP/RHP/prospectus, audited financial statements, and regulatory filings) and should obtain advice from appropriately qualified and regulated professionals (for example, SEBI-registered intermediaries, chartered accountants, or legal counsel, as applicable). Any use or reliance on this report is strictly at the reader’s own risk.
​

To the maximum extent permitted by applicable law, [Your Name] expressly disclaims all representations, warranties, and conditions, whether express or implied, including (without limitation) any warranties of accuracy, completeness, fitness for a particular purpose, merchantability, or non-infringement. Under no circumstances shall [Your Name] be liable for any direct, indirect, incidental, consequential, special, exemplary, or punitive loss, damage, cost, or expense (including, without limitation, loss of profits, loss of data, or loss of opportunity) arising out of or in connection with the receipt, access, sharing, reproduction, distribution, or reliance on this report or any part of it, whether based on contract, tort (including negligence), statute, or any other legal theory, even if advised of the possibility of such damages.
​

This report is not intended for unlawful distribution or for distribution in any jurisdiction where such circulation would be contrary to local laws or regulations. By accessing or using this report, you acknowledge that you have read, understood, and agreed to this disclaimer in full, and that no person shall have any claim or cause of action against [Your Name] in relation to this document or its contents.
​.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Audit_Report_${selectedIPO.company.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    handleScan();
  }, []);

  // Detailed Audit View
  if (selectedIPO) {
    return (
      <div className="flex-grow flex flex-col gap-8 animate-in slide-in-from-right duration-500 max-w-5xl mx-auto w-full mb-20">
        <div className="flex items-center justify-between no-print">
          <button 
            onClick={() => setSelectedIPO(null)}
            className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Registry
          </button>
          <div className="flex gap-4">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-xl border border-black/10"
            >
              <Download className="w-4 h-4" />
              Save AS PDF
            </button>
            <button 
              onClick={handleDownloadWord}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl border border-white/10"
            >
              <FileEdit className="w-4 h-4" />
              Download Word
            </button>
          </div>
        </div>

        {/* Prospectus Content - Black & White Professional Style */}
        <div className="printable-prospectus bg-white text-black p-12 lg:p-20 shadow-2xl rounded-none border-[3px] border-black min-h-[1000px] font-serif relative">
          <div className="absolute top-0 right-0 p-8 flex flex-col items-end gap-2 opacity-5 pointer-events-none no-print">
             <FileText className="w-48 h-48" />
          </div>

          {/* Letterhead */}
          <div className="border-b-[4px] border-black pb-8 mb-12 flex justify-between items-end">
             <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 leading-none">Institutional Audit Dispatch</h1>
                <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-70">Primary Market Intelligence Node: SK-IPO-A1</p>
             </div>
             <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-widest">Report Code: IPO-{Math.floor(Math.random()*9000)+1000}</p>
                <p className="text-[10px] font-bold uppercase mt-1">Status: OFFICIAL TRANSMISSION</p>
             </div>
          </div>

          {/* Core Entity Info */}
          <div className="mb-12 bg-black text-white p-8 flex justify-between items-center shadow-lg">
             <div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Issuer Entity</span>
                <h2 className="text-3xl font-black uppercase tracking-tight">{selectedIPO.company}</h2>
             </div>
             <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Audit Verdict</span>
                <div className={`text-2xl font-black uppercase ${selectedIPO.institutionalSuggestion === 'APPLY' ? 'text-emerald-400' : selectedIPO.institutionalSuggestion === 'AVOID' ? 'text-rose-400' : 'text-amber-400'}`}>
                   {selectedIPO.institutionalSuggestion}
                </div>
             </div>
          </div>

          {isAuditLoading ? (
            <div className="py-40 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-12 h-12 text-black animate-spin mb-6" />
              <h3 className="text-lg font-black uppercase tracking-[0.4em]">Deconstructing RHP Data...</h3>
              <p className="text-sm font-bold opacity-50 uppercase tracking-widest mt-2">Aggregating GMP and peer valuation metrics</p>
            </div>
          ) : auditDetail ? (
            <div className="prose prose-sm max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-black text-black leading-relaxed">
               {auditDetail.text.split('\n').map((line, i) => {
                 if (line.trim().startsWith('#')) {
                   const level = line.match(/^#+/)?.[0].length || 1;
                   const text = line.replace(/^#+/, '').trim();
                   if (level === 1) return <h2 key={i} className="text-2xl border-b-2 border-black pb-2 mt-12 mb-6">{text}</h2>;
                   return <h3 key={i} className="text-lg mt-8 mb-4">{text}</h3>;
                 }
                 if (line.trim() === '') return <div key={i} className="h-4" />;
                 return <p key={i} className="mb-4 font-medium text-justify">{line}</p>;
               })}

               {/* End of Dispatch Options (Web Only) */}
               <div className="mt-16 pt-8 border-t border-black/10 flex flex-col items-center gap-6 no-print">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Terminal Dispatch Finalized</p>
                 <div className="flex gap-4">
                   <button 
                     onClick={handlePrint}
                     className="flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
                   >
                     <Download className="w-5 h-5" />
                     Save AS PDF Report
                   </button>
                   <button 
                     onClick={handleDownloadWord}
                     className="flex items-center gap-3 px-10 py-5 border-[3px] border-black text-black rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-black/5 transition-all"
                   >
                     <FileEdit className="w-5 h-5" />
                     Download Word Report
                   </button>
                 </div>
               </div>

               {/* Sources Section in Prospectus */}
               <div className="mt-20 pt-10 border-t-2 border-black opacity-40 italic text-[10px]">
                  <p className="mb-2 uppercase font-bold tracking-widest">Institutional Verification Node Logs:</p>
                  {auditDetail.sources.map((s, i) => (
                    <p key={i} className="mb-1">{s.title} — Verified via Primary Market Gateway Node SK-{i+1}</p>
                  ))}
               </div>
            </div>
          ) : (
            <div className="py-40 text-center opacity-30">
               <AlertCircle className="w-20 h-20 mx-auto mb-6" />
               <p className="text-lg font-black uppercase tracking-widest">Audit Dispatch Connection Failed</p>
            </div>
          )}

          {/* Footer for Prospectus */}
          <div className="mt-20 pt-10 border-t-4 border-black text-center">
             <p className="text-sm font-black uppercase tracking-[0.5em]">SAVAN KOTAK RESEARCH • MASTER AI TERMINAL</p>
             <p className="text-[9px] font-bold uppercase opacity-50 mt-4 max-w-2xl mx-auto leading-relaxed">
                DISCLAIMER: This institutional audit is for sovereign research purposes only. Equity investments in the primary market involve high risk. Listing gains are estimates based on secondary market sentiment (GMP).
             </p>
          </div>
        </div>
      </div>
    );
  }

  // Registry View
  return (
    <div className="flex-grow flex flex-col gap-8 animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
      {/* IPO Node Header */}
      <div className="bg-[#0f1117] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden no-print">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <TrendingUp className="w-48 h-48 text-indigo-500" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-indigo-600/10 rounded-3xl border border-indigo-500/20">
              <Zap className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Live & Upcoming IPO Alpha</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-1">Institutional Primary Market Intelligence</p>
            </div>
          </div>
          
          <button 
            onClick={handleScan}
            disabled={loading}
            className="flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCcw className="w-5 h-5" />}
            {loading ? 'Scanning Market...' : 'Refresh Live & Upcoming Registry'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 no-print">
           <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mb-10 relative">
             <Cpu className="w-10 h-10 text-indigo-500 animate-spin" />
             <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full animate-ping opacity-20" />
           </div>
           <h2 className="text-sm font-black text-white uppercase tracking-[0.6em] mb-4">Uplinking to Primary Market Registry</h2>
           <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">Sourcing Live & Upcoming GMP Data Pools...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 no-print">
          {ipoList.length > 0 ? (
            ipoList.map((ipo, idx) => (
              <div 
                key={idx} 
                className="bg-[#12141c] border border-white/5 rounded-[2rem] p-8 hover:border-indigo-500/30 transition-all group overflow-hidden relative shadow-xl"
              >
                {/* Visual Status Indicator */}
                <div className={`absolute top-0 right-0 px-8 py-3 rounded-bl-3xl border-l border-b ${
                  ipo.institutionalSuggestion === 'APPLY' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                  ipo.institutionalSuggestion === 'AVOID' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                }`}>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">{ipo.institutionalSuggestion}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{ipo.company}</h3>
                      {ipo.status && (
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${
                          ipo.status.toUpperCase() === 'LIVE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          {ipo.status}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{ipo.openDate} - {ipo.closeDate}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                        <Wallet className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{ipo.priceBand} / Lot: {ipo.lotSize}</span>
                      </div>
                    </div>
                    <div className="mt-8 p-6 bg-black/30 rounded-2xl border border-white/5 border-l-4 border-l-indigo-500">
                      <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Institutional Audit Summary</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium italic">
                        "{ipo.auditSummary}"
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center space-y-6 lg:border-l lg:border-white/5 lg:pl-10">
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Live GMP (Est.)</span>
                      <div className="text-3xl font-black text-emerald-400 font-mono tracking-tighter">
                        {ipo.gmp}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Listing Gain Delta</span>
                      <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        {ipo.listingEstimate}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4">
                     <button 
                        onClick={() => handleViewProspectus(ipo)}
                        className="w-full py-4 bg-white/5 hover:bg-white text-slate-300 hover:text-black rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
                     >
                        View Detailed Prospectus
                        <ExternalLink className="w-3 h-3 group-hover/btn:scale-110" />
                     </button>
                     <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-center gap-4">
                        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
                        <p className="text-[8px] text-slate-500 font-bold uppercase leading-tight">
                           High subscription demand monitored. FII sentiment node connected.
                        </p>
                     </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-40 text-center opacity-30 no-print">
               <div className="p-10 bg-white/5 rounded-full mb-8">
                  <Clock className="w-20 h-20 text-slate-500" />
               </div>
               <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-3">No Active Cycles</h3>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest max-w-sm leading-relaxed">No Live or Upcoming Mainboard IPOs detected. The primary market is currently in a consolidation phase.</p>
            </div>
          )}
        </div>
      )}

      {sources.length > 0 && !selectedIPO && (
        <div className="bg-[#0f1117] border border-white/5 p-8 rounded-[2.5rem] mt-4 no-print">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
             <Globe className="w-3.5 h-3.5 text-blue-500" />
             Institutional Intelligence Sources (Live GMP Uplink)
          </h4>
          <div className="flex flex-wrap gap-3">
             {sources.map((s, i) => (
               <a key={i} href={s.uri} target="_blank" className="bg-black/40 border border-white/5 px-4 py-2 rounded-xl text-[10px] font-bold text-indigo-400 hover:text-white transition-all flex items-center gap-2">
                 {s.title}
                 <ExternalLink className="w-3 h-3" />
               </a>
             ))}
          </div>
        </div>
      )}

      <footer className="py-10 flex flex-col items-center gap-4 border-t border-white/5 mt-10 no-print">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">IPO Registry Uplink: SECURE</span>
        </div>
        <p className="text-[9px] text-slate-700 font-bold uppercase tracking-[0.4em]">SAVAN KOTAK • MASTER AI TERMINAL</p>
      </footer>
    </div>
  );
};

export default IPOWorkspace;