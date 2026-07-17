'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/shop" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Shop
            </Link>
            <Link href="/sustainability" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Sustainability
            </Link>
            <Link href="/about" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
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
            <button
              onClick={() => console.log('Demo Login Triggered')}
              className="rounded-lg bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 px-4 py-2 text-sm font-medium text-white transition-all shadow-md shadow-brand-indigo/10 cursor-pointer"
            >
              Demo Login
            </button>
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
            href="/shop" 
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-white"
          >
            Shop
          </Link>
          <Link 
            href="/sustainability" 
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-white"
          >
            Sustainability
          </Link>
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
            <button
              onClick={() => {
                setIsOpen(false);
                console.log('Demo Login Triggered');
              }}
              className="w-full rounded-lg bg-gradient-to-r from-brand-indigo to-brand-cyan px-4 py-2 text-base font-medium text-white text-center shadow-md cursor-pointer"
            >
              Demo Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
