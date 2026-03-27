'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Target, Video, ArrowRight, Sparkles, Zap, ShieldCheck, MonitorPlay } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Absolute Abstract Background Elements for Premium Glassmorphism */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 via-purple-600/5 to-transparent blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/30 rounded-full blur-[120px]"></div>
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      {/* Sleek Universal Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Omixa<span className="text-indigo-400 font-normal">.ai</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
          <a href="#agents" className="hover:text-white transition-colors">Neural Agents</a>
          <a href="#pricing" className="hover:text-white transition-colors">SaaS Pricing</a>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Client Login</Link>
          <Link href="/onboarding" className="px-6 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            Initialize Engine
          </Link>
        </div>
      </nav>

      {/* Advanced Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <Sparkles size={14} className="text-indigo-400" />
          <span>V3 Autonomous Architecture Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-[1.05] mb-6 max-w-5xl"
        >
          The world's first <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">self-driving</span> marketing workforce.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed font-light"
        >
          Stop managing campaigns. Deploy 7 unified LangGraph agents that autonomously discover leads, synthesize video creatives, and aggressively scale your ROAS while you sleep.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href="/onboarding" className="group relative px-8 py-4 bg-white text-slate-950 font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_8px_rgba(99,102,241,0.3)]">
            <span className="relative z-10 flex items-center gap-2">Deploy AI Agents <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
          </Link>
          <Link href="/dashboard" className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800/80 text-white font-bold text-lg rounded-full border border-slate-700 backdrop-blur-md transition-colors flex items-center gap-3">
            <MonitorPlay size={20} className="text-indigo-400"/> Enter Dashboard
          </Link>
        </motion.div>
      </main>

      {/* Asymmetric Bento Box Feature Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: B2B Scraper */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2 bg-[#0B0F19] border border-slate-800/70 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-slate-700 transition-colors shadow-2xl shadow-black/50"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8 shadow-inner shadow-emerald-500/20">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Hunter.io & LinkedIn Sync</h3>
              <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
                The Discovery Agent bypasses generic limits by leveraging Apify proxies to aggressively extract B2B decision makers, scoring them live via OpenAI before validating corporate emails.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Neural Video */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 bg-[#0B0F19] border border-slate-800/70 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-slate-700 transition-colors shadow-2xl shadow-black/50"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/5 to-purple-500/5 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition-colors duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-8 shadow-inner shadow-pink-500/20">
                <Video size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Neural Rendering</h3>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                Convert LangChain text drafts into lip-synced 4K Reels via native HeyGen integrations directly in your browser.
              </p>
              <Link href="/video" className="text-pink-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto w-fit bg-pink-500/10 px-4 py-2 rounded-lg hover:bg-pink-500/20">
                Launch Studio <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Card 3: Auto-Kill */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 bg-[#0B0F19] border border-slate-800/70 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-slate-700 transition-colors shadow-2xl shadow-black/50"
          >
             <div className="relative z-10 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-8 shadow-inner shadow-amber-500/20">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Budget Auto-Kill</h3>
              <p className="text-slate-400 leading-relaxed">
                Aggressive Celery logic sweepers algorithmically terminate Meta Ad Sets automatically dropping below a 2.0x ROAS integer. Zero wasted ad spend.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Orchestrator */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 md:col-span-2 bg-[#0B0F19] border border-slate-800/70 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-slate-700 transition-colors shadow-2xl shadow-black/50"
          >
             <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/4 group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
             <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                  <BrainCircuit size={28} />
                </div>
                <div className="w-10 h-[2px] bg-slate-700"></div>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Zap size={28} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">LangGraph Central Orchestrator</h3>
              <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                Connect Discovery, SDR Emailing, Ads Buying, and Virtual Video Generators into a single unstoppable robotic workflow that commands itself via an overriding global context. The apex definition of SaaS Autonomy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
