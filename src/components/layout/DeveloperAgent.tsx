import React from 'react';
import { motion } from 'framer-motion';

export const DeveloperAgent: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 p-8 lg:p-12 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden group border border-indigo-500/30"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start gap-12">
        {/* Avatar/Badge Area */}
        <div className="relative self-center lg:self-start">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-48 h-48 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex items-center justify-center relative z-10 shadow-2xl overflow-hidden"
          >
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-cyan-300">
              AH
            </span>
            {/* Scanning line effect */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-0.5 bg-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-20"
            />
          </motion.div>
          <div className="absolute -inset-6 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/40 transition-colors" />
        </div>

        {/* Content Area */}
        <div className="flex-1 text-center lg:text-left w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Lead System Architect Identified
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-2 tracking-tight">
            Md. Anwar <span className="text-indigo-400 font-light italic">Hossain</span>
          </h2>
          
          <p className="text-indigo-300/80 font-bold text-sm lg:text-base mb-6 tracking-wide uppercase">
            B.Sc. in Computer Science & Engineering
          </p>

          <p className="text-slate-400 text-lg max-w-3xl leading-relaxed font-medium mb-10">
            A specialized Frontend Engineer synthesizing high-performance 
            React environments. Expert in architectural design, 
            interactive protocols, and premium aesthetic deployment.
          </p>

          {/* Contact & Social Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto lg:mx-0">
            {/* Email */}
            <a href="mailto:anwar.hossain.rana8811@gmail.com" className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/link">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover/link:bg-indigo-500 group-hover/link:text-white transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Email Address</span>
                <span className="text-sm text-slate-300 font-bold truncate">anwar.hossain.rana8811@gmail.com</span>
              </div>
            </a>
            
            {/* WhatsApp */}
            <a href="https://wa.me/8801789133715" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/link">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover/link:bg-green-500 group-hover/link:text-white transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.328-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.148-.471-1.138-.645-1.553-.171-.406-.337-.35-.473-.357-.122-.006-.263-.007-.402-.007-.139 0-.365.052-.556.25-.19.198-.726.709-.726 1.728 0 1.018.741 2.002.843 2.14.102.137 1.457 2.228 3.53 3.121.493.212.878.339 1.179.435.495.158.946.135 1.3.083.395-.058 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">WhatsApp</span>
                <span className="text-sm text-slate-300 font-bold">+880 1789 133715</span>
              </div>
            </a>

            {/* GitHub */}
            <a href="https://github.com/ranak8811" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/link">
              <div className="w-12 h-12 rounded-xl bg-slate-700/20 flex items-center justify-center text-slate-300 group-hover/link:bg-slate-700 group-hover/link:text-white transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.09.825-.26.825-.58 0-.285-.015-1.23-.015-2.23-3.33.72-4.035-1.415-4.035-1.415-.545-1.39-1.33-1.76-1.33-1.76-1.085-.745.085-.73.085-.73 1.205.085 1.84 1.235 1.84 1.235 1.07 1.835 2.805 1.305 3.495.995.105-.775.44-1.305.76-1.605-2.665-.3-5.465-1.335-5.465-5.93 0-1.31.465-2.38 1.235-3.22-.125-.305-.535-1.525.115-3.175 0 0 1.005-.32 3.3 1.23.96-.265 1.98-.4 3-.405 1.02.005 2.04.14 3 .405 2.28-1.55 3.285-1.23 3.285-1.23.655 1.65.245 2.87.12 3.175.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.285.81 2.59 0 1.87-.015 3.37-.015 3.83 0 .325.225.685.825.575C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">GitHub</span>
                <span className="text-sm text-slate-300 font-bold truncate">@ranak8811</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ranak8811/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/link">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover/link:bg-blue-600 group-hover/link:text-white transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">LinkedIn</span>
                <span className="text-sm text-slate-300 font-bold truncate">ranak8811</span>
              </div>
            </a>

            {/* Portfolio */}
            <a href="https://anwar-portfolio-a49f2.web.app/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/link">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover/link:bg-indigo-500 group-hover/link:text-white transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Portfolio</span>
                <span className="text-sm text-slate-300 font-bold truncate">Live Environment</span>
              </div>
            </a>
          </div>

          {/* CV Action */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-white/5">
            <a 
              href="/Resume_of_Anwar_Frontend.pdf" 
              download
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-950/50 transition-all active:scale-95 flex items-center justify-center gap-3 group/btn overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="h-6 h-6 text-indigo-200 group-hover/btn:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Full Protocol (CV)
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
            </a>
            
            <p className="text-[10px] font-mono text-slate-600 tracking-[0.2em] uppercase text-center sm:text-left">
              System ID: AH-774-ALPHA // Verified Engineer
            </p>
          </div>
        </div>
      </div>

      {/* Decorative background text */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 text-[12rem] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter italic">
        Anwar
      </div>
    </motion.div>
  );
};
