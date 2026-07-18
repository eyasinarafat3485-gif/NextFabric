'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyCollection() {
    const [savedItems, setSavedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // (৩) Fetch custom user collections from backend DB
    useEffect(() => {
        async function fetchUserCollection() {
            try {
                const res = await fetch('http://localhost:5000/api/user-collection');
                if (res.ok) {
                    const data = await res.json();
                    setSavedItems(data);
                }
            } catch (err) {
                console.error('Error fetching personalized collections:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchUserCollection();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-12 lg:px-8 text-zinc-50">
            <div className="mx-auto max-w-7xl">

                {/* Header section */}
                <div className="border-b border-white/5 pb-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">My Fabric Collection</h1>
                        <p className="text-zinc-400 text-sm mt-2">
                            Your dynamically acquired catalog rolls and private hardware stash synced to the DB vault.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="rounded-xl border border-white/10 hover:border-brand-indigo/40 px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors self-start sm:self-auto"
                    >
                        &larr; Back to Shop Catalog
                    </Link>
                </div>

                {/* Dynamic Display area */}
                {loading ? (
                    <div className="text-center py-20 text-zinc-500">Retrieving your personal database vault...</div>
                ) : savedItems.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 rounded-2xl bg-zinc-950/20">
                        <p className="text-zinc-400 text-base">You haven't bought or added any fabric styles yet.</p>
                        <Link
                            href="/shop"
                            className="mt-4 inline-block text-sm font-bold text-brand-cyan hover:underline"
                        >
                            Explore shop trends now
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {savedItems.map((item) => (
                            <div
                                key={item._id || item.id}
                                className="group rounded-2xl bg-zinc-950 border border-white/5 overflow-hidden flex flex-col justify-between p-4"
                            >
                                <div className="h-48 w-full overflow-hidden rounded-xl bg-zinc-900">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                <div className="mt-4 flex-grow space-y-2">
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                                        {item.shortDescription}
                                    </p>
                                </div>

                                <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between">
                                    <div className="text-sm font-bold text-brand-cyan">
                                        ${item.price.toFixed(2)}
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-600">
                                        Acquired: {new Date(item.purchasedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}