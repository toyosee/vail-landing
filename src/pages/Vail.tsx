import React, { useState, useEffect } from 'react';
import { 
  Plus, Minus, Smartphone, ShieldAlert, Fingerprint, 
  Key, Activity, Zap, Eye, EyeOff,
  Search, ShieldQuestion, GlobeLock, QrCode, ArrowUp, Menu, X
} from 'lucide-react';
import zxcvbn from 'zxcvbn';

// --- TYPE DEFINITIONS ---
interface ZxcvbnResult {
  score: number;
  crack_times_display: {
    offline_fast_hashing_1e10_per_second: string;
  };
}

// --- HOOKS ---
const useTypewriter = (text: string, speed: number = 50, delay: number = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayText, text, speed, started]);

  return displayText;
};

const VailLandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testPassword, setTestPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const s1 = useTypewriter("# vail --seal --payload 'DEEP_STRIKE'", 40, 500);
  const s2 = useTypewriter("> AES-256 GCM Initialization...", 30, 2500);
  const s3 = useTypewriter("> QR Payload: SEALED_LOCAL_ONLY", 20, 3500);

  const c1 = useTypewriter("# vail --audit-active", 40, 4500);
  const c2 = useTypewriter("> Analyzing entropy density...", 30, 5500);
  const c3 = useTypewriter("> Status: ELITE_ENCRYPTION_DETECTED", 20, 6500);

  const analysis = (testPassword ? zxcvbn(testPassword) : null) as ZxcvbnResult | null;

  const getScoreColor = (score: number) => {
    const colors = ['#f43f5e', '#fb923c', '#fbbf24', '#a3e635', '#2dd4bf'];
    return colors[score] || '#334155';
  };

  // const appleStoreUrl = "#";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.thebarterverse.vail&pcampaignid=web_share";

  const navLinks = [
    { name: 'Terminal', id: 'hero' },
    { name: 'Handshake', id: 'onboarding' },
    { name: 'Audit', id: 'resilience' },
    { name: 'Protocol', id: 'protocol' },
    { name: 'FAQ', id: 'faq' },
  ];

  return (
    <div className="bg-[#020617] min-h-screen relative overflow-x-hidden font-sans text-slate-300">
      
      {/* 1. HEADER REPAIR: Added overflow-hidden to mobile menu prevent scroll sync issues */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        scrolled ? 'bg-[#020617]/90 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6 md:py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="text-xl md:text-2xl font-black text-white cursor-pointer tracking-tighter"
          >
            VA<span className="text-violet-500">IL</span>
          </div>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-violet-400 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('download')}
              className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Secure App
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#020617] z-[99] transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}>
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-2xl font-black uppercase tracking-widest text-white"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('download')}
            className="mt-4 bg-violet-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest"
          >
            Download Now
          </button>
        </div>
      </nav>

      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className={`fixed bottom-6 right-6 z-[90] p-4 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-400 backdrop-blur-lg transition-all duration-500 ${
          showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <ArrowUp size={20} />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanLine { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { overflow-x: hidden; }
      `}} />

      <div className="max-w-7xl mx-auto relative z-10 px-6 pt-24 md:pt-40">
        
        {/* HERO SECTION - REPAIRED text sizes for mobile */}
        <div id="hero" className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-40">
          <div className="space-y-6 md:space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">
              <GlobeLock className="w-3 h-3 md:w-4 h-4" /> Sovereign Privacy Protocol
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold text-white tracking-tighter leading-[0.9]">
              Va<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">il</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              The closed-loop privacy suite for the modern digital ghost. <span className="text-white font-medium">Seal</span> and <span className="text-white font-medium">Audit</span> data with hardware security.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase">
                <Smartphone className="w-5 h-5" /> App Store
              </button>
              <button onClick={() => window.open(playStoreUrl)} className="flex items-center justify-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase">
                <Smartphone className="w-5 h-5" /> Play Store
              </button>
            </div>
          </div>

          <div className="relative group w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative bg-[#020617] rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-4 py-3 flex gap-2 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
              <div className="p-6 md:p-8 font-mono text-[12px] md:text-[13px] leading-relaxed min-h-[180px]">
                <p className="text-violet-400">{s1}</p>
                <p className="text-slate-500 mt-2">{s2}</p>
                <p className="text-slate-500">{s3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ONBOARDING - REPAIRED QR Size */}
        <section id="onboarding" className="mb-32 md:mb-60 py-16 md:py-20 bg-violet-500/[0.02] border-y border-white/5 relative -mx-6 px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center text-center md:text-left">
             <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-violet-400 font-bold uppercase text-xs tracking-widest">
                  <QrCode size={16} /> Digital Handshake
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter uppercase italic">Scan to Unvail</h2>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  Open Vail and scan this sovereign QR code to receive your welcome message. <br />
                  <span className="text-violet-400 font-mono mt-2 block">PIN: 1598</span>
                </p>
             </div>
             <div className="flex justify-center">
                <div className="relative p-4 md:p-8 bg-[#0a0f1e] rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
                  <div className="bg-white p-2 rounded-xl relative z-10 overflow-hidden">
                    <img 
                      src="/images/vail-onboarding.jpeg" 
                      alt="Vail QR"
                      className="w-full max-w-[240px] md:max-w-[300px] h-auto aspect-square object-contain mx-auto"
                    />
                    <div className="absolute left-0 right-0 h-[2px] bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,1)] z-20 pointer-events-none" style={{ animation: 'scanLine 4s linear infinite' }} />
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* STRENGTH VISUALIZER - MAJOR FIX: Column flow on mobile */}
        <section id="resilience" className="mb-32 md:mb-40">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center bg-white/[0.02] border border-white/5 rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-20">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase">Test Resilience</h2>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">Experience our Strength Monitor engine right here.</p>
              
              <div className="space-y-4 pt-4">
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"}
                    placeholder="Analyze password..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 text-sm md:text-base text-white focus:outline-none focus:border-violet-500/50"
                    value={testPassword}
                    onChange={(e) => setTestPassword(e.target.value)}
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {analysis && (
                  <div className="p-5 bg-slate-950 rounded-xl border border-white/5 space-y-4">
                    <div className="flex flex-col xs:flex-row justify-between items-start gap-4">
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Strength</p>
                        <p className="text-xl font-black uppercase italic" style={{ color: getScoreColor(analysis.score) }}>
                          {['Critical', 'Weak', 'Average', 'Secure', 'Elite'][analysis.score]}
                        </p>
                      </div>
                      <div className="xs:text-right">
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Time to Crack</p>
                        <p className="text-white font-mono text-sm md:text-base">{analysis.crack_times_display.offline_fast_hashing_1e10_per_second}</p>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full transition-all duration-500" style={{ width: `${(analysis.score + 1) * 20}%`, backgroundColor: getScoreColor(analysis.score) }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:block relative group">
              <div className="relative bg-slate-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-8 font-mono text-[13px] leading-relaxed min-h-[180px]">
                  <p className="text-cyan-400">{c1}</p>
                  <p className="text-slate-500 mt-2">{c2}</p>
                  <p className="text-slate-500">{c3}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROTOCOL - REPAIRED Card Padding */}
        <div id="protocol" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-32 md:mb-40">
          {[
            { icon: ShieldAlert, title: "QR Sealing", desc: "Turn raw text into AES-256 encrypted QR codes. Unreadable without our engine." },
            { icon: Activity, title: "Strength Monitor", desc: "Real-time auditing of keys using offline pattern matching." },
            { icon: Fingerprint, title: "Bio-Vaulting", desc: "Store credentials in a vault locked by hardware-level biometrics." },
            { icon: Key, title: "Entropy Engine", desc: "Generate mathematically 'Elite' keys with high-bit randomness." },
            { icon: Zap, title: "Zero-Knowledge", desc: "Vail has no servers. No clouds. No logs. Your keys stay on hardware." },
            { icon: Search, title: "Scrubbing", desc: "Automatically strips identifying metadata from notes before sealing." }
          ].map((f, i) => (
            <div key={i} className="group p-8 md:p-10 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-violet-500/40 transition-all">
              <f.icon className="w-10 h-10 text-violet-500 mb-6" />
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ SECTION - Fixed Text size */}
        <section id="faq" className="mb-32 md:mb-40 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <ShieldQuestion className="text-violet-500 shrink-0" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter uppercase">Protocol FAQ</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What is 'Sealing'?", a: "Sealing creates a proprietary QR format that lacks standard headers, making it look like noise to any scanner except Vail." },
              { q: "Can I recover my Vault?", a: "No. This is a Zero-Knowledge system. We don't store your keys on a server." },
              { q: "Does Vail work offline?", a: "100% of its core features work perfectly without an internet connection." }
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 md:p-8 text-left">
                  <span className="text-white font-bold text-xs md:text-sm">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-4 h-4 text-violet-400" /> : <Plus className="w-4 h-4 text-slate-700" />}
                </button>
                {openFaq === i && <div className="p-6 md:p-8 pt-0 text-slate-400 text-xs md:text-sm border-t border-white/5">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* DOWNLOAD CTA - Responsive Padding */}
        <div id="download" className="bg-gradient-to-br from-violet-600 to-indigo-900 rounded-[2rem] md:rounded-[3.5rem] p-10 md:p-24 text-center space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[1.1]">Go Dark. <br />Go Vail.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="bg-white text-indigo-950 px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">Download iOS</button>
            <button onClick={() => window.open(playStoreUrl)} className="bg-indigo-500 text-white border border-white/20 px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">Download Android</button>
          </div>
        </div>

        {/* FOOTER - Responsive alignment */}
        <footer className="mt-32 md:mt-40 pb-12 border-t border-white/5 pt-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left space-y-2">
              <div className="text-xl font-black text-white tracking-tighter">VA<span className="text-violet-500">IL</span></div>
              <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Barterverse Technologies.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <p className="text-[9px] text-slate-600 uppercase tracking-widest font-black">Developed by</p>
              <a href="https://thebarterverse.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-lg">
                <span className="text-[11px] font-bold text-slate-300">Barterverse Technologies</span>
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VailLandingPage;