'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;    

export default function MyCollection() {
    const [savedItems, setSavedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            setLoading(false);
            return;
        }

        const loggedInUser = JSON.parse(storedUser);
        setUserEmail(loggedInUser.email);

        async function fetchUserCollection() {
            try {
                const res = await fetch(`${SERVER_URL}/api/user-collection?email=${loggedInUser.email}`);
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
        <div className="min-h-screen bg-zinc-900 px-6 py-12 lg:px-8 text-zinc-50">
            <div className="mx-auto max-w-7xl">

                {/* Header section */}
                <div className=" pb-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">My Fabric Collection</h1>
                        <p className="text-zinc-400 text-sm mt-2">
                            Private workspace vault for: <span className="text-brand-cyan font-mono">{userEmail || 'Guest'}</span>
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
                ) : !userEmail ? (
                    // ইউজার লগইন না থাকলে ওয়ার্নিং
                    <div className="text-center py-20 border border-white/5 rounded-2xl bg-zinc-950/20">
                        <p className="text-red-400 text-base">⚠️ Please login to view your personalized fabric stash.</p>
                        <Link href="/login" className="mt-4 inline-block text-sm font-bold text-brand-indigo hover:underline">
                            Go to Login Page
                        </Link>
                    </div>
                ) : savedItems.length === 0 ? (

                    <div className="text-center py-20 border border-white/5 rounded-2xl bg-zinc-950/20">
                        <p className="text-zinc-400 text-base">No fabrics found in your private collection.</p>
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
                                className="group rounded-2xl bg-zinc-950 border border-white/5 overflow-hidden flex flex-col justify-between p-4 relative"
                            >

                                <div className="h-48 w-full overflow-hidden rounded-xl bg-zinc-900 relative">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                    />

                                    <div className="absolute top-3 right-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-sm ${item.status === 'Confirmed'
                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                            }`}>
                                            {item.status || 'Pending'}
                                        </span>
                                    </div>
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