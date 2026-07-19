'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// বিল্ড এরর ফিক্স করার জন্য লোকাল ফলব্যাক ডিফাইন করা হলো
const FALLBACK_PRODUCTS = [];

export default function ProductDetails({ params }) {
  // Unwrap parameters using React.use() as standard in modern Next.js
  const { id } = React.use(params);

  const [product, setProduct] = useState(null);
  const [yards, setYards] = useState(2); // Default to 2 yards
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    // 1. First search in local fallback catalog
    const localProduct = FALLBACK_PRODUCTS.find(p => p.id === id);

    if (localProduct) {
      setProduct(localProduct);
      setLoading(false);
    }

    // 2. Also try fetching live product from Express database
    async function fetchLiveProduct() {
      try {
        const res = await fetch(`${SERVER_URL}/api/items`);
        if (res.ok) {
          const data = await res.json();
          const liveProduct = data.find(p => (p._id === id || p.id === id));
          if (liveProduct) {
            setProduct({
              ...liveProduct,
              id: liveProduct._id || liveProduct.id,
              category: liveProduct.category || 'cotton',
              specs: liveProduct.specs || {
                composition: 'Custom Weave Blend',
                weight: 'Varying GSM',
                width: '58 inches',
                origin: 'Sourced Mill',
              }
            });
          }
        }
      } catch (err) {
        console.log('Unable to reach live Express server for dynamic product ID:', id);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-32 text-center text-zinc-400 bg-zinc-950">
        <p className="text-lg">Analyzing textile database...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-32 text-center bg-zinc-950">
        <h2 className="text-2xl font-bold text-white mb-4">Fabric Spec Not Found</h2>
        <p className="text-zinc-400 mb-8">The requested textile code could not be verified in our catalog.</p>
        <Link
          href="/shop"
          className="rounded-xl bg-brand-indigo hover:bg-brand-indigo/90 px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const totalPrice = product.price * yards;

  const handleBuyProduct = async () => {
    // LocalStorage থেকে কারেন্ট লগইন করা ইউজার অবজেক্ট নেওয়া হচ্ছে
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      toast.error('Please log in first to purchase fabrics.');
      return;
    }

    const loggedInUser = JSON.parse(storedUser);
    const userEmail = loggedInUser.email; // ডাইনামিক ইউজারের ইমেইল

    setBuying(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/user-collection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail, // ব্যাকএন্ডে ইউজারের ইমেইল পাঠানো হচ্ছে
          itemId: product.id,
          title: product.title,
          shortDescription: product.shortDescription,
          price: totalPrice,
          imageUrl: product.imageUrl,
        }),
      });

      if (res.ok) {
        toast.success(`Purchase successful done!`);
        setTimeout(() => {
          window.location.replace('/collection');
        }, 1200);
      } else {
        toast.error('Failed to register this roll under your account.');
      }
    } catch (err) {
      console.error('Error connecting to endpoint', err);
      toast.error('Server offline. Dynamic buy simulation failed.');
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50">

      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          &larr; Back to Fabric Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

        {/* Left Column: Image preview */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 h-[400px] sm:h-[500px]">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Right Column: Specifications & Pricing */}
        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-6">

            {/* Tags and Title */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-semibold text-zinc-300 backdrop-blur-sm capitalize">
                  {product.category}
                </span>
                {product.tags && product.tags.map((tag, idx) => (
                  <span key={idx} className="rounded-md bg-brand-indigo/10 border border-brand-indigo/20 px-2.5 py-0.5 text-xs font-medium text-brand-cyan">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {product.title}
              </h1>
            </div>

            {/* Price Box */}
            <div className="border-b border-white/5 pb-6">
              <p className="text-2xl font-bold text-white">
                ${product.price.toFixed(2)}
                <span className="text-sm text-zinc-500 font-normal"> / yard</span>
              </p>
            </div>

            {/* Fabric Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Product Overview</h3>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                {product.fullDescription}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Technical Specs</h3>
              <div className="grid grid-cols-2 gap-4 border border-white/5 rounded-2xl p-6 bg-zinc-900/20">
                <div>
                  <div className="text-xs text-zinc-500">Composition</div>
                  <div className="text-sm text-zinc-200 font-medium">{product.specs?.composition}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">GSM Weight</div>
                  <div className="text-sm text-zinc-200 font-medium">{product.specs?.weight}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Roll Width</div>
                  <div className="text-sm text-zinc-200 font-medium">{product.specs?.width}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Mill Origin</div>
                  <div className="text-sm text-zinc-200 font-medium">{product.specs?.origin}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Sizing & Actions */}
          <div className="space-y-6 pt-6 border-t border-white/5">

            {/* Yardage Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-zinc-200">
                  Select Quantity (Yards)
                </label>
                <p className="text-xs text-zinc-500 mt-1">Minimum order is 1 yard.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setYards(Math.max(1, yards - 1))}
                  className="rounded-lg bg-zinc-900 border border-white/10 w-10 h-10 flex items-center justify-center font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={yards}
                  onChange={(e) => setYards(Math.max(1, parseInt(e.target.value) || 1))}
                  className="rounded-lg bg-zinc-900 border border-white/10 w-16 h-10 text-center font-semibold text-white focus:outline-none focus:border-brand-indigo/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setYards(yards + 1)}
                  className="rounded-lg bg-zinc-900 border border-white/10 w-10 h-10 flex items-center justify-center font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price Display */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-sm font-semibold text-zinc-400">Total Price Estimate</span>
              <span className="text-xl font-bold text-brand-cyan">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Single Action Button */}
            <button
              onClick={handleBuyProduct}
              disabled={buying}
              className="w-full rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all cursor-pointer text-center disabled:opacity-50"
            >
              {buying ? 'Processing Order...' : 'Buy & Add to Collection'}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}