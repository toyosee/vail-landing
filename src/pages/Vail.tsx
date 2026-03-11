import React, { useState, useEffect } from 'react';
import { 
  Plus, Minus, Smartphone, ShieldAlert, Fingerprint, 
  Key, Activity, Zap, CheckCircle2, Eye, EyeOff,
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

  // Handle Scroll Effects
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

  // Terminal Hooks
  const s1 = useTypewriter("# vail --seal --payload 'DEEP_STRIKE'", 40, 500);
  const s2 = useTypewriter("> AES-256 GCM Initialization...", 30, 2500);
  const s3 = useTypewriter("> QR Payload: SEALED_LOCAL_ONLY", 20, 3500);

  const c1 = useTypewriter("# vail --audit-active", 40, 4500);
  const c2 = useTypewriter("> Analyzing entropy density...", 30, 5500);
  const c3 = useTypewriter("> Status: ELITE_ENCRYPTION_DETECTED", 20, 6500);

  // Type-safe Password Logic
  const analysis = (testPassword ? zxcvbn(testPassword) : null) as ZxcvbnResult | null;

  const getScoreColor = (score: number) => {
    const colors = ['#f43f5e', '#fb923c', '#fbbf24', '#a3e635', '#2dd4bf'];
    return colors[score] || '#334155';
  };

  const appleStoreUrl = "https://vailapp.netlify.app";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.thebarterverse.vail&pcampaignid=web_share";

  const navLinks = [
    { name: 'Terminal', id: 'hero' },
    { name: 'Handshake', id: 'onboarding' },
    { name: 'Audit', id: 'resilience' },
    { name: 'Protocol', id: 'protocol' },
    { name: 'FAQ', id: 'faq' },
  ];

  return (
    <div className="bg-[#020617] min-h-screen relative pb-10 overflow-hidden font-sans text-slate-300">
      
      {/* STICKY HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        scrolled ? 'bg-[#020617]/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="text-2xl font-black text-white cursor-pointer tracking-tighter"
          >
            VA<span className="text-violet-500">IL</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
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
              className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
            >
              Secure App
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#020617] z-[99] transition-transform duration-500 flex flex-col items-center justify-center gap-8 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-2xl font-black uppercase tracking-widest text-white hover:text-violet-500"
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

      {/* BACK TO TOP BUTTON */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className={`fixed bottom-12 right-8 z-[90] p-4 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-400 backdrop-blur-lg shadow-2xl transition-all duration-500 hover:bg-violet-600 hover:text-white ${
          showTopBtn ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50'
        }`}
      >
        <ArrowUp size={20} />
      </button>

      {/* INJECTED ANIMATION STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        html { scroll-behavior: smooth; }
      `}} />

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[-10%] w-[800px] h-[800px] bg-violet-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/5 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 pt-32">
        
        {/* HERO SECTION */}
        <div id="hero" className="grid lg:grid-cols-2 gap-16 items-center mb-40">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-[0.4em]">
              <GlobeLock className="w-4 h-4" /> Sovereign End-to-End Privacy Protocol
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none">
              Va<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-500 to-cyan-400">il</span>
            </h1>

            <p className="text-slate-400 text-xl leading-relaxed max-w-xl font-light">
              The closed-loop privacy suite for the modern digital ghost. <span className="text-white font-medium">Seal</span>, <span className="text-white font-medium">Vault</span>, and <span className="text-white font-medium">Audit</span> your most sensitive data using hardware-level security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => window.open(appleStoreUrl)} className="flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                <Smartphone className="w-5 h-5" /> iOS App Store
              </button>
              <button onClick={() => window.open(playStoreUrl)} className="flex items-center justify-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-slate-700 transition-all">
                <Smartphone className="w-5 h-5" /> Google Play
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#020617] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-6 py-4 flex gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="p-8 font-mono text-[13px] leading-relaxed min-h-[200px]">
                <p className="text-violet-400">{s1}</p>
                <p className="text-slate-500 mt-2">{s2}</p>
                <p className="text-slate-500">{s3}</p>
                {s3.includes("SEALED") && (
                  <div className="mt-4 p-4 bg-violet-500/5 rounded-xl border border-violet-500/10 text-violet-300/40 text-[11px] break-all italic">
                    X092_VAIL_SEC_ENCLAVE_CIPHER_LOCAL_KEY_2026
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ONBOARDING SECTION */}
        <section id="onboarding" className="mb-60 py-20 bg-violet-500/[0.02] border-y border-white/5 relative">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
             <div className="text-center md:text-left space-y-6">
                <div className="inline-flex items-center gap-2 text-violet-400 font-bold uppercase text-xs tracking-widest">
                  <QrCode size={16} /> Digital Handshake
                </div>
                <h2 className="text-4xl font-bold text-white tracking-tighter">Scan to <span className="italic">Unvail</span></h2>
                <p className="text-slate-400 leading-relaxed">
                  Open the Vail app on your device and scan this sovereign QR code to receive your welcome message. <br />
                  <span className="text-violet-400 font-mono mt-2 block">PIN REQUIRED: 1598</span>
                </p>
             </div>
             <div className="flex justify-center">
                <div className="relative p-8 bg-[#0a0f1e] rounded-[3rem] border border-white/10 shadow-2xl group hover:border-violet-500/50 transition-colors">
                  <div className="bg-white p-3 rounded-2xl relative z-10 overflow-hidden">
                    <img 
                      src="/images/vail-onboarding.jpeg" 
                      alt="Vail Onboarding QR Code"
                      className="w-[300px] h-[300px] object-contain mx-auto relative z-10"
                    />
                    <div 
                      className="absolute left-0 right-0 h-[2px] bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,1)] z-20 pointer-events-none"
                      style={{ animation: 'scanLine 4s linear infinite' }}
                    />
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* STRENGTH VISUALIZER SECTION */}
        <section id="resilience" className="mb-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 lg:p-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white tracking-tight">Test Your <span className="text-violet-500">Resilience</span></h2>
              <p className="text-slate-400 leading-relaxed">Experience our <span className="text-white underline underline-offset-4 decoration-violet-500">Strength Monitor</span> engine right here.</p>
              
              <div className="space-y-4 pt-6">
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"}
                    placeholder="Enter a password to analyze..."
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-violet-500/50 transition-all"
                    value={testPassword}
                    onChange={(e) => setTestPassword(e.target.value)}
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400">
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {analysis && (
                  <div className="p-6 bg-slate-950 rounded-2xl border border-white/5 space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Strength Level</p>
                        <p className="text-2xl font-black uppercase italic" style={{ color: getScoreColor(analysis.score) }}>
                          {['Critical', 'Weak', 'Average', 'Secure', 'Elite'][analysis.score]}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Time to Crack</p>
                        <p className="text-white font-mono text-lg">{analysis.crack_times_display.offline_fast_hashing_1e10_per_second}</p>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-500 ease-out" 
                        style={{ width: `${(analysis.score + 1) * 20}%`, backgroundColor: getScoreColor(analysis.score) }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition"></div>
              <div className="relative bg-slate-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-white/5 px-6 py-4 flex gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="p-8 font-mono text-[13px] leading-relaxed min-h-[180px]">
                  <p className="text-cyan-400">{c1}</p>
                  <p className="text-slate-500 mt-2">{c2}</p>
                  <p className="text-slate-500">{c3}</p>
                  {c3.includes("ELITE") && (
                    <div className="mt-4 flex gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                      <CheckCircle2 size={14} className="text-green-500 mt-1" />
                      <p className="text-[11px] text-slate-400">Entropy check passed. Data verified.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROTOCOL SECTION */}
        <div id="protocol" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
          {[
            { icon: ShieldAlert, title: "QR Sealing", desc: "Turn raw text into AES-256 encrypted QR codes. Unreadable without our proprietary Unvail engine." },
            { icon: Activity, title: "Strength Monitor", desc: "Real-time auditing of your cipher keys. We use offline dictionary pattern matching." },
            { icon: Fingerprint, title: "Bio-Vaulting", desc: "Store credentials in a vault locked by hardware-level biometrics. Data is never cached." },
            { icon: Key, title: "Entropy Engine", desc: "Generate mathematically 'Elite' keys with high-bit randomness. Perfect for master passwords." },
            { icon: Zap, title: "Zero-Knowledge", desc: "Vail has no servers. No clouds. No logs. Your keys stay on your hardware, period." },
            { icon: Search, title: "Metadata Scrubbing", desc: "Automatically strips identifying metadata from notes before they are sealed." }
          ].map((f, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-violet-500/40 transition-all">
              <f.icon className="w-12 h-12 text-violet-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ARCHITECTURE SECTION */}
        <section className="mb-60 py-20 text-center">
            <h2 className="text-4xl font-bold text-white mb-20 tracking-tighter uppercase italic">The Sovereign Architecture</h2>
            <div className="grid md:grid-cols-3 gap-12 mt-20 max-w-5xl mx-auto">
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto text-violet-400 font-black shadow-[0_0_20px_rgba(139,92,246,0.3)]">1</div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-tight">Zero-Cloud Encryption</h4>
                    <p className="text-sm text-slate-400 leading-relaxed px-4">
                        Your data is transformed into military-grade <span className="text-white">AES-256 GCM</span> ciphers directly on your device. We never see your data, and we never touch your keys.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto text-violet-400 font-black shadow-[0_0_20px_rgba(139,92,246,0.3)]">2</div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-tight">Hardware Isolation</h4>
                    <p className="text-sm text-slate-400 leading-relaxed px-4">
                        Decryption occurs within your device's <span className="text-white">Secure Enclave</span>. Keys are mathematically bound to your hardware, making them impossible to export or intercept.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto text-violet-400 font-black shadow-[0_0_20px_rgba(139,92,246,0.3)]">3</div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-tight">Proprietary Handshake</h4>
                    <p className="text-sm text-slate-400 leading-relaxed px-4">
                        The <span className="text-white">Unvail Engine</span> bypasses standard OS clipboards. Data is decrypted in an isolated sandbox, leaving zero forensic footprint on your system.
                    </p>
                </div>
            </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="mb-40 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <ShieldQuestion className="text-violet-500" size={32} />
            <h2 className="text-4xl font-bold text-white tracking-tighter uppercase">Protocol FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "What is 'Sealing'?", a: "Sealing creates a proprietary QR format that lacks standard headers, making it look like noise to any scanner except Vail." },
              { q: "Can I recover my Vault?", a: "No. This is a Zero-Knowledge system. We don't store your keys on a server." },
              { q: "Does Vail work offline?", a: "100% of its core features work perfectly without an internet connection." }
            ].map((faq, i) => (
              <div key={i} className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-8 text-left">
                  <span className="text-white font-bold text-sm lg:text-base">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 text-violet-400" /> : <Plus className="w-5 h-5 text-slate-700" />}
                </button>
                {openFaq === i && <div className="p-8 pt-0 text-slate-400 text-sm border-t border-white/5">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL DOWNLOAD CTA */}
        <div id="download" className="bg-gradient-to-br from-violet-600 to-indigo-900 rounded-[3.5rem] p-12 lg:p-24 text-center space-y-10 shadow-2xl relative overflow-hidden">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase relative z-10 italic leading-none">Go Dark. <br />Go Vail.</h2>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button onClick={() => window.open(appleStoreUrl)} className="bg-white text-indigo-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">Download iOS</button>
            <button onClick={() => window.open(playStoreUrl)} className="bg-indigo-500 text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-400 transition-all">Download Android</button>
          </div>
        </div>

        {/* FOOTER SECTION */}
        <footer className="mt-40 pb-12 border-t border-white/5 pt-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left space-y-2">
                <div className="text-xl font-black text-white tracking-tighter">
                  VA<span className="text-violet-500">IL</span>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">
                  © {new Date().getFullYear()} Barterverse Technologies. All rights reserved.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-2">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Developed by</p>
                <a 
                  href="https://thebarterverse.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/[0.03] border border-white/10 px-6 py-3 rounded-xl hover:border-violet-500/50 transition-all"
                >
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                    Barterverse Technologies
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                </a>
              </div>
            </div>
            
            <div className="mt-20 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] text-slate-600 uppercase tracking-[0.3em] font-bold">
              <a href="#" className="hover:text-violet-400 transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Terms of Sovereignty</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Security Audit</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VailLandingPage;