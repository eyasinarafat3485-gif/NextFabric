'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// পরিবেশ ভেরিয়েবল থেকে ব্যাকএন্ড URL নেওয়া হচ্ছে
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  // পেজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // প্রতি পেজে ৮টি আইটেম দেখাবে

  // Attempt to fetch from Express backend on mount
  useEffect(() => {
    async function fetchLiveItems() {
      try {
        const res = await fetch(`${SERVER_URL}/api/items`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mappedData = data.map(item => ({
              ...item,
              id: item._id || item.id,
              category: item.category ? item.category.toLowerCase() : 'others',
              specs: item.specs || {
                composition: 'Custom Weave Blend',
                weight: 'Varying GSM',
                width: '58 inches',
                origin: 'Sourced Mill',
              }
            }));
            setProducts(mappedData);
          } else {
            setProducts([]);
          }
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.log('Express backend not reachable.', err);
        setProducts([]);
      } finally {
        loading && setLoading(false);
      }
    }
    fetchLiveItems();
  }, []);

  // সার্চ বা ফিল্টার চেঞ্জ হলে পেজ ১ নম্বরে রিসেট করার জন্য
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

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
      if (sort === 'newest') {
        return b.id.toString().localeCompare(a.id.toString());
      }
      return 0;
    });

  // পেজিনেশন লজিক 계산 (Calculation)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // বর্তমান পেজের জন্য নির্ধারিত ৮টি আইটেম স্লাইস করা হলো
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // সর্বমোট কতটি পেজ হবে তার হিসাব
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50">

      {/* Page Header */}
      <div className="pb-8 mb-8 flex items-center justify-between">
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

      {/* সার্চ বার এবং রাইট সাইড ফিল্টার/সর্টিং প্যানেল */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-zinc-900/40 p-6 rounded-2xl border border-white/5">

        {/* লেফট সাইড: সার্চ ইনপুট */}
        <div className="w-full md:w-auto flex-grow max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fabrics, shirtings, or panjabis..."
            className="w-full rounded-xl bg-zinc-950 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-indigo/60 placeholder-zinc-500"
          />
        </div>

        {/* রাইট সাইড: মেটেরিয়াল ফিল্টার এবং প্রাইস সর্টিং ড্রপডাউন */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl bg-zinc-950 border border-white/10 px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-brand-indigo/60 w-full sm:w-44 cursor-pointer"
          >
            <option value="all">All Products</option>
            <option value="shirt">Shirt</option>
            <option value="pant">Pant</option>
            <option value="panjabi">Panjabi</option>
            <option value="t-shirt">T-shirt</option>
            <option value="others">Others</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl bg-zinc-950 border border-white/10 px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-brand-indigo/60 w-full sm:w-44 cursor-pointer"
          >
            <option value="newest">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A to Z</option>
          </select>

        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 text-zinc-500">Loading catalog...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-white/5 rounded-2xl bg-zinc-900/20">
          <p className="text-zinc-400 text-lg">No fabrics match your selected criteria.</p>
        </div>
      ) : (
        <>
          {/* এখানে products.map এর বদলে শুধুমাত্র currentItems ডাটায় লুপ হবে */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentItems.map((product) => (
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

          {/* পেজিনেশন কন্ট্রোল প্যানেল */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/15 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-900 transition-all cursor-pointer"
              >
                Previous
              </button>

              {/* পেজ নম্বর বাটনগুলো জেনারেট করা হচ্ছে */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all cursor-pointer ${currentPage === pageNumber
                      ? 'bg-gradient-to-r from-brand-indigo to-brand-cyan text-white'
                      : 'bg-zinc-900 border border-white/15 text-zinc-400 hover:bg-zinc-800'
                    }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/15 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-900 transition-all cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}