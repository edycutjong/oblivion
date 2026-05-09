"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, ArrowRight } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-mono mb-8 mx-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Ika MPC + Encrypt SDK Live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          The Dark Pool for
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-500 to-indigo-500">
            Confidential RWA
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          AI-Brokered OTC trading with zero information leakage. Settle cross-chain securely using cutting-edge Multiparty Computation and Fully Homomorphic Encryption.
        </p>

        <motion.div 
          className="pt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button 
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:bg-slate-200"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-black"></span>
            <span className="relative z-10 flex items-center gap-2">
              Enter Dark Pool
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 h-full w-full bg-white/20 blur-md group-hover:animate-pulse"></div>
          </button>
        </motion.div>

        {/* Features Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
          {[
            {
              icon: ShieldCheck,
              title: "Zero-Knowledge",
              desc: "Orders encrypted via Encrypt SDK. No MEV, no front-running.",
              color: "text-green-400",
              bg: "bg-green-500/10"
            },
            {
              icon: Zap,
              title: "Cross-Chain Settlement",
              desc: "Bridgeless execution powered by Ika MPC network.",
              color: "text-cyan-400",
              bg: "bg-cyan-500/10"
            },
            {
              icon: Lock,
              title: "Cryptographic Audit",
              desc: "Compliance ready. Viewing keys for authorized auditors only.",
              color: "text-purple-400",
              bg: "bg-purple-500/10"
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl text-left hover:border-slate-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-white font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
