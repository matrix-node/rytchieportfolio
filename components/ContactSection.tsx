"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, MapPin, Send, CheckCircle2, Terminal, AlertCircle } from 'lucide-react';
import { USER_PROFILE } from '../data';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [txState, setTxState] = useState<'IDLE' | 'TRANSMITTING' | 'RESOLVED' | 'ERROR'>('IDLE');
  const [txLogs, setTxLogs] = useState<string[]>([]);

  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setTxState('ERROR');
      return;
    }

    setTxState('TRANSMITTING');
    setTxLogs([
      '>> INITIALIZING TRANSMISSION PACKET...',
      '>> ESTABLISHING SECURE PORT HOOKS...',
    ]);

    await sleep(700);
    setTxLogs(prev => [...prev, '>> DNS RESOLUTION: NBO-KEM GATEWAY ACTIVE [OK]']);
    
    await sleep(650);
    setTxLogs(prev => [...prev, `>> COMPILING PAYLOAD: SUBJECT "${formData.subject || 'GENERAL_QUERIES'}"`]);
    
    await sleep(800);
    setTxLogs(prev => [...prev, '>> VALIDATING SENDER CHECKSUM (anti-bots)... PASSED']);
    
    await sleep(600);
    setTxLogs(prev => [...prev, '>> TRANSMISSION COURIED SUCCESSFULLY!']);

    await sleep(400);
    setTxState('RESOLVED');
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTxState('IDLE');
    setTxLogs([]);
  };

  return (
    <section id="contact" className="py-20 relative text-left select-text">
      {/* Glow highlight */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#adc6ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title elements */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-[#adc6ff]" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-outline">
              SECURE_TELEMETRY // CHANNELS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-on-surface font-sans uppercase">
            Let&apos;s talk shop
          </h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
            Got a website idea, a broken layout, or a bug acting possessed? Drop a coordinate. I resolve digital chaos thoroughly.
          </p>
        </div>

        {/* Layout breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel contact metrics */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/20 font-mono text-[9px] uppercase tracking-wider rounded-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                AVAILABLE_FOR_CONTRACTS
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Open to frontend development, Web solutions, Microsoft Applications training, Arch configs, and cybersecurity diagnostics. Use the form or dispatch directly.
              </p>
            </div>

            {/* Direct coordinate badges */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-3 p-3.5 bg-[#1c2026]/50 border border-white/10 rounded-xl shadow-lg">
                <MapPin className="w-4 h-4 text-[#adc6ff]" />
                <div>
                  <span className="text-outline block text-[9px] uppercase">LOCALE</span>
                  <span className="text-on-surface font-medium">{USER_PROFILE.location} // {USER_PROFILE.timezone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-[#1c2026]/50 border border-white/10 rounded-xl shadow-lg">
                <Mail className="w-4 h-4 text-[#ffb786]" />
                <div>
                  <span className="text-outline block text-[9px] uppercase">DIRECT_MAIL</span>
                  <a href={`mailto:${USER_PROFILE.email}`} className="text-on-surface hover:text-[#adc6ff] hover:underline transition-all">
                    {USER_PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social matrix */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-outline block">
                [ SOCIAL_NETWORK_HOOKS ]
              </span>
              <div className="flex gap-2.5">
                {[
                  { name: 'Github', url: USER_PROFILE.github, icon: Github },
                  { name: 'Linkedin', url: USER_PROFILE.linkedin, icon: Linkedin },
                  { name: 'Twitter', url: USER_PROFILE.twitter, icon: Twitter }
                ].map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl border border-white/10 bg-[#1c2026]/50 hover:border-[#adc6ff]/40 hover:text-on-surface flex items-center justify-center text-on-surface-variant transition-all cursor-pointer shadow-lg"
                      title={soc.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right panel terminal contact form */}
          <div className="lg:col-span-7 bg-[#1c2026]/50 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Form control bar */}
            <div className="bg-[#181c22] px-4 py-3 border-b border-white/5 flex justify-between items-center select-none">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#adc6ff]" />
                <span className="font-mono text-[9px] text-[#849495] tracking-widest uppercase">
                  TRANSMITTER_V1.02_LOADED
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            </div>

            {/* Inner dynamic segments depending on status */}
            <div className="p-6">
              {txState === 'IDLE' && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="font-mono text-[9px] uppercase text-outline">
                        SENDER_IDENTIFIER (Name)
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Linus Torvalds"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#adc6ff]/60 focus:outline-none text-on-surface font-mono text-xs rounded-sm transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="font-mono text-[9px] uppercase text-outline">
                        SENDER_ROUTING_INFO (Email)
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. linus@kernel.org"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#adc6ff]/60 focus:outline-none text-on-surface font-mono text-xs rounded-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="font-mono text-[9px] uppercase text-outline">
                      PROTOCOL_SUBJECT
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Website construction // Arch help"
                      className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#adc6ff]/60 focus:outline-none text-on-surface font-mono text-xs rounded-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="font-mono text-[9px] uppercase text-outline">
                      TRANSMISSION_PAYLOAD
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Got some bugs acting possessed or layouts shifting maliciously? Let me know..."
                      className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#adc6ff]/60 focus:outline-none text-on-surface font-sans text-xs rounded-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#adc6ff] hover:bg-[#00d0d8] text-[#003739] font-mono text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(173,198,255,0.15)] focus:outline-none active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" /> TRANSMIT_PACKET
                  </button>
                </form>
              )}

              {/* Transmitting console animation */}
              {txState === 'TRANSMITTING' && (
                <div className="py-8 text-center space-y-6">
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 border-2 border-[#adc6ff]/10 rounded-full" />
                    <div className="absolute inset-0 border-2 border-t-[#adc6ff] rounded-full animate-spin" />
                  </div>
                  <div className="text-left max-w-sm mx-auto p-4 bg-black rounded border border-white/10 space-y-1.5 font-mono text-[10px]">
                    {txLogs.map((log, lIdx) => (
                      <div key={lIdx} className="text-[#adc6ff]">
                        {log}
                      </div>
                    ))}
                    <div className="w-1.5 h-3.5 bg-[#adc6ff] animate-pulse inline-block" />
                  </div>
                </div>
              )}

              {/* Resolved / Success card screen */}
              {txState === 'RESOLVED' && (
                <div className="py-8 text-center space-y-5">
                  <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto animate-bounce" />
                  <div className="space-y-2">
                    <h3 className="font-mono text-sm uppercase text-on-surface tracking-widest leading-relaxed">
                      // SECURE_DISPATCH: RESOLVED
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-sm mx-auto font-sans leading-relaxed">
                      Checksum verified. Your communication coordinate has successfully reached Nakuru server files. Rytchie will execute the reply script soon.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-[#424754]/30 text-primary-fixed hover:border-[#adc6ff]/45 font-mono text-[9px] uppercase tracking-wider rounded transition-all cursor-pointer focus:outline-none"
                  >
                    [ NEW_TRANSMISSION ]
                  </button>
                </div>
              )}

              {/* Error fallback state */}
              {txState === 'ERROR' && (
                <div className="py-8 text-center space-y-4">
                  <AlertCircle className="w-11 h-11 text-rose-400 mx-auto" />
                  <h3 className="font-mono text-sm uppercase text-rose-300 tracking-widest">
                    // PIPELINE_ERROR: EMPTY_PAYLOAD
                  </h3>
                  <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                    A critical parameter is missing. Please ensure your Identification and Payload segments are fully compiled before hitting the uplink thread.
                  </p>
                  <button
                    onClick={() => setTxState('IDLE')}
                    className="px-4 py-2 border border-rose-400/30 text-rose-400 hover:bg-rose-500/5 font-mono text-[9px] uppercase tracking-wider rounded transition-all cursor-pointer"
                  >
                    [ RECONFIGURE_PACKET ]
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
