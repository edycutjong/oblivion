"use client";

import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";

import React, { useState } from 'react';
import { oblivionEncryptionService } from '@/lib/encrypt-ika';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'trade' | 'audit'>('trade');
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

  return (
    <>
      <StatusBar />
    <main className="min-h-screen flex flex-col bg-slate-950 text-slate-300">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 px-8 flex justify-between items-center backdrop-blur">
        <div className="font-mono text-cyan-500 font-bold tracking-widest text-lg">OBLIVION</div>
        <nav className="flex gap-4">
          <button 
            onClick={() => setActiveTab('trade')}
            className={`px-4 py-2 rounded font-mono text-sm transition-colors ${activeTab === 'trade' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'hover:bg-slate-800'}`}
          >
            TRADE
          </button>
          <button 
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded font-mono text-sm transition-colors ${activeTab === 'audit' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'hover:bg-slate-800'}`}
          >
            COMPLIANCE AUDIT
          </button>
        </nav>
      </header>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'trade' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Order Form */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl backdrop-blur">
                <h2 className="text-xl text-white font-bold mb-6">New Order</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 font-mono mb-2">PAIR</label>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded font-mono text-white">SOL / ETH</div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 font-mono mb-2">SIZE (USD)</label>
                    <input type="text" defaultValue="500000" className="w-full bg-slate-950 border border-slate-800 p-3 rounded font-mono text-white focus:border-cyan-500 outline-none" />
                  </div>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={orderStage !== 'idle'}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded mt-4 transition-colors"
                  >
                    {orderStage === 'idle' ? 'Encrypt & Submit' : 'Processing...'}
                  </button>
                </div>
              </div>

              {/* Order Status / Timeline */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl backdrop-blur lg:col-span-2 flex flex-col">
                <h2 className="text-xl text-white font-bold mb-6">Execution Pipeline</h2>
                
                {orderStage === 'idle' ? (
                  <div className="flex-1 flex items-center justify-center text-slate-600 font-mono text-sm border-2 border-dashed border-slate-800 rounded-xl">
                    Waiting for order submission...
                  </div>
                ) : (
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${orderStage === 'encrypting' ? 'bg-cyan-500 animate-ping' : 'bg-cyan-500'}`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-mono text-cyan-400">1. Encrypt SDK (Solana)</div>
                        <div className="font-mono text-white bg-slate-950 p-2 rounded mt-1 border border-slate-800 text-sm">
                          {hash}
                        </div>
                      </div>
                    </div>

                    {(orderStage === 'queued' || orderStage === 'settling' || orderStage === 'settled') && (
                      <div className="animate-in slide-in-from-top-4 flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="flex-1">
                          <div className="text-sm font-mono text-amber-400">2. P2P Dark Pool Match</div>
                          <div className="text-sm text-slate-400 mt-1">Order matched off-chain securely.</div>
                        </div>
                      </div>
                    )}

                    {(orderStage === 'settling' || orderStage === 'settled') && (
                      <div className="animate-in slide-in-from-top-4 flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${orderStage === 'settling' ? 'bg-purple-500 animate-pulse' : 'bg-purple-500'}`}></div>
                        <div className="flex-1">
                          <div className="text-sm font-mono text-purple-400">3. Ika MPC Settlement</div>
                          <div className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                            <span>Solana</span>
                            <span className="text-purple-500">→</span>
                            <span>Ethereum (Bridgeless)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {orderStage === 'settled' && (
                      <div className="animate-in slide-in-from-top-4 p-4 border border-green-500/30 bg-green-500/10 rounded-xl mt-8">
                        <div className="text-green-400 font-bold flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                          Trade Settled Successfully
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl backdrop-blur transition-colors duration-500">
                <h2 className="text-2xl text-white font-bold mb-2">Compliance Portal</h2>
                <p className="text-slate-400 text-sm mb-8">Auditors: Enter your Viewing Key to decrypt the order book.</p>
                
                {!decrypted ? (
                  <form onSubmit={handleDecrypt} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Paste Viewing Key (e.g. vk_9x8f...)" 
                      value={viewingKey}
                      onChange={e => setViewingKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 p-4 rounded font-mono text-white outline-none"
                    />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded font-bold transition-colors">
                      Decrypt Order
                    </button>
                    
                    <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <div className="text-red-400 font-bold mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        Access Denied: Data Encrypted
                      </div>
                      <div className="font-mono text-xs text-red-300 break-all opacity-50">
                        8f2d5a3c9b1e4f289c0a1d4f7b6e9c2a5d8f1e4b7c0a3d6f9b2e5...
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="animate-in fade-in zoom-in-95 duration-500 p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>
                      Access Granted: Order Decrypted
                    </div>
                    
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex justify-between border-b border-green-500/20 pb-2">
                        <span className="text-slate-400">Order ID</span>
                        <span className="text-white">ORD-9842</span>
                      </div>
                      <div className="flex justify-between border-b border-green-500/20 pb-2">
                        <span className="text-slate-400">Trader</span>
                        <span className="text-white">0x7F...3B92</span>
                      </div>
                      <div className="flex justify-between border-b border-green-500/20 pb-2">
                        <span className="text-slate-400">Size</span>
                        <span className="text-white">$500,000 (SOL)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Destination</span>
                        <span className="text-white">ETH Mainnet (Ika)</span>
                      </div>
                    </div>

                    <button className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded transition-colors flex justify-center items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      Generate PDF Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
}
