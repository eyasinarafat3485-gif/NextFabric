'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Welcome to NextFabric Sourcing! 🧵 I am your AI Design and E-commerce Assistant. Discover our Trending Products, Premium Panjabis, and Qualityfull T-Shirts, or ask me about tracking orders and fabric samples!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // E-commerce specific suggestions prioritized as requested
  const suggestions = [
    { label: '🔥 Trending Products', query: 'Show me the trending products' },
    { label: '👑 Premium Panjabi', query: 'Tell me about Premium Panjabi collection' },
    { label: '👕 Qualityfull T-Shirt', query: 'What makes your T-Shirts qualityfull?' },
    { label: '📦 Track Order', query: 'Track my shipping status' },
    { label: '🛍️ Order Samples', query: 'How can I get a free swatch preview?' },
    { label: '🧵 Silk Charmeuse', query: 'Tell me about Mulberry Silk' }
  ];

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Unified response generator logic tailored for NextFabric E-commerce
  const generateAiReply = (queryText) => {
    const userQuery = queryText.toLowerCase();
    setIsTyping(true);

    setTimeout(() => {
      let responseText = '';

      if (userQuery.includes('trending') || userQuery.includes('trend')) {
        responseText = '🔥 Our current NextFabric trendsetters include our 100% Pima Cotton Crewnecks, Liquid-drape Mulberry Silk Slip Dresses, and our newly launched Artisan Embroidered Premium Panjabis. All running fast this season!';
      } else if (userQuery.includes('panjabi')) {
        responseText = '👑 NextFabric Premium Panjabis are crafted from 200+ GSM high-count luxury cotton-silk blends. Featuring minimalist geometric hand-embroidery, hidden plackets, and a structured collar that stays crisp all day long. Perfect for occasions!';
      } else if (userQuery.includes('t-shirt') || userQuery.includes('tshirt')) {
        responseText = '👕 Our Qualityfull T-Shirts feature 100% long-staple Combed Cotton (240 GSM heavy jersey). They are bio-washed for ultimate softness, feature anti-pill structure, and have reinforced double-needle stitched necklines to prevent stretching.';
      } else if (userQuery.includes('linen')) {
        responseText = 'Our Belgian Heritage Linen is loomed from 100% Flanders flax (185 GSM). It exhibits rich organic slubbing and a breathable, cool hand-feel. It is optimal for unstructured summer blazers and relaxed tailoring.';
      } else if (userQuery.includes('silk')) {
        responseText = 'We stock Grade-A Mulberry Silk Charmeuse (19 Momme, 54" width). It features a liquid-like high-gloss satin front and a soft matte crepe backing. Excellent for luxury linings and fluid evening silhouettes.';
      } else if (userQuery.includes('swatch') || userQuery.includes('sample')) {
        responseText = 'We provide free Swatch Previews (6" x 6" cuts) for all catalog items. You can request individual fabric swatches directly from their product page, or order a curated linen/cotton/silk collection binder at checkout.';
      } else if (userQuery.includes('track') || userQuery.includes('shipping') || userQuery.includes('delivery')) {
        responseText = 'Orders placed before 2 PM PST are cut, packed, and dispatched the same evening. Standard domestic transit takes 2-3 business days. Please paste your NextFabric Order ID (e.g., #NF-9821) to look up real-time tracking!';
      } else {
        responseText = 'Looking for premium apparel or custom fabrics? Check out our Trending Products, Premium Panjabis, or Heavyweight T-Shirts. Let me know what specific silhouette or order detail I can help you with!';
      }

      const aiReply = {
        id: Date.now(),
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 1000);
  };

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
    const currentInput = input;
    setInput('');
    generateAiReply(currentInput);
  };

  const handleSuggestionClick = (query) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    generateAiReply(query);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 to-black text-white border border-white/20 shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Toggle Sourcing Assistant"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-neutral-200" />}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[580px] w-96 flex-col rounded-2xl bg-neutral-950 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300 ease-in-out transform scale-100 origin-bottom-right">

          {/* Premium Header */}
          <div className="flex items-center justify-between bg-black px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-neutral-950 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-1">
                  NextFabric AI <Sparkles className="h-3 w-3 text-cyan-400" />
                </h3>
                <span className="text-[11px] text-neutral-400 font-medium">Textile & Order Concierge</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-neutral-900/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Visual Avatar */}
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border shrink-0 select-none shadow-sm ${msg.sender === 'user'
                  ? 'bg-neutral-800 border-white/10 text-white'
                  : 'bg-black border-white/5 text-neutral-300'
                  }`}>
                  {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-cyan-400" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-black text-neutral-200 rounded-tl-none border border-white/5'
                    }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[9px] text-neutral-500 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator bubble */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="h-8 w-8 rounded-full bg-black border border-white/5 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-black border border-white/5 px-4 py-3 text-xs text-neutral-500 flex items-center gap-1.5 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Contextual Suggestions Panel */}
          {!isTyping && (
            <div className="px-4 py-2 bg-black/40 border-t border-white/5">
              <p className="text-[10px] text-neutral-500 font-medium mb-1.5 px-1">Suggested Actions</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug.query)}
                    className="text-[11px] bg-black border border-white/10 hover:border-cyan-400/40 hover:bg-neutral-900 text-neutral-300 px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input Bar */}
          <form onSubmit={handleSendMessage} className="bg-black p-4 border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about premium clothing, swatches, orders..."
              className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 p-2.5 text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}