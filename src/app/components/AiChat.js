'use client';

import { useState, useRef, useEffect } from 'react';

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Greetings from NextFabric Sourcing. I am your AI Design and Textile Assistant. Ask me about the weight, drape, or suitability of our cottons, Belgian flax linens, or luxury Mulberry silks!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userQuery = input.toLowerCase();
    setInput('');
    setIsTyping(true);

    // Simulate instant retail assistant reply with 1.2s delay
    setTimeout(() => {
      let responseText = '';

      if (userQuery.includes('linen')) {
        responseText = 'Our Belgian Heritage Linen is loomed from 100% Flanders flax (185 GSM). It exhibits rich organic slubbing and a breathable, cool hand-feel. It is optimal for unstructured summer blazers, breezy trousers, and relaxed tailoring. It softens beautifully with every wash.';
      } else if (userQuery.includes('silk')) {
        responseText = 'We stock Grade-A Mulberry Silk Charmeuse (19 Momme, 54" width). It features a liquid-like high-gloss satin front and a soft matte crepe backing. Excellent for luxury linings, slip dresses, and cowl neck garments where fluid drape is essential.';
      } else if (userQuery.includes('cotton')) {
        responseText = 'We offer two premium cottons: Supima Cotton Twill (210 GSM, long-staple California fibers for smooth structured shirts) and Heavyweight Duck Canvas (340 GSM from Okayama, Japan, highly durable for workwear jackets and custom tote bags).';
      } else if (userQuery.includes('swatch') || userQuery.includes('sample')) {
        responseText = 'We provide free Swatch Previews (6" x 6" cuts) for all catalog items. You can request individual fabric swatches directly from their dynamic details page, or order a curated linen/cotton/silk collection binder. Swatch cards ship next business day!';
      } else if (userQuery.includes('shipping') || userQuery.includes('delivery')) {
        responseText = 'Orders placed before 2 PM PST are cut, rolled, and dispatched the same evening. Domestic standard transit is 2-3 business days. Overnight priority shipping is available during checkout for urgent tailoring deadlines.';
      } else {
        responseText = 'To achieve a premium silhouette, I recommend matching the GSM weight to your pattern. Choose Supima cotton or Japanese duck canvas for structure, Flanders flax linen for organic summer styling, and Mulberry silk for flowing drapery. How else can I assist your design choices today?';
      }

      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white shadow-lg shadow-brand-indigo/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Toggle Sourcing Assistant"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.765 6 6 0 001.94-3.479C4.03 15.352 3 13.774 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-96 flex-col rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-zinc-950 px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-white leading-none">Textile Expert</h3>
                <span className="text-[10px] text-zinc-500 font-medium">Sourcing & Design Assistant</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border font-bold text-xs shrink-0 select-none ${
                  msg.sender === 'user'
                    ? 'bg-brand-indigo/10 border-brand-indigo/20 text-brand-cyan'
                    : 'bg-white/5 border-white/10 text-zinc-300'
                }`}>
                  {msg.sender === 'user' ? 'U' : 'AI'}
                </div>

                {/* Message Body */}
                <div className="space-y-1">
                  <div className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-indigo text-white rounded-tr-none'
                      : 'bg-zinc-950 text-zinc-300 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="text-[9px] text-zinc-500 text-right px-1">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator bubble */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-zinc-400 shrink-0">
                  AI
                </div>
                <div className="rounded-2xl rounded-tl-none bg-zinc-950 border border-white/5 px-4 py-2.5 text-xs text-zinc-500 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <form onSubmit={handleSendMessage} className="bg-zinc-950 p-4 border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about linen, silk, swatches..."
              className="w-full rounded-xl bg-zinc-900 border border-white/10 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
            />
            <button
              type="submit"
              className="rounded-xl bg-brand-indigo hover:bg-brand-indigo/90 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </>
  );
}
