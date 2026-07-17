'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FALLBACK_PRODUCTS } from '../shop/page';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('cotton');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Client-side Validation state
  const [validationError, setValidationError] = useState('');

  // Fetch items from the Express backend
  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/items');
      if (res.ok) {
        const data = await res.json();
        // Fallback if empty array is returned, otherwise display the DB items
        if (data && data.length > 0) {
          setProducts(data.map(item => ({
            ...item,
            id: item._id || item.id,
            specs: item.specs || {
              composition: 'Custom Loom Weave',
              weight: '190 GSM',
              width: '58 inches',
              origin: 'Imported',
            }
          })));
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } else {
        setProducts(FALLBACK_PRODUCTS);
      }
    } catch (err) {
      console.log('Unable to reach Express server, operating in simulated offline dashboard mode.', err);
      setProducts(FALLBACK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Form submit handler to create new item (POST request)
  const handleAddItem = async (e) => {
    e.preventDefault();
    setValidationError('');
    setError('');
    setSuccess('');

    // Client-side validation checks
    if (!title.trim() || title.length < 3) {
      setValidationError('Title must be at least 3 characters long.');
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setValidationError('Price must be a positive number.');
      return;
    }
    if (!shortDesc.trim() || shortDesc.length < 10) {
      setValidationError('Short description must be at least 10 characters.');
      return;
    }
    if (!fullDesc.trim() || fullDesc.length < 20) {
      setValidationError('Full description must be at least 20 characters.');
      return;
    }
    if (!imageUrl.trim() || (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://'))) {
      setValidationError('Please enter a valid Image URL (must start with http:// or https://).');
      return;
    }

    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    const newItemPayload = {
      title,
      category,
      shortDescription: shortDesc,
      fullDescription: fullDesc,
      price: parseFloat(price),
      imageUrl,
      tags
    };

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemPayload),
      });

      if (res.ok) {
        setSuccess('New fabric added successfully to remote server database!');
        // Reset form fields
        setTitle('');
        setShortDesc('');
        setFullDesc('');
        setPrice('');
        setImageUrl('');
        setTagsInput('');
        fetchItems(); // Reload live list
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to register the fabric item on the server.');
      }
    } catch (err) {
      console.log('Server unreachable. Simulating product insert locally (offline mode).', err);
      // Simulating local creation in fallback array
      const localId = `custom-${Date.now()}`;
      const localNewItem = {
        id: localId,
        ...newItemPayload,
        specs: {
          composition: 'Tailor Blend Custom Weave',
          weight: '200 GSM',
          width: '58 inches',
          origin: 'Handmade Sourced',
        }
      };
      setProducts([localNewItem, ...products]);
      setSuccess('Simulated Add: Fabric added locally in offline mode!');
      
      // Reset form
      setTitle('');
      setShortDesc('');
      setFullDesc('');
      setPrice('');
      setImageUrl('');
      setTagsInput('');
    }
  };

  // Delete item handler (DELETE request)
  const handleDeleteItem = async (itemId) => {
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`http://localhost:5000/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccess('Fabric removed from database successfully!');
        fetchItems(); // Reload database items
      } else {
        const errData = await res.json();
        setError(errData.error || 'Delete request rejected by backend.');
      }
    } catch (err) {
      console.log('Server unreachable. Removing item locally (offline mode).', err);
      setProducts(products.filter(p => p.id !== itemId));
      setSuccess('Simulated Delete: Fabric removed locally in offline mode!');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50">
      
      {/* Dashboard Header */}
      <div className="border-b border-white/5 pb-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Fabric Inventory Management</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-xl">
            Admin console to monitor stock levels, add new textile weaves, or delete outdated rolls.
          </p>
        </div>
        <Link
          href="/shop"
          className="rounded-xl border border-white/10 hover:border-brand-cyan/40 px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors self-start md:self-auto"
        >
          View Storefront &rarr;
        </Link>
      </div>

      {/* Global Alerts */}
      {validationError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-400 text-sm font-medium mb-8 text-center animate-fade-in">
          ⚠️ {validationError}
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-400 text-sm font-medium mb-8 text-center animate-fade-in">
          ❌ {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 p-4 text-brand-cyan text-sm font-medium mb-8 text-center animate-fade-in">
          ✓ {success}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Add New Form */}
        <div className="lg:col-span-1">
          <div className="glow-border rounded-2xl bg-zinc-900/40 p-6 space-y-6">
            <h2 className="text-xl font-bold text-white">Add New Fabric Roll</h2>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Fabric Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Raw Irish Flax Linen"
                  className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-indigo/60 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-brand-indigo/60 cursor-pointer"
                  >
                    <option value="cotton">Cotton</option>
                    <option value="linen">Linen</option>
                    <option value="silk">Silk</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Price / Yard</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 24.50"
                    className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-indigo/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Brief one-line display description..."
                  className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-indigo/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Full Description</label>
                <textarea
                  rows="3"
                  required
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  placeholder="Detailed specifications, weave structure, and tailoring recommendations..."
                  className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-indigo/60 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-indigo/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Loomed, Certified, Breathable"
                  className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-indigo/60 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 py-3 text-sm font-semibold text-white shadow-lg cursor-pointer transition-opacity"
              >
                Register New Fabric
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Inventory List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Active Inventory ({products.length})</h2>
            <button
              onClick={fetchItems}
              className="text-xs text-brand-cyan hover:text-brand-cyan/85 font-medium cursor-pointer"
            >
              🔄 Refresh List
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-zinc-500">Querying active rolls...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="glow-border relative rounded-2xl bg-zinc-900/40 border border-white/5 p-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 uppercase">
                          {item.category}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1 line-clamp-1">{item.title}</h3>
                      </div>
                      <span className="text-sm font-bold text-brand-cyan">${item.price.toFixed(2)}/yd</span>
                    </div>
                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between gap-4">
                    <span className="text-[10px] text-zinc-500 font-mono">ID: {String(item.id).substring(0, 10)}...</span>
                    
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="rounded-lg bg-red-950/20 border border-red-500/20 hover:bg-red-500 hover:text-white px-3 py-1.5 text-xs font-semibold text-red-400 transition-all cursor-pointer"
                    >
                      Delete Roll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
