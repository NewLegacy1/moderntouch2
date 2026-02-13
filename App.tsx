
import React, { useEffect, useState } from 'react';
import { 
  Home, 
  Building2, 
  Settings, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  HardHat, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X
} from 'lucide-react';

// --- Utility Components ---

const RevealOnScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const BorderBeamButton: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => (
  <div className={`border-beam-container group ${className}`}>
    <div className="border-beam"></div>
    <button 
      onClick={onClick}
      className="relative z-10 w-full min-h-[48px] bg-brand-accent text-brand-black font-bold py-3.5 px-6 md:py-4 md:px-10 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accentLight transition-all duration-300 uppercase tracking-widest text-sm"
    >
      {children}
    </button>
  </div>
);

// --- Sections ---

const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
  /* The logo image provided in the prompt is a gold interlocking geometric octagon/hexagon */
  <img 
    src="https://moderntouchrenovationsinc.ca/wp-content/uploads/2020/02/MT-Logo-Gold-300x300.png" 
    alt="xxxxxx xxxxx xxxxxxxxxxx xxxx" 
    className={`${className} object-contain`}
    onError={(e) => {
      // Fallback in case of link issues
      e.currentTarget.style.display = 'none';
    }}
  />
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 ${
      isScrolled ? 'py-3 md:py-4 bg-brand-black/90 backdrop-blur-md border-b border-white/5' : 'py-5 md:py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-3">
        <div className="flex items-center gap-3 min-w-0 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Logo className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 flex-shrink-0 group-hover:scale-105 transition-transform duration-500" />
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-base sm:text-xl tracking-tighter uppercase leading-none truncate">
              <span className="text-brand-accent">xxxxxx xxxxx xxxxxxxxxxx</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-brand-accent uppercase font-medium mt-0.5 hidden sm:block">
              Project Management Done Right
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">
          <a href="#services" className="hover:text-brand-accent transition-colors">Services</a>
          <a href="#why-us" className="hover:text-brand-accent transition-colors">Standards</a>
          <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
          <a 
            href="#estimate" 
            className="border border-brand-accent/30 hover:border-brand-accent hover:text-brand-accent text-white px-6 py-2.5 rounded-sm transition-all bg-white/5"
          >
            Start Project
          </a>
        </div>

        <button 
          className="md:hidden text-brand-accent p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-black/95 backdrop-blur-xl border-b border-brand-accent/20 px-4 py-6 flex flex-col gap-1 md:hidden">
          <a href="#services" className="min-h-[48px] flex items-center text-base font-bold uppercase tracking-widest py-3 border-b border-white/5 active:bg-white/5 rounded" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#why-us" className="min-h-[48px] flex items-center text-base font-bold uppercase tracking-widest py-3 border-b border-white/5 active:bg-white/5 rounded" onClick={() => setMobileMenuOpen(false)}>Standards</a>
          <a href="#contact" className="min-h-[48px] flex items-center text-base font-bold uppercase tracking-widest py-3 border-b border-white/5 active:bg-white/5 rounded" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#estimate" className="min-h-[48px] flex items-center text-brand-accent text-base font-bold uppercase tracking-widest py-3 rounded active:bg-white/5" onClick={() => setMobileMenuOpen(false)}>Start Project</a>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-[85dvh] sm:min-h-[90vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 px-4 sm:px-6 pb-16 bg-brand-black">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://moderntouchrenovationsinc.ca/wp-content/uploads/2020/02/Commercial-Mobile-e1593128568959.jpg" 
        className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105" 
        alt="High-end Renovation Project"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/60 to-brand-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-brand-black" />
      <div className="bg-drift absolute top-1/3 -left-1/4 w-[700px] h-[700px] bg-brand-accent/5 rounded-full" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
      <RevealOnScroll>
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-8">
            <div className="h-[1px] w-6 sm:w-8 md:w-16 bg-brand-accent/50" />
            <span className="text-[10px] sm:text-[11px] md:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-brand-accent whitespace-nowrap">
                Southern Ontario's Elite Renovation Firm
            </span>
            <div className="h-[1px] w-6 sm:w-8 md:w-16 bg-brand-accent/50" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.08] mb-6 sm:mb-10 text-white uppercase italic px-1">
          Renovations Held <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-accent via-brand-accentLight to-brand-accent">
            To A Higher Standard.
          </span>
        </h1>
        
        <div className="max-w-3xl mx-auto mb-8 sm:mb-14 px-1">
            <p className="text-base sm:text-lg md:text-2xl text-white/70 leading-relaxed font-light">
                Led by <span className="text-white font-semibold">xxxxxxx xxxxx</span>, a veteran project manager trusted by the Mike Holmes and Brian Baeumler communities.
            </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
          <BorderBeamButton className="w-full max-w-[320px] sm:max-w-none sm:w-auto" onClick={() => document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </BorderBeamButton>
          <div className="flex items-center gap-2 sm:gap-3 text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent flex-shrink-0" />
            <span>Project Management Done Right</span>
          </div>
        </div>
      </RevealOnScroll>
    </div>

    <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
      <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-brand-accent to-transparent" />
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-10 sm:py-14 md:py-16 border-y border-stone-200 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-24">
        <div className="flex flex-col items-center gap-2 text-center">
          <ShieldCheck className="w-9 h-9 sm:w-10 sm:h-10 text-brand-accent" />
          <span className="font-black text-[10px] sm:text-xs tracking-widest uppercase text-neutral-700 leading-tight">SAFETY CERTIFIED</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <Award className="w-9 h-9 sm:w-10 sm:h-10 text-brand-accent" />
          <span className="font-black text-[10px] sm:text-xs tracking-widest uppercase text-neutral-700 leading-tight">HOLMES APPROVED</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <HardHat className="w-9 h-9 sm:w-10 sm:h-10 text-brand-accent" />
          <span className="font-black text-[10px] sm:text-xs tracking-widest uppercase text-neutral-700 leading-tight">WSIB COMPLIANT</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <Building2 className="w-9 h-9 sm:w-10 sm:h-10 text-brand-accent" />
          <span className="font-black text-[10px] sm:text-xs tracking-widest uppercase text-neutral-700 leading-tight">MASTER BUILDER</span>
        </div>
      </div>
    </div>
  </section>
);

const ValueProp = () => (
  <section id="why-us" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-24 items-center">
        <RevealOnScroll>
          <span className="text-brand-accent font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-xs mb-4 sm:mb-6 block">Our Commitment</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-8 sm:mb-10 uppercase italic leading-none text-neutral-900">
            Precision <br /> 
            <span className="text-brand-accent">Without Compromise.</span>
          </h2>
          <div className="space-y-8 sm:space-y-12">
            <div className="flex gap-4 sm:gap-6 md:gap-8 group">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-brand-accent/30 group-hover:border-brand-accent transition-colors flex items-center justify-center text-brand-accent rotate-45">
                <Settings className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 -rotate-45" />
              </div>
              <div className="min-w-0">
                <h4 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-2 sm:mb-3 text-neutral-900">Licensed Excellence</h4>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">Every lead contractor is a licensed red-seal professional. We don't just "do renovations"; we engineer spaces to exceed the Ontario Building Code.</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6 md:gap-8 group">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-brand-accent/30 group-hover:border-brand-accent transition-colors flex items-center justify-center text-brand-accent rotate-45">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 -rotate-45" />
              </div>
              <div className="min-w-0">
                <h4 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-2 sm:mb-3 text-neutral-900">The Accurate Guarantee</h4>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">Our estimates are final. Utilizing proprietary project management workflows, we eliminate "budget creep" before the first hammer swings.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll>
          <div className="relative group mt-8 lg:mt-0">
            <div className="absolute -inset-4 sm:-inset-10 bg-brand-accent/10 rounded-full blur-[100px] group-hover:bg-brand-accent/20 transition-all" />
            <div className="relative aspect-[4/5] overflow-hidden border border-stone-200 shadow-xl rounded-lg sm:rounded-none">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
                alt="Modern High-End Interior" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12">
                <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-2 text-white">The Result</p>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="h-[2px] w-12 sm:w-16 bg-brand-accent" />
                  <p className="text-base sm:text-lg font-bold tracking-widest text-brand-accent uppercase">Peace of Mind</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    {
      title: "Residential",
      icon: <Home className="w-10 h-10" />,
      desc: "Architectural transformations and luxury basement developments that redefine home.",
      image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=800"
    },
    {
      title: "Commercial",
      icon: <Building2 className="w-10 h-10" />,
      desc: "Specialized retail and professional workspace build-outs optimized for performance.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800"
    },
    {
      title: "Mechanicals",
      icon: <Settings className="w-10 h-10" />,
      desc: "Infrastructure upgrades: HVAC, Electrical, and high-precision plumbing systems.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-10 mb-12 sm:mb-20">
          <RevealOnScroll>
            <span className="text-brand-accent font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-xs mb-4 sm:mb-6 block">Specializations</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none italic text-neutral-900">
              Elite Engineering <br />
              <span className="text-brand-accent">For Modern Living.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-neutral-600 max-w-sm text-base sm:text-lg leading-relaxed font-light">
                Tailored solutions for complex renovation projects across Southern Ontario.
            </p>
          </RevealOnScroll>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {services.map((service, i) => (
            <RevealOnScroll key={i}>
              <div className="group relative bg-white border border-stone-200 p-6 sm:p-8 md:p-10 hover:border-brand-accent transition-all duration-700 overflow-hidden h-full flex flex-col shadow-sm rounded-lg sm:rounded-none">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 blur-[80px] rounded-full group-hover:bg-brand-accent/10 transition-all duration-700" />
                
                <div className="relative z-10 flex-grow">
                  <div className="mb-6 sm:mb-8 md:mb-10 text-brand-accent">
                    {service.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest mb-4 sm:mb-6 italic text-neutral-900">{service.title}</h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-6 sm:mb-10 min-h-0 sm:min-h-[80px]">
                    {service.desc}
                  </p>
                </div>
                
                <div className="aspect-[16/10] overflow-hidden border border-stone-200 grayscale group-hover:grayscale-0 transition-all duration-1000 rounded">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-24">
        <RevealOnScroll>
          <span className="text-brand-accent font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-xs mb-4 sm:mb-6 block">Inquiry</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 sm:mb-12 uppercase italic leading-none text-neutral-900">
            Invest in <br />
            <span className="text-brand-accent">Excellence.</span>
          </h2>
          
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-stone-200 flex items-center justify-center rotate-45 group-hover:border-brand-accent transition-colors flex-shrink-0">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-brand-accent -rotate-45" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest">Phone</span>
                <a href="tel:4166668909" className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-neutral-900 hover:text-brand-accent transition-colors">416-666-8909</a>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-stone-200 flex items-center justify-center rotate-45 group-hover:border-brand-accent transition-colors flex-shrink-0">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-brand-accent -rotate-45" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest">Email</span>
                <a href="mailto:xxxxxxx@xxxxxxxxxxxxxxxxxxxxxxxxx.xx" className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-neutral-900 hover:text-brand-accent transition-colors break-all">xxxxxxx@xxxxxxxxxxxxxxxxxxxxxxxxx.xx</a>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-stone-200 flex items-center justify-center rotate-45 group-hover:border-brand-accent transition-colors flex-shrink-0">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-brand-accent -rotate-45" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest">Studio</span>
                <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight leading-snug text-neutral-900">5063 North Service Road - Suite 100,<br /> Burlington, ON</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div id="estimate" className="bg-stone-50 border border-stone-200 p-6 sm:p-8 md:p-10 lg:p-16 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden mt-8 lg:mt-0">
            <div className="absolute top-0 right-0 p-4 sm:p-6">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-accent font-black">Secure Estimate Portal</div>
            </div>
            
            <form className="space-y-5 sm:space-y-6 md:space-y-8 pt-2 sm:pt-0" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Full Name</label>
                  <input type="text" className="w-full min-h-[48px] bg-white border border-stone-200 rounded-md px-4 sm:px-6 py-3.5 text-base focus:outline-none focus:border-brand-accent transition-all text-neutral-900 font-light placeholder:text-neutral-400 touch-manipulation" placeholder="Required" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Email Address</label>
                  <input type="email" className="w-full min-h-[48px] bg-white border border-stone-200 rounded-md px-4 sm:px-6 py-3.5 text-base focus:outline-none focus:border-brand-accent transition-all text-neutral-900 font-light placeholder:text-neutral-400 touch-manipulation" placeholder="Required" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Project Classification</label>
                <select className="w-full min-h-[48px] bg-white border border-stone-200 rounded-md px-4 sm:px-6 py-3.5 text-base focus:outline-none focus:border-brand-accent transition-all appearance-none text-neutral-700 font-light touch-manipulation">
                  <option className="bg-white">Residential Renovation</option>
                  <option className="bg-white">Commercial Build-out</option>
                  <option className="bg-white">Mechanical & Infrastructure</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Project Scope</label>
                <textarea rows={4} className="w-full min-h-[120px] bg-white border border-stone-200 rounded-md px-4 sm:px-6 py-3.5 text-base focus:outline-none focus:border-brand-accent transition-all resize-none text-neutral-900 font-light placeholder:text-neutral-400 touch-manipulation" placeholder="Describe the scale and objectives of your project..."></textarea>
              </div>

              <BorderBeamButton>
                Initialize Request <ArrowRight className="w-5 h-5" />
              </BorderBeamButton>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 sm:py-16 md:py-20 border-t border-stone-200 px-4 sm:px-6 bg-stone-50">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10 md:gap-12 text-center md:text-left">
      <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Logo className="w-9 h-9 sm:w-10 sm:h-10 group-hover:rotate-12 transition-transform duration-500 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-black text-base sm:text-lg tracking-tight uppercase italic text-neutral-900 leading-tight">
              <span className="text-brand-accent">xxxxxx xxxxx xxxxxxxxxxx</span> Inc.
            </span>
            <p className="text-neutral-500 text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold">
                Project Management Done Right
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-neutral-500 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-black order-last md:order-none">
        © {new Date().getFullYear()} Burlington, ON | xxxxxxx xxxxx, Principal
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 text-neutral-600 text-[10px] font-black uppercase tracking-[0.2em]">
        <a href="#" className="min-h-[44px] flex items-center py-2 hover:text-brand-accent transition-colors touch-manipulation">Privacy</a>
        <a href="#" className="min-h-[44px] flex items-center py-2 hover:text-brand-accent transition-colors touch-manipulation">Safety Code</a>
        <a href="#" className="min-h-[44px] flex items-center py-2 hover:text-brand-accent transition-colors touch-manipulation">Legacy</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-brand-accent selection:text-brand-black">
      <div className="sticky top-0 left-0 right-0 z-[100] bg-amber-500/95 text-amber-950 text-center py-2 px-4 text-sm font-medium">
        This is a Production Staging Environment. Sensitive client data has been scrubbed and replaced with placeholder content for internal review.
      </div>
      <Header />
      <Hero />
      <div className="bg-stone-50 text-neutral-900">
        <SocialProof />
        <ValueProp />
        <Services />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
