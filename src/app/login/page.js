
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn, signUp } from '@/app/lib/auth-client';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Handle standard login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all credentials.');
      return;
    }
    setError('');
    setLoading(true);
    setSuccess('');
    try {
      const { data, error: authError } = await signIn.email({
        email,
        password,
      });

      if (authError) {
        toast.error(authError.message || 'Failed to sign in. Please verify credentials.');
        setError(authError.message || 'Failed to sign in.');
      } else {
        toast.success('Logged in successfully!');
        setSuccess('Logged in successfully!');
        if (data && data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        setTimeout(() => {
          window.location.replace('/shop');
        }, 1000);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      toast.error('An unexpected error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  // Handle the custom Demo Login API call to the Express backend
  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/demo-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Authenticated as Demo User! Establishing session...');
        const emailVal = data.credentials.email;
        const passwordVal = data.credentials.password;

        try {
          const { data: authData, error: authError } = await signIn.email({
            email: emailVal,
            password: passwordVal,
          });

          if (authError) {
            // Auto-register the demo user if they don't exist
            const { data: signUpData, error: signUpError } = await signUp.email({
              email: emailVal,
              password: passwordVal,
              name: data.user.name,
            });

            if (signUpError) {
              setError(signUpError.message || 'Failed to auto-register demo user.');
              setLoading(false);
              return;
            }
          }

          localStorage.setItem('user', JSON.stringify(data.user));
          toast.success('Demo session active! Redirecting...');
          setSuccess('Demo session active! Redirecting...');
          setTimeout(() => {
            window.location.replace('/shop');
          }, 1000);
        } catch (authErr) {
          console.error('Demo auth client error:', authErr);
          setError('Failed to establish Better Auth session.');
        }
      } else {
        setError(data.error || 'Failed to authenticate with backend demo user.');
      }
    } catch (err) {
      console.log('Demo login server offline, running fallback direct redirection.', err);

      // Local storage fallbacks
      localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email: 'demo@example.com' }));

      toast.success('Demo Login Successful! Redirecting...');
      setSuccess('Demo Login Successful! Redirecting...');

      // window.location.replace ব্যবহার করলে রাউটার হিস্ট্রি ক্লিন হয়ে সরাসরি পেজ লোড নেয়
      setTimeout(() => {
        window.location.replace('/shop');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50">
      <div className="glow-border relative w-full max-w-md rounded-2xl bg-zinc-900/40 p-8 space-y-6 overflow-hidden">

        {/* Radial highlight accent */}
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-brand-indigo/10 blur-3xl pointer-events-none" />

        {/* Brand/Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            Next<span className="text-brand-indigo">Fabric</span>
          </Link>
          <h2 className="text-lg font-semibold text-zinc-300">Sign in to your account</h2>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 p-3.5 text-brand-cyan text-xs font-medium text-center">
            {success}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl mt-10  bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-indigo/10 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-x-0 h-px bg-white/5" />
          <span className="relative bg-zinc-900 px-3 text-xs text-zinc-500 uppercase tracking-wider">or</span>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-xs text-zinc-500 pt-2">
          New to NextFabric?{' '}
          <Link href="/register" className="font-semibold text-brand-cyan hover:underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}