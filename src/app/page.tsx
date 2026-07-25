'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Moon, Square, Mail } from 'lucide-react';

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);
import { ContactButton } from '@/components/ContactButton';

const NAV_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'contact', label: "Let's Talk", href: '#contact' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="relative w-full min-h-screen bg-[#0C0C0C] text-white selection:bg-[#B600A8] selection:text-white font-sans">
      
      {/* Premium Floating Navbar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 flex justify-between items-center px-6 md:px-10 py-3 bg-[#111111]/40 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <a href="#" className="font-black text-white tracking-[0.2em] uppercase text-sm md:text-base transition-opacity hover:opacity-80 whitespace-nowrap">
          Mahmoud Salem
        </a>
        <nav className="hidden md:flex items-center gap-2 text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase text-[#8899A6]">
          {/* Animated Nav Links */}
          <div className="flex bg-black/20 p-1 rounded-full border border-white/5 relative">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.id}
                href={link.href} 
                onClick={() => setActiveTab(link.id)}
                className={`relative px-6 py-2.5 rounded-full transition-colors z-10 flex items-center justify-center ${activeTab === link.id ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'hover:text-white'}`}
              >
                {activeTab === link.id && (
                  <motion.div 
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-2xl border border-white/30 shadow-[inset_0_0_20px_rgba(255,255,255,0.3),_0_4px_20px_rgba(0,0,0,0.5)] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col z-10 overflow-hidden">
        
        {/* Luxury Animated Background (High-Res Image + CSS Pan) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Luxury Dark Liquid Background" 
            className="w-full h-full object-cover animate-pan"
          />
          {/* Gradient Overlay for seamless blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/30 via-[#0C0C0C]/80 to-[#0C0C0C]"></div>
        </div>

        {/* Hero Body */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-4 lg:px-12 relative z-20">
          
          {/* Hero Title */}
          <h1 className="hero-heading font-black text-[clamp(3.5rem,10vw,12vw)] leading-[1.1] lowercase z-20 mb-8 cursor-default px-4">
            hi, i'm mahmoud salem
          </h1>

          {/* Subtitle */}
          <div className="flex flex-col items-center z-20 gap-8">
            <p className="max-w-2xl text-lg md:text-2xl text-[#BBCCD7] leading-relaxed font-light">
              A Software Engineer & Web Developer. I build high-performance digital platforms and harness the power of advanced AI to engineer the future of the web.
            </p>
          </div>
        </div>
      </section>



      {/* 3. ABOUT SECTION */}
      <section id="about" className="relative z-30 bg-[#0C0C0C] py-32 px-4 lg:px-12 flex justify-center border-t border-white/5">
        <div className="max-w-5xl flex flex-col md:flex-row gap-16 items-center md:items-start">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-none uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 md:w-1/2">
            The<br />Architect
          </h2>
          <div className="md:w-1/2 flex flex-col gap-8">
            <p className="text-xl md:text-3xl font-light text-white/80 leading-relaxed">
              I am a professional Frontend Web Developer dedicated to building high-performance digital environments. Specializing in <span className="font-bold text-white">Next.js</span> and modern UI architecture, I transform complex ideas into captivating web experiences.
            </p>
            <p className="text-lg md:text-xl text-[#8899A6] leading-relaxed">
              Beyond engineering, I possess extensive experience in tech education and training. I am deeply passionate about mentoring the next generation of developers, breaking down advanced concepts into actionable knowledge, and empowering others to build at the bleeding edge of modern technology.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SERVICES ARTIFACT LISTING */}
      <section id="services" className="relative z-20 bg-[#FFFFFF] text-[#0C0C0C] pt-32 pb-40 rounded-t-[3rem] md:rounded-t-[5rem] px-4 lg:px-12 mt-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black mb-24 tracking-tighter">Services.</h2>
          
          <div className="flex flex-col">
            {[
              { num: '01', title: 'End-to-End Project Development', desc: 'Architecting and building professional-grade applications from initial concept through every stage of the software development lifecycle.' },
              { num: '02', title: 'Pixel-Perfect Figma to Code', desc: 'Transforming complex Figma designs into highly responsive, interactive, and flawless Next.js web applications with immaculate precision.' },
              { num: '03', title: 'AI-Driven Software Solutions', desc: 'Innovating and integrating advanced Artificial Intelligence models to solve complex software challenges and automate digital workflows.' }
            ].map((service) => (
              <div key={service.num} className="group flex flex-col md:flex-row gap-6 md:gap-16 items-start border-t-2 border-black/10 py-12 hover:bg-black/[0.02] transition-colors rounded-2xl px-4 md:px-8 -mx-4 md:-mx-8">
                <span className="text-6xl md:text-[8rem] leading-none font-black text-black/10 group-hover:text-[#B600A8] transition-colors duration-500 shrink-0">
                  {service.num}
                </span>
                <div className="flex-1 mt-2 md:mt-6">
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{service.title}</h3>
                  <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-3xl font-light">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROJECT CARDS (Sticky Stacking Deck) */}
      <section id="projects" className="relative z-30 bg-[#0C0C0C] pt-32 pb-64 px-4 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black mb-24 tracking-tighter text-white">Selected Works.</h2>
          
          <div className="relative flex flex-col gap-12 md:gap-0">
            {[
              { id: 1, title: 'Masar Platform', desc: 'Enterprise-grade institution management ecosystem. Architected with Next.js and Tailwind CSS to deliver seamless administrative workflows, absolute scalability, and bleeding-edge performance.', color: 'from-[#0C1E3E] to-[#123063]', link: 'https://masar-ivory-beta.vercel.app/' },
              { id: 2, title: 'Workflow Nets', desc: 'A comprehensive, world-class enterprise and project management platform. Engineered to streamline complex organizational structures and deliver high-level operational efficiency globally.', color: 'from-[#18011F] to-[#7621B0]', link: 'https://www.workflownets.com/' },
              { id: 3, title: 'Humanitarian Logistical Hubs', desc: 'Specialized data analytics interface helping streamline multi-site parcel monitoring systems.', color: 'from-[#3E1A0C] to-[#BE4C00]', link: '#' }
            ].map((proj, i) => (
              <div 
                key={proj.id} 
                className={`md:sticky w-full min-h-[60vh] rounded-[3rem] p-8 md:p-20 flex flex-col justify-between border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br ${proj.color}`}
                style={{ top: `calc(15vh + ${i * 40}px)`, zIndex: i }}
              >
                <div>
                  <div className="flex flex-col md:flex-row justify-between md:items-start mb-12 gap-8">
                    <h3 className="text-4xl md:text-7xl font-black max-w-3xl leading-[1.1] tracking-tight">{proj.title}</h3>
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-white -rotate-45" />
                    </div>
                  </div>
                  <p className="text-xl md:text-3xl text-white/80 max-w-2xl font-light leading-relaxed">{proj.desc}</p>
                </div>
                <div className="flex justify-start md:justify-end mt-16 md:mt-0">
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-all font-bold tracking-widest uppercase flex items-center gap-3">
                    View Project <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="relative z-40 bg-[#080808] pt-40 pb-16 px-4 lg:px-12 border-t border-white/5 rounded-t-[3rem] md:rounded-t-[5rem] mt-[-10rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-gradient-to-b from-[#3b82f6]/10 via-[#B600A8]/5 to-transparent blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-black mb-8 tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
            Let's build<br />something<br />extraordinary.
          </h2>
          <p className="text-xl md:text-2xl text-[#8899A6] max-w-2xl font-light mb-16 leading-relaxed">
            Ready to engineer the next big thing? Whether it's a massive architecture or an immersive web experience, I'm ready to craft it.
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-40">
            {/* Interactive Social Circles as Main CTAs */}
            <a 
              href="https://www.linkedin.com/in/mahmoud-salem-052495419" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-500 hover:scale-110 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2] shadow-[inset_0_0_30px_rgba(255,255,255,0.05),_0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_0_50px_rgba(10,102,194,0.3),_0_20px_50px_rgba(10,102,194,0.5)]"
            >
              <Linkedin className="w-8 h-8 md:w-12 md:h-12 text-white/40 group-hover:text-[#0A66C2] transition-colors duration-500" />
            </a>

            <a 
              href="https://github.com/MahmoudSalem322" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-500 hover:scale-110 hover:bg-white/10 hover:border-white shadow-[inset_0_0_30px_rgba(255,255,255,0.05),_0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_0_50px_rgba(255,255,255,0.2),_0_20px_50px_rgba(255,255,255,0.4)]"
            >
              <Github className="w-8 h-8 md:w-12 md:h-12 text-white/40 group-hover:text-white transition-colors duration-500" />
            </a>

            <a 
              href="mailto:mahmoudsalem3321@gmail.com" 
              className="group flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-500 hover:scale-110 hover:bg-[#EA4335]/10 hover:border-[#EA4335] shadow-[inset_0_0_30px_rgba(255,255,255,0.05),_0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_0_50px_rgba(234,67,53,0.3),_0_20px_50px_rgba(234,67,53,0.5)]"
            >
              <Mail className="w-8 h-8 md:w-12 md:h-12 text-white/40 group-hover:text-[#EA4335] transition-colors duration-500" />
            </a>
          </div>

          {/* Clean Footer */}
          <div className="w-full flex justify-center items-center border-t border-white/10 pt-10">
            <span className="text-white/30 font-bold uppercase tracking-widest text-xs">© 2026 Mahmoud Salem. All rights reserved.</span>
          </div>
        </div>
      </section>

    </div>
  );
}
