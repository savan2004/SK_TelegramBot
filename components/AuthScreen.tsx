
import React, { useState } from 'react';
import { Mail, Phone, LogIn, Database, ShieldCheck, Cpu, Globe, ArrowRight, AlertCircle, UserCircle, Key, Lock } from 'lucide-react';
import { GoogleSheetsService } from '../services/googleSheetsService';

interface Props {
  onLogin: (userData: { email: string; name: string; mobile: string }) => void;
}

const AuthScreen: React.FC<Props> = ({ onLogin }) => {
  const [step, setStep] = useState<'LOGIN_ID' | 'PASSWORD' | 'MOBILE'>('LOGIN_ID');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== '123' && !email.includes('@')) {
      setError("Institutional Email or valid Login ID required.");
      return;
    }
    setError(null);
    setStep('PASSWORD');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Special bypass for ID 123 with PWD 123
    if (email === '123' && password !== '123') {
      setError("Invalid Security Key for ID 123.");
      return;
    }
    // For normal emails, we can just accept any password or specific ones. 
    // Given the prompt "ad Login Id 123 pwd 123", we strictly enforce it for 123.
    if (email !== '123' && password.length < 4) {
      setError("Security Key must be at least 4 characters.");
      return;
    }
    
    setError(null);
    setStep('MOBILE');
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 10) {
      setError("Valid 10-digit mobile number required for institutional logs.");
      return;
    }

    setLoading(true);
    try {
      // Sync login data to Admin Spreadsheet
      await GoogleSheetsService.logLogin(email, mobile);
      
      // Proceed to Dashboard
      onLogin({ 
        email, 
        name: email === '123' ? 'Savan Guest' : email.split('@')[0],
        mobile 
      });
    } catch (err) {
      setError("Sync to Master Sheets failed. Check terminal uplink.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#3b82f6_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_#6366f1_0%,_transparent_50%)]"></div>
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="w-full max-w-xl z-10">
        <div className="bg-[#0f1117]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_-20px_rgba(59,130,246,0.3)]">
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-3">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase leading-none">Alpha Terminal</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mt-2">Institutional Intelligence Uplink</p>
          </div>

          <div className="px-10 pb-16">
            {step === 'LOGIN_ID' && (
              <form onSubmit={handleIdSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-white font-bold text-lg mb-2">Terminal Access</h2>
                  <p className="text-slate-500 text-sm">Please identify yourself using your institutional Login ID.</p>
                </div>

                {error && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 text-rose-500 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">User Login ID</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. 123 or user@domain.com"
                      className="w-full bg-[#050505] border border-white/5 text-white rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-mono text-lg"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-4 group"
                >
                  Proceed to Security
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            {step === 'PASSWORD' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-blue-500/5 border border-blue-500/10 p-5 rounded-2xl mb-6 flex items-center gap-4">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <UserCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-400 font-black uppercase mb-0.5">ID Verified</p>
                    <p className="text-sm font-bold text-white font-mono">{email}</p>
                  </div>
                </div>

                {error && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 text-rose-500 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Security Key (Password)</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter security key"
                      className="w-full bg-[#050505] border border-white/5 text-white rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-mono text-lg"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-blue-600/20"
                >
                  Verify Key
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  type="button"
                  onClick={() => setStep('LOGIN_ID')}
                  className="w-full text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Change Login ID
                </button>
              </form>
            )}

            {step === 'MOBILE' && (
              <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl mb-6 flex items-center gap-4">
                  <div className="bg-emerald-500/20 p-2 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-400 font-black uppercase mb-0.5">Security Clear</p>
                    <p className="text-sm font-bold text-white font-mono">Uplinking to Registry...</p>
                  </div>
                </div>

                {error && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 text-rose-500 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Institutional Mobile Link</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile"
                      className="w-full bg-[#050505] border border-white/5 text-white rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-mono text-xl tracking-widest"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-black/20"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Complete Onboarding
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="bg-black/40 border-t border-white/5 p-6 flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Database className="w-3 h-3" />
              Syncing to Registry Logs
            </span>
            <span className="flex items-center gap-2 text-blue-500">
              <Globe className="w-3 h-3" />
              Node: Mum-1-Safe
            </span>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[9px] text-slate-700 font-bold uppercase tracking-[0.5em]">
          Master Terminal Admin: savan2004@gmail.com
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
