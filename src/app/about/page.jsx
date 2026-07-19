'use client';

import { useState } from 'react';

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState('story');

    // AI Chat State
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your NextFabric AI Assistant. Ask me anything about our weaves, sustainable certifications, or fabric draping guidelines!", isBot: true }
    ]);
    const [inputMsg, setInputMsg] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // AI Chat Submit Handler
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMsg.trim()) return;

        const userMsg = { id: Date.now(), text: inputMsg, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInputMsg('');
        setIsTyping(true);

        // Simulated AI contextual response
        setTimeout(() => {
            let botReply = "That's a great question about our premium textiles! Our organic weaves are source-verified and perfectly optimized for bespoke tailoring designs.";
            if (inputMsg.toLowerCase().includes('silk')) {
                botReply = "Our Luxury Silks are 100% organic mulberry silk, weighing 19 momme, providing an elite lustrous drape ideal for couture apparel.";
            } else if (inputMsg.toLowerCase().includes('linen') || inputMsg.toLowerCase().includes('sustainable')) {
                botReply = "Our Heritage Linen collection reduces water consumption by 85% compared to conventional mills, backed by GOTS compliance certificates.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, isBot: true }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-zinc-950  text-zinc-200">
            {/* Hero Section */}
            <div className="bg-zinc-950 pt-8">
                <div className="mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">About NextFabric</h1>
                    <p className="text-2xl text-zinc-400  mx-auto">
                        Premium fabric &amp; fashion for the modern generation.
                    </p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className=" mx-auto px-6 pt-10">
                <div className="flex border-b border-zinc-800">
                    <button
                        onClick={() => setActiveTab('story')}
                        className={`px-8 py-4 text-lg font-medium transition ${activeTab === 'story' ? 'text-white border-b-2 border-violet-500' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                        Our Story
                    </button>
                    <button
                        onClick={() => setActiveTab('mission')}
                        className={`px-8 py-4 text-lg font-medium transition ${activeTab === 'mission' ? 'text-white border-b-2 border-violet-500' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                        Our Mission
                    </button>
                    <button
                        onClick={() => setActiveTab('values')}
                        className={`px-8 py-4 text-lg font-medium transition ${activeTab === 'values' ? 'text-white border-b-2 border-violet-500' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                        Values
                    </button>
                </div>
            </div>

            <div className=" mx-auto px-6 py-16">
                {/* Content based on active tab */}
                {activeTab === 'story' && (
                    <div className="space-y-12">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-semibold mb-6">Our Journey</h2>
                                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                                    Founded in 2023, NextFabric started with a simple dream — to bring high-quality,
                                    trendy, and affordable fabrics and clothing to fashion lovers across Bangladesh.
                                </p>
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    From a small startup to a growing e-commerce brand, we are committed to quality,
                                    customer satisfaction, and sustainable fashion.
                                </p>
                            </div>
                            <div className="bg-zinc-900 rounded-3xl aspect-video flex items-center justify-center border border-zinc-800">
                                <span className="text-6xl">🧵</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'mission' && (
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-semibold mb-8">Our Mission</h2>
                        <p className="text-2xl text-zinc-300 leading-relaxed">
                            To deliver premium quality fabrics and ready-made garments that blend tradition with modern style,
                            while making fashion accessible and sustainable for everyone.
                        </p>
                    </div>
                )}

                {activeTab === 'values' && (
                    <div className="values-tab">
                        <h2 className="text-4xl font-semibold text-center mb-12">Our Core Values</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { emoji: "🌟", title: "Quality First", desc: "Every product is carefully selected and quality-checked." },
                                { emoji: "🤝", title: "Customer Focus", desc: "Your satisfaction is our top priority." },
                                { emoji: "♻️", title: "Sustainability", desc: "We care about the environment and ethical sourcing." },
                            ].map((value, i) => (
                                <div key={i} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-violet-500 transition">
                                    <div className="text-5xl mb-6">{value.emoji}</div>
                                    <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                                    <p className="text-zinc-400">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Stats Section */}
            <div className="bg-zinc-900 py-16 border-y border-zinc-800">
                <div className=" mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                    <div>
                        <p className="text-5xl font-bold text-violet-400">5000+</p>
                        <p className="text-zinc-400 mt-2">Happy Customers</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold text-violet-400">150+</p>
                        <p className="text-zinc-400 mt-2">Premium Products</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold text-violet-400">24/7</p>
                        <p className="text-zinc-400 mt-2">Customer Support</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold text-violet-400">100%</p>
                        <p className="text-zinc-400 mt-2">Satisfaction Guarantee</p>
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* NEW ADDITION: RECHARTS / DATA INSIGHTS SECTION      */}
            {/* ---------------------------------------------------- */}
            <section className="mx-auto max-w-7xl px-6 pt-20">
                <div className="grid md:grid-cols-2 gap-12 items-center bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/5 px-3 py-1 text-xs text-violet-400 font-medium">
                            📊 Live Data Analytics
                        </div>
                        <h2 className="text-3xl font-bold text-white">Our Sustainability Blueprint</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            NextFabric works strictly with verified carbon-neutral production houses. We track our yearly lifecycle analysis components—including carbon offset metrics, organic yield ratios, and raw water replenishment cycles—to ensure every yard sold respects global eco-standards.
                        </p>
                    </div>

                    {/* UI Mockup Placeholder representing Recharts Component Integration */}
                    <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4">
                        <div className="flex justify-between items-center text-xs text-zinc-400">
                            <span>Textile Carbon Offset Trend (Metric Tons Co2e)</span>
                            <span className="text-violet-400 font-semibold">2023 - 2026 Target</span>
                        </div>
                        {/* Custom visual mockup representing dynamic chart bar indicators */}
                        <div className="h-48 flex items-end gap-4 pt-4 px-2">
                            <div className="w-full bg-zinc-800 h-[35%] rounded-t-lg relative group">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500">2023</span>
                            </div>
                            <div className="w-full bg-zinc-700 h-[55%] rounded-t-lg relative">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500">2024</span>
                            </div>
                            <div className="w-full bg-violet-600/60 h-[75%] rounded-t-lg relative">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400">2025</span>
                            </div>
                            <div className="w-full bg-gradient-to-t from-violet-600 to-fuchsia-500 h-[95%] rounded-t-lg relative">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white font-medium">2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------- */}
            {/* NEW ADDITION: AI CHAT ASSISTANT SECTION             */}
            {/* ---------------------------------------------------- */}
            <section className="mx-auto max-w-4xl px-6 pt-20">
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-[500px]">
                    {/* Chat Header */}
                    <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <div>
                                <h3 className="text-sm font-semibold text-white">NextFabric Swatch Companion</h3>
                                <p className="text-[11px] text-zinc-400">Contextual Agentic AI Assistant</p>
                            </div>
                        </div>
                        <span className="text-xs bg-zinc-800 px-2.5 py-1 rounded-lg text-zinc-400 font-mono">LLM-v2</span>
                    </div>

                    {/* Chat Messages Panel */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.isBot
                                    ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/50 rounded-tl-none'
                                    : 'bg-violet-600 text-white rounded-tr-none shadow-md shadow-violet-600/10'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-800 border border-zinc-700/50 text-zinc-400 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs flex items-center gap-1">
                                    <span className="animate-pulse">NextFabric AI is analyzing fabric logs</span>
                                    <span className="inline-flex gap-0.5 animate-bounce">
                                        <span>.</span><span>.</span><span>.</span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pre-suggested Prompts */}
                    <div className="px-6 py-2 flex flex-wrap gap-2 bg-zinc-900/20 border-t border-zinc-800/40">
                        {["Tell me about Luxury Silks", "What makes Heritage Linen sustainable?"].map((promptText, idx) => (
                            <button
                                key={idx}
                                onClick={() => setInputMsg(promptText)}
                                className="text-[11px] border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            >
                                💡 {promptText}
                            </button>
                        ))}
                    </div>

                    {/* Chat Input Interface */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-3">
                        <input
                            type="text"
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                            placeholder="Ask about thread counts, sustainability metrics, styling..."
                            className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </section>

            {/* Final CTA */}
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-4xl font-semibold mb-6">Ready to shop with us?</h2>
                <p className="text-zinc-400 text-lg mb-10">Explore our latest collection and experience the NextFabric difference.</p>
                <a
                    href="/shop"
                    className="inline-block bg-violet-600 hover:bg-violet-700 px-10 py-4 rounded-2xl font-semibold text-lg transition"
                >
                    Shop Now
                </a>
            </div>
        </div>
    );
}