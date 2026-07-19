

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

// পরিবেশ ভেরিয়েবল থেকে ব্যাকএন্ড URL নেওয়া হচ্ছে
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// বিল্ড এরর ফিক্স করার জন্য লোকাল ফলব্যাক ডিফাইন করা হলো
const FALLBACK_PRODUCTS = [];

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationError, setValidationError] = useState('');

  // Toast UI এর জন্য স্টেট
  const [showToast, setShowToast] = useState(false);

  // Form State (ডিফল্ট ক্যাটাগরি 'shirt' সেট করা হলো যা ড্রপডাউনের প্রথম অপশন)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('shirt');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/items`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setProducts(data.map(item => ({
            ...item,
            id: item._id || item.id,
            specs: item.specs || { composition: 'Custom Loom Weave', weight: '190 GSM', width: '58 inches', origin: 'Imported' }
          })));
        } else { setProducts(FALLBACK_PRODUCTS); }
      } else { setProducts(FALLBACK_PRODUCTS); }
    } catch (err) {
      setProducts(FALLBACK_PRODUCTS);
    } finally { setLoading(false); }
  };

  // সব ইউজারের অর্ডার নিয়ে আসার ফাংশন
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/admin/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.log("Error fetching orders:", err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchOrders();
  }, []);

  // অর্ডার কনফার্ম হ্যান্ডলার
  const handleConfirmOrder = async (orderId) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/admin/orders/${orderId}/confirm`, {
        method: 'PATCH',
      });
      if (res.ok) {
        toast.success('Order successfully Confirmed!');
        fetchOrders();
      }
    } catch (err) {
      setError('Failed to confirm order.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/admin/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Order deleted successfully!');
        fetchOrders();
      }
    } catch (err) {
      setError('Failed to delete order.');
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setValidationError('');
    setError('');
    setSuccess('');

    // Client-side validations
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

    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!imageUrl.trim() || !urlRegex.test(imageUrl.trim())) {
      setValidationError('Please enter a valid Image URL starting with http:// or https://');
      return;
    }

    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const newItemPayload = { title, category, shortDescription: shortDesc, fullDescription: fullDesc, price: parseFloat(price), imageUrl, tags };

    try {
      const res = await fetch(`${SERVER_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItemPayload),
      });

      if (res.ok) {
        // সফল হলে Toast ট্রিগার করা হচ্ছে
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000); // ৪ সেকেন্ড পর টোস্টটি চলে যাবে

        setTitle(''); setShortDesc(''); setFullDesc(''); setPrice(''); setImageUrl(''); setTagsInput('');
        setCategory('shirt'); // ফর্ম রিসেট হওয়ার পর ডিফল্ট ক্যাটাগরি আবার সেট করা হলো
        fetchItems();
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to register the fabric item.');
      }
    } catch (err) {
      toast.error('Server unreachable. Could not add item.');
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/items/${itemId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Fabric removed successfully!');
        fetchItems();
      }
    } catch (err) {
      toast.error('Server error while deleting.');
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50 space-y-12">

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-zinc-900 px-5 py-4 shadow-2xl shadow-emerald-950/20 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold">
            ✓
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Product added successfully</p>
            <p className="text-xs text-zinc-400 mt-0.5">Inventory cache updated live.</p>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bold mb-4">Fabric Inventory & Orders</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-xl">
            Admin console to manage product stocks and client fabric orders.
          </p>
        </div>
        <Link href="/shop" className="rounded-xl bg-zinc-900 border border-white/10 hover:border-brand-cyan px-5 py-2.5 text-sm font-semibold text-brand-cyan transition-all">
          &larr; View Storefront
        </Link>
      </div>

      {/* Global Alerts */}
      {validationError && <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-400 text-sm font-medium mb-4 text-center">⚠️ {validationError}</div>}
      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-400 text-sm font-medium mb-4 text-center">❌ {error}</div>}
      {success && <div className="rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 p-4 text-brand-cyan text-sm font-medium mb-4 text-center">✓ {success}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Form */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 space-y-6">
            <h2 className="text-xl font-bold text-white">Add New Fabric Roll</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Fabric Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Raw Irish Flax Linen" className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-indigo/60" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Category</label>
                  {/* আপডেট করা ড্রপডাউন অপশনসমূহ */}
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-zinc-300 focus:outline-none cursor-pointer">
                    <option value="shirt">Shirt</option>
                    <option value="pant">Pant</option>
                    <option value="panjabi">Panjabi</option>
                    <option value="t-shirt">T-shirt</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Price / Yard</label>
                  <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="24.50" className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Short Description</label>
                <input type="text" required value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="Brief one-line display description..." className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Full Description</label>
                <textarea rows="3" required value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} placeholder="Detailed specs..." className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Image URL</label>
                <input type="text" required value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Tags (comma-separated)</label>
                <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="e.g. Loomed, Certified" className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none" />
              </div>
              <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan py-3 text-sm font-semibold text-white cursor-pointer">Register New Fabric</button>
            </form>
          </div>
        </div>

        {/* Right Active Inventory */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Active Inventory ({products.length})</h2>
            <button onClick={fetchItems} className="text-[11px] text-brand-cyan font-medium cursor-pointer hover:underline">
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-6 text-xs text-zinc-500">Querying active rolls...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-zinc-900/40 border border-white/5 p-2.5 flex items-center justify-between gap-3 hover:border-white/10 transition-colors"
                >
                  {/* Product Left Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="shrink-0 rounded bg-white/5 border border-white/10 px-1 py-0.2 text-[9px] uppercase font-medium text-zinc-400">
                        {item.category}
                      </span>
                      <h3 className="text-xs font-bold text-white truncate">{item.title}</h3>
                    </div>
                    <p className="text-zinc-500 text-[11px] truncate">{item.shortDescription}</p>
                  </div>

                  {/* Product Right Actions */}
                  <div className="shrink-0 flex items-center gap-3 pl-2 border-l border-white/5">
                    <span className="text-xs font-bold text-brand-cyan">${item.price.toFixed(2)}/yd</span>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="rounded-md border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-2 py-1 text-[10px] font-medium transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- সম্পূর্ণ নতুন ৩য় সেকশন: ইউজারদের করা অর্ডারের লিস্ট --- */}
      {/* <div className="border-t border-white/5 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">All User Fabric Orders ({orders.length})</h2>
          <button onClick={fetchOrders} className="text-xs text-brand-cyan font-medium cursor-pointer">🔄 Refresh Orders</button>
        </div>

        {ordersLoading ? (
          <div className="text-center py-10 text-zinc-500">Loading purchase histories from database vault...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 border border-white/5 rounded-2xl bg-zinc-900/20 text-zinc-400">
            No active orders have been made by users yet.
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/5 rounded-2xl bg-zinc-900/20">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">User Email</th>
                  <th className="px-6 py-4">Fabric Title</th>
                  <th className="px-6 py-4">Total Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order._id || order.id} className="hover:bg-zinc-900/40">
                    <td className="px-6 py-4 font-mono text-xs text-zinc-400">{order.userEmail}</td>
                    <td className="px-6 py-4 font-medium text-white">{order.title}</td>
                    <td className="px-6 py-4 text-brand-cyan font-semibold">${order.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${order.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {order.status !== 'Confirmed' && (
                        <button onClick={() => handleConfirmOrder(order._id || order.id)} className="rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors">
                          Confirm
                        </button>
                      )}
                      <button onClick={() => handleDeleteOrder(order._id || order.id)} className="rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}



      <div className="border-t border-white/5 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">All User Fabric Orders ({orders.length})</h2>
          <button onClick={fetchOrders} className="text-xs text-brand-cyan font-medium cursor-pointer">🔄 Refresh Orders</button>
        </div>

        {ordersLoading ? (
          <div className="text-center py-10 text-zinc-500">Loading purchase histories from database vault...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 border border-white/5 rounded-2xl bg-zinc-900/20 text-zinc-400">
            No active orders have been made by users yet.
          </div>
        ) : (
          <div>
            {/* 📱 MOBILE VIEW: মোবাইলে স্ক্রোলিং এড়াতে কার্ড লেআউট */}
            <div className="block md:hidden space-y-4">
              {orders.map((order) => {
                const orderId = order._id || order.id;
                // প্রোডাক্টের সঠিক আইডি ট্র‍্যাক করার জন্য ফলব্যাক কন্ডিশন
                const fabricProductId = order.productId || order.fabricId || (order.product && (order.product._id || order.product.id)) || orderId;

                return (
                  <div key={orderId} className="border border-white/5 rounded-2xl bg-zinc-900/20 p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white text-base">{order.title}</h3>
                        <p className="font-mono text-xs text-zinc-400 mt-1">{order.userEmail}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${order.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-brand-cyan font-semibold text-base">${order.price.toFixed(2)}</span>

                      {/* অ্যাকশন বাটনসমূহ */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/shop/${order.fabricId}`} // 👈 মোবাইল ভিউতে অরিজিনাল ফিক্সড রাউট
                          className="rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold transition-colors"
                        >
                          View
                        </Link>
                        {order.status !== 'Confirmed' && (
                          <button onClick={() => handleConfirmOrder(orderId)} className="rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors">
                            Confirm
                          </button>
                        )}
                        <button onClick={() => handleDeleteOrder(orderId)} className="rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 💻 DESKTOP & TABLET VIEW: বড় স্ক্রিনের জন্য আগের পারফেক্ট টেবিল */}
            <div className="hidden md:block overflow-x-auto border border-white/5 rounded-2xl bg-zinc-900/20">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">User Email</th>
                    <th className="px-6 py-4">Fabric Title</th>
                    <th className="px-6 py-4">Total Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => {
                    const orderId = order._id || order.id;
                    // প্রোডাক্টের সঠিক আইডি ট্র‍্যাক করার জন্য ফলব্যাক কন্ডিশন
                    const fabricProductId = order.productId || order.fabricId || (order.product && (order.product._id || order.product.id)) || orderId;

                    return (
                      <tr key={orderId} className="hover:bg-zinc-900/40">
                        <td className="px-6 py-4 font-mono text-xs text-zinc-400">{order.userEmail}</td>
                        <td className="px-6 py-4 font-medium text-white">{order.title}</td>
                        <td className="px-6 py-4 text-brand-cyan font-semibold">${order.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${order.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Link
                            href={`/shop/${order.fabricId}`} // 👈 ডেস্কটপ ভিউতে অরিজিনাল ফিক্সড রাউট
                            className="rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold transition-colors inline-block"
                          >
                            View
                          </Link>
                          {order.status !== 'Confirmed' && (
                            <button onClick={() => handleConfirmOrder(orderId)} className="rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors">
                              Confirm
                            </button>
                          )}
                          <button onClick={() => handleDeleteOrder(orderId)} className="rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}