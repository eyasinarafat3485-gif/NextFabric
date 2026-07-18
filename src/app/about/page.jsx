'use client';

import { useState } from 'react';

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState('story');

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
                    <div>
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