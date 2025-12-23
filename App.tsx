
import React, { useState, useEffect, useMemo } from 'react';
import { UserSession, PriceData, TradeSignal, SignalType, ResearchOutput } from './types';
import { fetchMorningBrief, conductCompanyDeepDive } from './services/marketIntelligence';
import DashboardHeader from './components/DashboardHeader';
import MarketBrief from './components/MarketBrief';
import InvestmentIdeas from './components/InvestmentIdeas';
import FundamentalGauge from './components/FundamentalGauge';
import FinancialStatementTerminal from './components/FinancialStatementTerminal';
import NarrativeRealityGauge from './components/NarrativeRealityGauge';
import RiskWarning from './components/RiskWarning';
import AuthScreen from './components/AuthScreen';
import AdminPanel from './components/AdminPanel';
import BottomUpWorkspace from './components/BottomUpWorkspace';
import IPOWorkspace from './components/IPOWorkspace';
import { 
  Database, Layers, Zap, Loader2, Newspaper, TrendingUp, Search, FileText, Cpu, Fingerprint, Briefcase, Award, MessageCircle, Printer, ShieldCheck, Lock, Activity, Sparkles, Clock, Rocket
} from 'lucide-react';

const ADMIN_EMAIL = 'savan2004@gmail.com';
const ADMIN_PASSWORD = 'Sk@5252552';

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession>({
    email: '', name: '', mobile: '', loginTime: '', authenticated: false, acceptedRisk: false
  });

  const [activeTab, setActiveTab] = useState<'BRIEF' | 'AUDIT' | 'ALPHA' | 'IPO' | 'ADMIN'>('BRIEF');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [adminError, setAdminError] = useState(false);

  const [morningBrief, setMorningBrief] = useState<ResearchOutput | null>(null);
  const [researchData, setResearchData] = useState<ResearchOutput | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [isBriefing, setIsBriefing] = useState(false);

  const isAdmin = session.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    if (session.authenticated) {
      handleMorningBrief();
    }
  }, [session.authenticated]);

  const handleMorningBrief = async () => {
    setIsBriefing(true);
    try {
      const brief = await fetchMorningBrief();
      setMorningBrief(brief);
    } catch (e) {
      console.error(e);
    } finally {
      setIsBriefing(false);
    }
  };

  const handleCompanySearch = async (e?: React.FormEvent, specificQuery?: string) => {
    e?.preventDefault();
    const finalQuery = (specificQuery || searchQuery).trim();
    if (!finalQuery) return;
    
    setSearchQuery(finalQuery);
    setActiveTab('AUDIT');
    setIsResearching(true);
    setResearchData(null);
    try {
      const result = await conductCompanyDeepDive(finalQuery);
      setResearchData(result);
    } catch (e) {
      setResearchData({ text: "Forensic node timeout.", sources: [] });
    } finally {
      setIsResearching(false);
    }
  };

  const handleShortTermAnalysis = () => {
    const targetTicker = searchQuery || (morningBrief?.text.match(/\b[A-Z]{3,}\b/)?.[0]) || 'NIFTY';
    handleCompanySearch(undefined, `${targetTicker} SHORT TERM TECHNICAL & MOMENTUM AUDIT`);
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!researchData) return;
    const branding = "DISPATCH FROM: SAVAN KOTAK | MASTER TERMINAL AI";
    const title = `*DEEP AUDIT: ${searchQuery.toUpperCase()}*`;
    const message = `${title}\n\n${researchData.text.substring(0, 3000)}...\n\n*${branding}*`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogin = (userData: { email: string; name: string; mobile: string }) => {
    setSession(prev => ({ ...prev, ...userData, authenticated: true }));
  };

  const handleLogout = () => {
    setSession({ email: '', name: '', mobile: '', loginTime: '', authenticated: false, acceptedRisk: true });
    setIsAdminAuthenticated(false);
  };

  const verifyAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAdminError(false);
    } else {
      setAdminError(true);
    }
  };

  if (!session.acceptedRisk) return <RiskWarning onAccept={() => setSession(p => ({...p, acceptedRisk: true}))} />;
  if (!session.authenticated) return <AuthScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-400 font-sans selection:bg-blue-500/30">
      <DashboardHeader 
        user={{ email: session.email, name: session.name }}
        onLogout={handleLogout}
        onRefresh={() => handleMorningBrief()}
      />

      <main className="flex-grow flex flex-col lg:flex-row p-6 gap-6 overflow-hidden print:p-0 print:block">
        <aside className="w-full lg:w-72 flex flex-col gap-6 shrink-0 no-print">
           <div className="bg-[#0f1117] border border-white/5 p-6 rounded-[2rem] shadow-2xl">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Layers className="w-3.5 h-3.5 text-blue-500" />
               Institutional Units
             </h3>
             <div className="space-y-3">
               <button
                 onClick={() => { setActiveTab('BRIEF'); setResearchData(null); setSearchQuery(''); }}
                 className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center gap-4 ${activeTab === 'BRIEF' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black/40 border-white/5 hover:border-blue-500/30'}`}
               >
                 <Newspaper className="w-4 h-4" />
                 <div>
                   <div className="text-[11px] font-black uppercase">Morning Alpha</div>
                   <div className="text-[9px] opacity-60">Global cues</div>
                 </div>
               </button>

               <button
                 onClick={() => { setActiveTab('ALPHA'); setResearchData(null); }}
                 className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center gap-4 ${activeTab === 'ALPHA' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-black/40 border-white/5 hover:border-blue-500/30'}`}
               >
                 <Briefcase className="w-4 h-4" />
                 <div>
                   <div className="text-[11px] font-black uppercase">Alpha Hub</div>
                   <div className="text-[9px] opacity-60">Top-down reasoning</div>
                 </div>
               </button>

               <button
                 onClick={() => { setActiveTab('IPO'); setResearchData(null); }}
                 className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center gap-4 ${activeTab === 'IPO' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-black/40 border-white/5 hover:border-amber-500/30'}`}
               >
                 <Rocket className="w-4 h-4" />
                 <div>
                   <div className="text-[11px] font-black uppercase">IPO Node</div>
                   <div className="text-[9px] opacity-60">Real-time GMP</div>
                 </div>
               </button>
             </div>
           </div>

           <div className="bg-[#0f1117] border border-white/5 p-6 rounded-[2rem]">
             <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Fingerprint className="w-3.5 h-3.5" />
               Forensic Node
             </h3>
             <button
               onClick={() => { setActiveTab('AUDIT'); if(!researchData) setSearchQuery(''); }}
               className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center gap-4 ${activeTab === 'AUDIT' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black/40 border-white/5 hover:border-blue-500/30'}`}
             >
               <Search className="w-4 h-4" />
               <div>
                 <div className="text-[11px] font-black uppercase">Deep Audit</div>
                 <div className="text-[9px] opacity-60">Fidelity auditing</div>
               </div>
             </button>
           </div>

           {isAdmin && (
             <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-[2rem]">
               <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <ShieldCheck className="w-3.5 h-3.5" />
                 Admin Control
               </h3>
               <button
                 onClick={() => setActiveTab('ADMIN')}
                 className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center gap-4 ${activeTab === 'ADMIN' ? 'bg-white text-black' : 'bg-black/40 border-white/5 text-indigo-400'}`}
               >
                 <Database className="w-4 h-4" />
                 <div>
                   <div className="text-[11px] font-black uppercase tracking-tight">Registry Audit</div>
                   <div className="text-[9px] opacity-60">Master logs</div>
                 </div>
               </button>
             </div>
           )}
        </aside>

        <section className="flex-grow flex flex-col gap-6 overflow-hidden print:block print:overflow-visible">
          {activeTab === 'ADMIN' && isAdmin ? (
             isAdminAuthenticated ? <AdminPanel /> : (
                <div className="flex-grow flex items-center justify-center p-6 text-center no-print">
                   <div className="w-full max-w-md bg-[#0f1117] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl p-10">
                      <Lock className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
                      <h2 className="text-xl font-black text-white uppercase mb-6 tracking-widest">Restricted Entry</h2>
                      <form onSubmit={verifyAdminPassword} className="space-y-4">
                        <input 
                          type="password" 
                          value={adminPassInput} 
                          onChange={e => setAdminPassInput(e.target.value)} 
                          placeholder="Institutional Key"
                          className="w-full bg-[#050505] border border-white/10 text-white rounded-xl py-4 px-6 font-mono"
                        />
                        <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-xl uppercase tracking-widest">Authorize Node</button>
                      </form>
                   </div>
                </div>
             )
          ) : activeTab === 'BRIEF' ? (
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar print:p-0 print:overflow-visible">
               <div className="max-w-5xl mx-auto space-y-10">
                  <MarketBrief brief={morningBrief} loading={isBriefing} />
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 no-print">
                     <InvestmentIdeas onSelectOpportunity={(ticker) => handleCompanySearch(undefined, ticker)} />
                     <div className="space-y-8">
                        <FundamentalGauge />
                        <div className="bg-[#12141c] border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group">
                           <Award className="w-12 h-12 text-slate-700 mb-4 group-hover:text-amber-500 transition-colors" />
                           <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Alpha Metrics Active</h4>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mb-6">Technical momentum & tactical flow monitoring.</p>
                           <button onClick={handleShortTermAnalysis} className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95">
                             <Clock className="w-4 h-4" /> Initiate Short Term Technical Audit
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ) : activeTab === 'AUDIT' ? (
            <div className="flex-grow bg-[#0f1117] border border-white/5 overflow-hidden flex flex-col rounded-[2.5rem] shadow-2xl relative print:bg-white print:border-none print:shadow-none print:block">
              <div className="bg-black/40 p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 no-print">
                <div className="flex items-center gap-4">
                  <Cpu className="w-6 h-6 text-blue-400" />
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Technical Reasoning Node</h2>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Audit Engine v5.1</p>
                  </div>
                </div>
                <form onSubmit={handleCompanySearch} className="flex-grow max-w-md">
                   <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={e => setSearchQuery(e.target.value)} 
                        placeholder="Company Ticker / Name..."
                        className="w-full bg-[#050505] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"
                      />
                   </div>
                </form>
                <div className="flex gap-2">
                  <button onClick={handleCompanySearch} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95">Deep Audit</button>
                  <button onClick={handleShortTermAnalysis} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95">Tactical Technical</button>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto p-8 custom-scrollbar print:p-0 print:overflow-visible">
                 {isResearching ? (
                   <div className="flex flex-col items-center justify-center py-32 no-print">
                      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
                      <p className="text-sm font-black text-white uppercase tracking-[0.4em]">Calibrating Technical Parameters...</p>
                   </div>
                 ) : researchData ? (
                   <div className="max-w-5xl mx-auto space-y-10">
                      <div className="no-print"><NarrativeRealityGauge fidelityScore={82} /></div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block">
                        <div className="print:mb-8"><FinancialStatementTerminal /></div>
                        <div className="no-print"><FundamentalGauge /></div>
                      </div>
                      <div className="bg-black/40 border border-white/5 p-12 rounded-[2.5rem] relative print:bg-white print:border-none print:p-0 print:block">
                         <div className="hidden print:block mb-10 border-b-2 border-black pb-4">
                            <h1 className="text-3xl font-black uppercase text-black m-0">SAVAN KOTAK</h1>
                            <p className="text-xs font-bold tracking-[3px] uppercase text-black">Technical & Forensic Audit Dispatch</p>
                            <div className="mt-4 flex justify-between text-xs font-bold text-black">
                               <span>ENTITY: {searchQuery.toUpperCase()}</span>
                               <span>DATE: {new Date().toLocaleDateString()}</span>
                            </div>
                         </div>
                         <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8 no-print">
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Audit Node: {searchQuery}</h2>
                            <div className="flex gap-2">
                               <button onClick={handlePrint} className="bg-white text-black border border-slate-200 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95">
                                  <Printer className="w-4 h-4" /> Export Report
                               </button>
                               <button onClick={handleWhatsAppShare} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95">
                                  <MessageCircle className="w-4 h-4" /> Share
                               </button>
                            </div>
                         </div>
                         <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed font-medium print:text-black print:prose-black">
                            {researchData.text.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)}
                         </div>
                      </div>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center py-32 text-center opacity-40 no-print">
                      <Search className="w-20 h-20 text-slate-500 mb-8" />
                      <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Alpha Registry Standby</h3>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Identify target to begin high-fidelity technical & forensic audit.</p>
                   </div>
                 )}
              </div>
            </div>
          ) : activeTab === 'ALPHA' ? (
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar print:p-0">
               <BottomUpWorkspace />
            </div>
          ) : activeTab === 'IPO' ? (
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar print:p-0">
               <IPOWorkspace />
            </div>
          ) : null}
        </section>
      </main>

      <footer className="bg-[#050505] border-t border-white/5 py-4 px-10 flex justify-between items-center shrink-0 no-print">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Institutional Uplink: SECURE</span>
           </div>
        </div>
        <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.5em]">Created By SAVAN KOTAK • NEXT-GEN AI TERMINAL</p>
      </footer>
    </div>
  );
};

export default App;
