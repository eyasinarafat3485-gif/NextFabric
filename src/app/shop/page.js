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
  },
  {
    id: 'silk-1',
    title: 'Mulberry Silk Charmeuse',
    category: 'silk',
    price: 34.50,
    imageUrl: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Liquid-like drape and glossy satin finish. Exquisite hand-feel for luxury lining and slips.',
    fullDescription: 'Our finest grade-A Mulberry silk charmeuse. Features a high-gloss, liquid satin front and a matte crepe back. Breathable, hypoallergenic, and fluid, it flows smoothly over the body, making it ideal for elegant slip dresses, blouses, and premium linings.',
    tags: ['Premium', 'Mulberry', 'Satin'],
    specs: {
      composition: '100% Mulberry Silk',
      weight: '19 Momme',
      width: '54 inches',
      origin: 'Hangzhou, China',
    }
  },
  {
    id: 'cotton-2',
    title: 'Heavyweight Duck Canvas',
    category: 'cotton',
    price: 15.00,
    imageUrl: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Rugged and tightly woven utility canvas. Best for heavy workwear, bags, and outerwear.',
    fullDescription: 'A heavy-duty, tightly woven double-fill cotton canvas. Exceptionally wind-resistant and structured. Perfect for tailor-made overshirts, jackets, durable totes, and utilities. Unwashed and ready for raw fade patinas.',
    tags: ['Workwear', 'Heavyweight', 'Raw Canvas'],
    specs: {
      composition: '100% Double-Fill Cotton',
      weight: '340 GSM',
      width: '60 inches',
      origin: 'Okayama, Japan',
    }
  },
  {
    id: 'linen-2',
    title: 'Indigo Dyed Medium Linen',
    category: 'linen',
    price: 22.50,
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Rich vegetable dyed linen weave. Softens beautifully with wash and wear.',
    fullDescription: 'Medium-weight natural linen dyed in small batches with genuine natural indigo leaves. The rich blue hue has beautiful highs and lows that will gently age and fade unique to your wearing habits.',
    tags: ['Indigo Dyed', 'Vegetable Dye', 'Textured'],
    specs: {
      composition: '100% Indigo Linen',
      weight: '200 GSM',
      width: '56 inches',
      origin: 'Kyoto, Japan',
    }
  },
  {
    id: 'silk-2',
    title: 'Crêpe de Chine Silk',
    category: 'silk',
    price: 31.00,
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Muted luster and subtle crinkle texture. Easy to sew and flows gracefully.',
    fullDescription: 'A lightweight silk crêpe with a pebbled, subtly crinkled texture. Offers a graceful, fluid drape with a soft matte luster. Excellent for blouses, scarves, lightweight linings, and layered dresses.',
    tags: ['Lightweight', 'Matte Silk', 'Textured'],
    specs: {
      composition: '100% Silk',
      weight: '14 Momme',
      width: '54 inches',
      origin: 'Lyon, France',
    }
  },
  {
    id: 'acc-1',
    title: 'Genuine Buffalo Horn Buttons',
    category: 'accessories',
    price: 4.00,
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Naturally finished horn buttons with beautiful marbling. Pack of 6.',
    fullDescription: 'Genuine, ethically sourced water buffalo horn buttons. Features a polished edge with distinct marbling patterns of cream, dark brown, and black. Each button is unique. Standard size for coats and heavy suit jackets.',
    tags: ['Horn', 'Bespoke Buttons', 'Coat Trims'],
    specs: {
      composition: '100% Water Buffalo Horn',
      weight: 'N/A',
      width: '20 mm diameter',
      origin: 'Rajasthan, India',
    }
  },
  {
    id: 'acc-2',
    title: 'Polished Brass Zipper 8-inch',
    category: 'accessories',
    price: 6.50,
    imageUrl: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Heavy-duty brass metal teeth on organic cotton tape. Smooth slide.',
    fullDescription: 'Premium metal closed-end zippers with individually polished brass teeth on sturdy, unbleached organic cotton tape. Extremely robust slide action, perfect for raw denim jeans, canvas jackets, and pocket closures.',
    tags: ['Brass Zipper', 'Metal teeth', 'Heavy Duty'],
    specs: {
      composition: 'Brass teeth / Organic Cotton tape',
      weight: 'YKK Size 5',
      width: '8 inches length',
      origin: 'Osaka, Japan',
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
          // If live items exist in the database, merge/use them
          if (data && data.length > 0) {
            // Map mongoose _id to id
            const mappedData = data.map(item => ({
              ...item,
              id: item._id || item.id,
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

  // Filter and Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory =
        category === 'all' || product.category.toLowerCase() === category.toLowerCase();
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'name-az') return a.title.localeCompare(b.title);
      // Default: Newest/Unsorted order
      return 0;
    });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50">
      
      {/* Page Header */}
      <div className="border-b border-white/5 pb-8 mb-8 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Fabric Catalog</h1>
        <p className="text-zinc-400 text-sm max-w-2xl">
          Browse our collection of hand-inspected, premium fabrics. Filter by fiber type, search by weave keyword, or sort by pricing metrics.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'cotton', 'linen', 'silk', 'accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-xl px-4 py-2 text-sm font-medium border capitalize transition-all cursor-pointer ${
                category === cat
                  ? 'bg-brand-indigo border-brand-indigo text-white'
                  : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat === 'all' ? 'All Materials' : cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Panel */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search weaves, e.g. twill..."
            className="rounded-xl bg-zinc-900 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors w-full sm:w-64"
          />

          {/* Sort Selection */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl bg-zinc-900 border border-white/10 px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-brand-indigo/60 cursor-pointer w-full sm:w-48"
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
          <button
            onClick={() => { setSearch(''); setCategory('all'); }}
            className="mt-4 text-sm font-semibold text-brand-cyan hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glow-border group relative rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden flex flex-col justify-between"
            >
              {/* Product Visual Area */}
              <div className="aspect-w-4 aspect-h-3 bg-zinc-950 overflow-hidden relative h-56">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="object-cover h-full w-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    // Fallback to gradient if image fails loading
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback gradient banner */}
                <div className="hidden absolute inset-0 bg-gradient-to-br from-brand-indigo/20 to-brand-cyan/25 flex-col items-center justify-center text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                  Texture Preview
                </div>

                <div className="absolute top-3 left-3">
                  <span className="rounded-md bg-zinc-950/80 border border-white/10 px-2 py-0.5 text-xs font-medium text-zinc-300 backdrop-blur-sm capitalize">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Content Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">
                    ${product.price.toFixed(2)}
                    <span className="text-xs text-zinc-500 font-normal"> / yard</span>
                  </div>
                  <Link
                    href={`/shop/${product.id}`}
                    className="rounded-xl border border-white/10 bg-zinc-900 group-hover:bg-brand-indigo group-hover:border-brand-indigo px-4 py-2 text-xs font-medium text-zinc-200 group-hover:text-white transition-all cursor-pointer"
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
