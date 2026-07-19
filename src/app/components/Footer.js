'use client';
import Link from 'next/link';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block text-xl font-bold tracking-tight text-white">
              Next<span className="text-brand-indigo">Fabric</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-xs">
              Premium fabrics and modern style for the modern creator. Elevate your wardrobe with curated textiles.
            </p>
            <div className="flex gap-4">

              {/* Facebook */}
              <a href="https://web.facebook.com/eyasinarafatwebdev12" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-indigo transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/md-eyasin-arafat-webdev" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-indigo transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com/eyasinarafat3485-gif" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-indigo transition-colors" aria-label="GitHub">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1: Shop */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-400 hover:text-brand-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-zinc-400 hover:text-brand-cyan transition-colors">
                  All Fabrics
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-zinc-400 hover:text-brand-cyan transition-colors">
                  Premium Collection
                </Link>
              </li>

            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-zinc-400 hover:text-brand-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-400 hover:text-brand-cyan transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-zinc-400 hover:text-brand-cyan transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Contact & Support</h3>
            <p className="text-sm text-zinc-400 flex flex-col space-y-1">
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-violet-400 shrink-0" />
                <span>support@nextfabric.com</span>
              </span>
              <span className="flex items-center gap-2">
                <FaPhoneAlt className="text-violet-400 shrink-0" />
                <span>+880 1712-345678</span>
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-violet-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </span>
            </p>
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Subscribe to our list</h4>
              <form onSubmit={(e) => e.preventDefault()} className="mt-2 flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {currentYear} NextFabric Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
