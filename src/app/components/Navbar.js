'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut, signIn, signUp } from "@/app/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = useSession();

  console.log("Session:", session);
  console.log("Pending:", isPending);

  useEffect(() => {
    setMounted(true);
  }, []);

  // const handleDemoLogin = async () => {
  //   try {
  //     const res = await fetch('http://localhost:5000/api/demo-login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await res.json();
  //     if (res.ok && data.success) {
  //       const { email, password } = data.credentials;
  //       try {
  //         await signIn.email({
  //           email,
  //           password,
  //         });
  //         window.location.href = '/shop';
  //       } catch (err) {
  //         // If user doesn't exist, register and sign in
  //         await signUp.email({
  //           email,
  //           password,
  //           name: data.user.name,
  //         });
  //         window.location.href = '/shop';
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Demo login connection error:', err);
  //     // Fallback
  //     localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email: 'demo@example.com' }));
  //     window.location.href = '/shop';
  //   }
  // };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    window.location.href = '/';
  };

  // Determine dynamic roles on client mount
  const isAuthenticated = mounted && !!session;
  const isAdmin = mounted && session?.user?.role === 'admin';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              Next<span className="text-brand-indigo">Fabric</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Shop
            </Link>
            {isAuthenticated && (
              <Link href="/collection" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                My Collection
              </Link>
            )}
            {isAdmin && (
              <Link href="/dashboard" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
            <Link href="/about" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {(!mounted || isPending) ? (
              <span className="text-xs text-zinc-500">Checking session...</span>
            ) : session ? (
              <>
                <span className="text-sm text-zinc-400 font-medium">
                  Hi, {session.user.name || session.user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg bg-zinc-900 border border-white/10 hover:border-red-500/40 px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-zinc-900 border border-white/10 hover:border-brand-indigo/40 px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  Register
                </Link>
                {/* <button
                  onClick={handleDemoLogin}
                  className="rounded-lg bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 px-4 py-2 text-sm font-medium text-white transition-all shadow-md shadow-brand-indigo/10 cursor-pointer"
                >
                  Demo Login
                </button> */}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-white/5 bg-zinc-950 px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-white"
          >
            Shop
          </Link>
          {isAuthenticated && (
            <Link
              href="/collection"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-zinc-300 hover:text-white"
            >
              My Collection
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-zinc-300 hover:text-white"
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-white"
          >
            Contact
          </Link>
          <hr className="border-white/5 my-2" />
          <div className="flex flex-col gap-2 pt-2">
            {(!mounted || isPending) ? (
              <span className="text-center text-xs text-zinc-500">Checking session...</span>
            ) : session ? (
              <>
                <span className="text-center text-sm text-zinc-400 font-medium py-2">
                  Hi, {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-center rounded-lg bg-zinc-900 border border-white/10 px-4 py-2 text-base font-medium text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center block text-base font-medium text-zinc-300 hover:text-white py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center rounded-lg bg-zinc-900 border border-white/10 px-4 py-2 text-base font-medium text-white"
                >
                  Register
                </Link>
                {/* <button
                  onClick={() => {
                    setIsOpen(false);
                    handleDemoLogin();
                  }}
                  className="w-full rounded-lg bg-gradient-to-r from-brand-indigo to-brand-cyan px-4 py-2 text-base font-medium text-white text-center shadow-md cursor-pointer"
                >
                  Demo Login
                </button> */}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

