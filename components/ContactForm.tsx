"use client";

import type { ChangeEvent, FormEvent } from 'react';

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function ContactForm({ formData, onChange, onSubmit }: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
            onChange={onChange}
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
            onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#adc6ff]/60 focus:outline-none text-on-surface font-sans text-xs rounded-sm transition-all resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-[#adc6ff] hover:bg-[#00d0d8] text-[#003739] font-mono text-xs font-bold uppercase tracking-widest rounded-sm transition-all"
      >
        TRANSMIT_PACKET
      </button>
    </form>
  );
}
