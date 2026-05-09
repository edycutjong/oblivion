"use client";

import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

import React, { useState } from 'react';
import { oblivionEncryptionService } from '@/lib/encrypt-ika';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, Activity, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'trade' | 'audit'>('home');
  const [orderStage, setOrderStage] = useState<'idle' | 'encrypting' | 'queued' | 'settling' | 'settled'>('idle');
  const [hash, setHash] = useState('');
  const [viewingKey, setViewingKey] = useState('');
  const [decrypted, setDecrypted] = useState(false);

  const handlePlaceOrder = async () => {
    setOrderStage('encrypting');
    
    const hashData = await oblivionEncryptionService.encryptOrderData({ pair: "SOL/ETH", size: "500000" });
    setHash(hashData);
    
    setTimeout(() => setOrderStage('queued'), 800);
    setTimeout(() => setOrderStage('settling'), 3000);
    setTimeout(() => setOrderStage('settled'), 6000);
  };

  const handleDecrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await oblivionEncryptionService.decryptForAuditor(viewingKey);
      setDecrypted(true);
    } catch {
      alert("Invalid viewing key.");
    }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 }
  };

  return (
    <>
      <StatusBar />
      <main className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-black text-slate-300 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <header className="border-b border-white/5 bg-black/20 p-4 px-8 flex justify-between items-center backdrop-blur-xl relative z-10">
          <button 
            onClick={() => setActiveTab('home')}
            className="font-mono text-cyan-500 font-bold tracking-widest text-xl hover:text-cyan-400 transition-colors flex items-center gap-2"
          >
            <Shield className="w-6 h-6" />
            OBLIVION
          </button>
          
          <nav className="flex gap-4">
            <button 
              onClick={() => setActiveTab('trade')}
              className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${activeTab === 'trade' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'hover:bg-white/5 text-slate-400 border border-transparent'}`}
            >
              TRADE
            </button>
            <button 
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${activeTab === 'audit' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'hover:bg-white/5 text-slate-400 border border-transparent'}`}
            >
              COMPLIANCE
            </button>
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto relative z-10 flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div key="home" className="flex-1 flex" {...pageTransition}>
                <Hero onEnter={() => setActiveTab('trade')} />
              </motion.div>
            )}

            {activeTab === 'trade' && (
              <motion.div key="trade" className="flex-1 p-8 max-w-6xl mx-auto w-full" {...pageTransition}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                  
                  {/* Order Form */}
                  <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <Activity className="w-6 h-6 text-cyan-400" />
                      <h2 className="text-xl text-white font-bold">New Order</h2>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs text-slate-400 font-mono mb-2">PAIR</label>
                        <div className="bg-black/50 border border-white/5 p-4 rounded-xl font-mono text-white flex justify-between items-center">
                          <span>SOL / ETH</span>
                          <span className="text-xs text-slate-500">CROSS-CHAIN</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 font-mono mb-2">SIZE (USD)</label>
                        <input type="text" defaultValue="500000" className="w-full bg-black/50 border border-white/5 p-4 rounded-xl font-mono text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all" />
                      </div>
                      <motion.button 
                        whileHover={orderStage === 'idle' ? { scale: 1.02 } : {}}
                        whileTap={orderStage === 'idle' ? { scale: 0.98 } : {}}
                        onClick={handlePlaceOrder}
                        disabled={orderStage !== 'idle'}
                        className="w-full relative group overflow-hidden bg-linear-to-r from-cyan-600 to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-xl mt-4 transition-all"
                      >
                        {orderStage === 'idle' ? (
                          <>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <Shield className="w-4 h-4" />
                              Encrypt & Submit
                            </span>
                            <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </>
                        ) : 'Processing...'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Order Status / Timeline */}
                  <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-2xl lg:col-span-2 flex flex-col">
                    <h2 className="text-xl text-white font-bold mb-6">Execution Pipeline</h2>
                    
                    {orderStage === 'idle' ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 font-mono text-sm border-2 border-dashed border-white/5 rounded-xl min-h-[300px]">
                        <Activity className="w-8 h-8 mb-4 opacity-50" />
                        Waiting for order submission...
                      </div>
                    ) : (
                      <div className="flex-1 space-y-6">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${orderStage === 'encrypting' ? 'bg-cyan-400 animate-ping' : 'bg-cyan-500'}`}></div>
                          <div className="flex-1">
                            <div className="text-sm font-mono text-cyan-400 font-bold">1. Encrypt SDK (Solana)</div>
                            <div className="font-mono text-slate-300 bg-black/50 p-3 rounded-lg mt-2 border border-white/5 text-sm break-all shadow-inner">
                              {hash}
                            </div>
                          </div>
                        </motion.div>

                        {(orderStage === 'queued' || orderStage === 'settling' || orderStage === 'settled') && (
                          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <div className="flex-1">
                              <div className="text-sm font-mono text-amber-400 font-bold">2. P2P Dark Pool Match</div>
                              <div className="text-sm text-slate-400 mt-1">Order matched off-chain securely.</div>
                            </div>
                          </motion.div>
                        )}

                        {(orderStage === 'settling' || orderStage === 'settled') && (
                          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${orderStage === 'settling' ? 'bg-purple-500 animate-pulse' : 'bg-purple-500'}`}></div>
                            <div className="flex-1">
                              <div className="text-sm font-mono text-purple-400 font-bold">3. Ika MPC Settlement</div>
                              <div className="text-sm text-slate-400 mt-2 inline-flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg">
                                <span>Solana</span>
                                <ArrowRight className="w-4 h-4 text-purple-500" />
                                <span>Ethereum (Bridgeless)</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {orderStage === 'settled' && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 border border-green-500/30 bg-green-500/10 rounded-xl mt-8 flex items-center gap-3 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                            <div className="text-green-400 font-bold text-lg">
                              Trade Settled Successfully
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'audit' && (
              <motion.div key="audit" className="flex-1 p-8 max-w-2xl mx-auto w-full pt-16" {...pageTransition}>
                <div className="bg-slate-900/60 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl transition-colors duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="w-8 h-8 text-purple-400" />
                    <h2 className="text-3xl text-white font-bold tracking-tight">Compliance Portal</h2>
                  </div>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">Authorized Auditors: Enter your cryptographic Viewing Key to decrypt the order book.</p>
                  
                  {!decrypted ? (
                    <form onSubmit={handleDecrypt} className="space-y-6">
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input 
                          type="text" 
                          placeholder="Paste Viewing Key (e.g. vk_9x8f...)" 
                          value={viewingKey}
                          onChange={e => setViewingKey(e.target.value)}
                          className="w-full pl-12 pr-4 bg-black/50 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 p-4 rounded-xl font-mono text-white outline-none transition-all"
                        />
                      </div>
                      
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-purple-500/20"
                      >
                        Decrypt Order
                      </motion.button>
                      
                      <div className="mt-8 p-6 bg-red-950/30 border border-red-500/20 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
                        <div className="text-red-400 font-bold mb-3 flex items-center gap-2">
                          <Lock className="w-5 h-5" />
                          Access Denied: Data Encrypted
                        </div>
                        <div className="font-mono text-xs text-red-300/50 break-all leading-relaxed">
                          8f2d5a3c9b1e4f289c0a1d4f7b6e9c2a5d8f1e4b7c0a3d6f9b2e5a1c3d4f5e6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
                        </div>
                      </div>
                    </form>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-green-950/30 border border-green-500/30 rounded-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                      
                      <div className="text-green-400 font-bold mb-6 flex items-center gap-2 text-xl">
                        <Shield className="w-6 h-6" />
                        Access Granted: Order Decrypted
                      </div>
                      
                      <div className="space-y-4 font-mono text-sm bg-black/40 p-6 rounded-lg border border-white/5">
                        <div className="flex justify-between border-b border-white/5 pb-3">
                          <span className="text-slate-500">Order ID</span>
                          <span className="text-white font-bold">ORD-9842</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-3">
                          <span className="text-slate-500">Trader</span>
                          <span className="text-cyan-400">0x7F...3B92</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-3">
                          <span className="text-slate-500">Size</span>
                          <span className="text-white font-bold">$500,000 (SOL)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Destination</span>
                          <span className="text-white">ETH Mainnet (Ika)</span>
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-8 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-400 font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
                      >
                        <Shield className="w-5 h-5" />
                        Generate PDF Report
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
