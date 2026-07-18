'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Pre-seeded high-fidelity products fallback list
export const FALLBACK_PRODUCTS = [
  {
    id: 'cotton-1',
    title: 'Organic Supima Cotton Twill',
    category: 'cotton',
    price: 18.50,
    imageUrl: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Luxuriously soft yet structured organic cotton twill. Ideal for shirts and light jackets.',
    fullDescription: 'Crafted from rare long-staple Supima cotton fibers. This twill features a diagonal weave that provides excellent shape retention and a soft hand-feel. Fully certified organic and dyed with low-impact botanical pigments.',
    tags: ['Organic', 'Supima', 'Twill'],
    specs: {
      composition: '100% Supima Cotton',
      weight: '210 GSM',
      width: '58 inches',
      origin: 'California, USA',
    }
  },
  {
    id: 'linen-1',
    title: 'Belgian Heritage Loom Linen',
    category: 'linen',
    price: 26.00,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Loomed from raw flax in Northern Europe. Exhibits beautiful natural slubbing.',
    fullDescription: 'Traditionally loomed from organic flax plants grown in Flanders. This linen has a substantial, tactile weight with natural variations in thread thickness (slubs) that offer unmatched organic texture. Cool to the skin, relaxing and softening with every wash cycle.',
    tags: ['Sustainable', 'Belgian', 'Raw Flax'],
    specs: {
      composition: '100% Belgian Flax',
      weight: '185 GSM',
      width: '56 inches',
      origin: 'Flanders, Belgium',
    }
  }
];

export default function Shop() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  // Attempt to fetch from Express backend on mount
  useEffect(() => {
    async function fetchLiveItems() {
      try {
        const res = await fetch('http://localhost:5000/api/items');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mappedData = data.map(item => ({
              ...item,
              id: item._id || item.id,
              category: item.category || 'cotton',
              specs: item.specs || {
                composition: 'Custom Weave Blend',
                weight: 'Varying GSM',
                width: '58 inches',
                origin: 'Sourced Mill',
              }
            }));
            setProducts([...FALLBACK_PRODUCTS, ...mappedData]);
          }
        }
      } catch (err) {
        console.log('Express backend not reachable, using offline catalog.', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveItems();
  }, []);

  // (১) Function to handle purchasing and adding to database collection
  const handleAddToCollection = async (product) => {
    try {
      const res = await fetch('http://localhost:5000/api/user-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: product.id,
          title: product.title,
          shortDescription: product.shortDescription,
          price: product.price,
          imageUrl: product.imageUrl,
        }),
      });

      if (res.ok) {
        alert(`Successfully added "${product.title}" to My Collection!`);
      } else {
        alert('Failed to add item to your collection database.');
      }
    } catch (err) {
      console.error('Error connecting to endpoint', err);
      alert('Backend offline. Could not save to cloud collection.');
    }
  };

  // Filter and Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'all' || (product.category && product.category.toLowerCase() === category.toLowerCase());

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'name-az') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50">

      {/* Page Header */}
      <div className="border-b border-white/5 pb-8 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold mb-4">Fabric Catalog</h1>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Browse our collection of hand-inspected, premium fabrics. Filter by fiber type or sort by pricing metrics.
          </p>
        </div>
        <Link
          href="/collection"
          className="rounded-xl bg-zinc-900 border border-white/10 hover:border-brand-cyan px-5 py-2.5 text-sm font-semibold text-brand-cyan transition-all"
        >
          🛍️ My Collection
        </Link>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'cotton', 'linen', 'silk', 'accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-xl px-4 py-2 text-sm font-medium border capitalize transition-all cursor-pointer ${category === cat
                ? 'bg-brand-indigo border-brand-indigo text-white'
                : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white'
                }`}
            >
              {cat === 'all' ? 'All Materials' : cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Panel */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search weaves..."
            className="rounded-xl bg-zinc-900 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-indigo/60 w-full sm:w-64"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl bg-zinc-900 border border-white/10 px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-brand-indigo/60 w-full sm:w-48"
          >
            <option value="newest">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-white/5 rounded-2xl bg-zinc-900/20">
          <p className="text-zinc-400 text-lg">No fabrics match your selected criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glow-border group relative rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-w-4 aspect-h-3 bg-zinc-950 overflow-hidden relative h-56">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="object-cover h-full w-full opacity-80 group-hover:opacity-100 transition-all duration-300"
                />
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white line-clamp-1">{product.title}</h2>
                  <p className="text-zinc-400 text-xs line-clamp-2">{product.shortDescription}</p>
                </div>

                <div className="mt-4 text-sm font-semibold text-white">
                  ${product.price.toFixed(2)}<span className="text-xs text-zinc-500 font-normal"> / yard</span>
                </div>
                {/* Buy action trigger */}
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href={`/shop/${product.id}`}

                    className="w-full rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan py-2 text-xs font-semibold text-white text-center transition-all cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}