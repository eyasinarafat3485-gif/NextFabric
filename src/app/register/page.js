'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/app/lib/auth-client';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all registration fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);
    setSuccess('');

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        role: 'user',
      });

      if (authError) {
        setError(authError.message || 'Failed to create account. Please try again.');
      } else {
        setSuccess('Account created successfully! Redirecting to sign in...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50">

      <div className="glow-border relative w-full max-w-md rounded-2xl bg-zinc-900/40 p-8 space-y-6 overflow-hidden">
        {/* Radial highlight accent */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />

        {/* Brand/Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            Next<span className="text-brand-indigo">Fabric</span>
          </Link>
          <h2 className="text-lg font-semibold text-zinc-300">Create a designer account</h2>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-brand-indigo/20 bg-brand-indigo/5 p-3.5 text-brand-indigo text-xs font-medium text-center">
            {success}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-indigo/10 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-center text-xs text-zinc-500 pt-2">
          Already have a designer account?{' '}
          <Link href="/login" className="font-semibold text-brand-cyan hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
