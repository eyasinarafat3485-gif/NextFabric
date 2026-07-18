'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  // Section 1: Hero Text Cycling Animation State
  const fabricWords = ['Organic Cottons', 'Pure Linens', 'Luxury Silks', 'Structured Woolens'];
  const [wordIdx, setWordIdx] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % fabricWords.length);
        setFadeState('fade-in');
      }, 500); // match transition speed
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  // Section 5: Statistics Counter Animation State
  const [stats, setStats] = useState({
    designers: 0,
    mills: 0,
    yards: 0,
    quality: 0,
  });

  useEffect(() => {
    const duration = 1500; // 1.5 seconds animation
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const targetDesigners = 12850;
    const targetMills = 38;
    const targetYards = 1400; // in thousands (1.4M)
    const targetQuality = 997; // 99.7%

    const interval = setInterval(() => {
      step++;
      setStats({
        designers: Math.min(Math.round((targetDesigners / steps) * step), targetDesigners),
        mills: Math.min(Math.round((targetMills / steps) * step), targetMills),
        yards: Math.min(Math.round((targetYards / steps) * step), targetYards),
        quality: Math.min(Math.round((targetQuality / steps) * step), targetQuality),
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // Section 7: Newsletter Submit State
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="relative overflow-hidden bg-zinc-950 text-zinc-50">

      {/* ---------------------------------------------------- */}
      {/* SECTION 1: HERO SECTION                              */}
      {/* ---------------------------------------------------- */}
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 text-center">
        {/* Background visual details */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-4xl space-y-8 z-10 pt-15">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur-md glow-border">
            <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
            <span>Discover Sustainable Weaves</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Weave Masterpieces With
            <div className="h-20 sm:h-24 md:h-28 mt-2 overflow-hidden">
              <span className={`block bg-gradient-to-r from-brand-indigo to-brand-cyan bg-clip-text text-transparent transition-opacity duration-500 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
                {fabricWords[wordIdx]}
              </span>
            </div>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-400">
            NextFabric provides premium-grade, ethically sourced fabrics to boutique designers and custom tailors globally. Experience materials that feel as good as they look.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-cyan px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-indigo/20 hover:opacity-90 transition-opacity cursor-pointer"
            >
              Browse Fabric Shop
            </Link>
            <Link
              href="/login"
              className="rounded-2xl border border-white/15 bg-zinc-900/40 hover:bg-zinc-900/80 px-8 py-4 text-sm font-semibold text-zinc-200 transition-colors cursor-pointer"
            >
              Login here
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: FEATURES SECTION                          */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 ">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Crafted for Unmatched Quality
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            We take pride in every yard we stock. Here is why independent designers and couture fashion houses trust NextFabric.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Hand-Inspected Quality",
              description: "Every fabric roll is unrolled and checked twice by our master tailors for thread counts, color dyes, and edge symmetry.",
              icon: (
                <svg className="h-6 w-6 text-brand-indigo" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              ),
            },
            {
              title: "Climate-Neutral Mills",
              description: "We source entirely from ethical textile mills that run on solar/hydro power and recycle 95% of processing wastewater.",
              icon: (
                <svg className="h-6 w-6 text-brand-indigo" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13.5m0-13.5L15 6m-3-3L9 6m6 10.5h-6M6 16.5H3m15 0h3m-3 0a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
            {
              title: "Same-Day Dispatch",
              description: "All standard cut orders placed before 2 PM PST are rolled, packaged in protective covers, and shipped the same evening.",
              icon: (
                <svg className="h-6 w-6 text-brand-indigo" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.61 3.26a14.98 14.98 0 00-6.16 12.12c0 2.91.82 5.64 2.25 7.95L10 18.25" />
                </svg>
              ),
            },
            {
              title: "Transparent Sourcing",
              description: "Scan QR codes on your fabric bolts to see the exact origin, cotton farm details, and yarn processing certifications.",
              icon: (
                <svg className="h-6 w-6 text-brand-indigo" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM16.5 13.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM13.5 13.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM16.5 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75z" />
                </svg>
              ),
            }
          ].map((item, idx) => (
            <div key={idx} className="glow-border relative rounded-2xl bg-zinc-900/40 p-6 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-indigo/10 border border-brand-indigo/20">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: CATEGORIES GRID                           */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 ">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Curated Collections by Use Case
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Tailor-made selections engineered for perfect drape, structural weight, and soft next-to-skin touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Women's Collection",
              description: "Fluid silks, fine crêpes, lightweight voiles, and soft modal knits. Best for flowing dresses, blouses, and soft drapes.",
              link: "/shop?gender=women",
              tag: "Drapes & Linings",
              accent: "from-pink-500/10 to-transparent",
              border: "hover:border-pink-500/30"
            },
            {
              title: "Men's Collection",
              description: "Structured woolens, heavy canvas, premium cotton twill, and classic linen. Engineered for tailoring, jackets, and trousers.",
              link: "/shop?gender=men",
              tag: "Structured & Suitings",
              accent: "from-brand-indigo/10 to-transparent",
              border: "hover:border-brand-indigo/30"
            },
            {
              title: "Accoutrements & Accessories",
              description: "Lining silks, horn buttons, premium zippers, thread sets, and vintage interfacing tapes to finish your pieces.",
              link: "/shop?category=accessories",
              tag: "Bespoke Trims",
              accent: "from-brand-cyan/10 to-transparent",
              border: "hover:border-brand-cyan/30"
            }
          ].map((cat, idx) => (
            <div
              key={idx}
              className={`glow-border group relative rounded-2xl bg-zinc-900/40 p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${cat.border}`}
            >
              {/* Decorative background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${cat.accent} opacity-40 -z-10`} />

              <div>
                <span className="inline-flex items-center rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-medium text-zinc-300 mb-6">
                  {cat.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">{cat.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">{cat.description}</p>
              </div>

              <Link
                href={cat.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan group-hover:text-brand-cyan/80 transition-colors"
              >
                Browse Catalog <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: VISUAL HIGHLIGHTS / DYNAMIC BANNER        */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-900/40 border border-white/5 px-6 py-20 shadow-2xl sm:px-12 sm:py-24 lg:px-20">
          {/* Neon radial mesh glow */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-gradient-to-br from-brand-indigo/25 to-brand-cyan/25 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-3xl space-y-6">
            <span className="text-xs font-semibold tracking-widest text-brand-cyan uppercase">
              Limited Swatch Series
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The Heritage Linen Collection
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
              Harvested from the organic flax fields of Belgium, and loomed on historical mechanical looms in Italy. This fabric possesses a unique slub and tactile density that synthetic operations cannot copy. Ideal for statement summer trousers, structured shirts, and fine linen suits.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
              >
                Shop Heritage Collection
              </Link>
             
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: STATISTICS / MILESTONES                   */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              label: "Designers Sourced",
              value: stats.designers.toLocaleString() + "+",
            },
            {
              label: "Partner Mills",
              value: stats.mills,
            },
            {
              label: "Yards Sourced",
              value: (stats.yards / 1000).toFixed(1) + "M+",
            },
            {
              label: "Quality Rating",
              value: (stats.quality / 10).toFixed(1) + "%",
            }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 glow-border bg-zinc-900/20 rounded-2xl">
              <dd className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </dt>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: TESTIMONIALS                              */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 ">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by the Design Community
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Hear from fashion designers, bespoke tailors, and clothing manufacturers who rely on our curated catalog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The slub and structural drape of the Pure Linen is perfect. We used it for our main summer menswear line and the texture stood out beautifully on the runways.",
              author: "Sarah K.",
              role: "Creative Director",
              company: "Aether Couture Studio",
              rating: 5,
            },
            {
              quote: "Customer feedback on the weight and durability of the organic twill cottons has been stellar. Swatch books are incredibly accurate to production batches.",
              author: "Marcus T.",
              role: "Lead Bespoke Tailor",
              company: "Savile Loom House",
              rating: 5,
            },
            {
              quote: "NextFabric is our go-to. Their certified eco-friendly sourcing aligns perfectly with our brand's sustainability goals without sacrificing luxury feel.",
              author: "Elena V.",
              role: "Head of Sourcing",
              company: "Origin Organic Apparel",
              rating: 5,
            }
          ].map((t, idx) => (
            <div key={idx} className="glow-border relative rounded-2xl bg-zinc-900/40 p-8 flex flex-col justify-between">
              <div>
                {/* Five Star rating */}
                <div className="flex gap-1 mb-6 text-brand-cyan">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-zinc-300 text-sm leading-relaxed italic mb-8">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className=" pt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-indigo/10 flex items-center justify-center border border-brand-indigo/20 font-bold text-sm text-brand-cyan">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-zinc-500">{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: NEWSLETTER                                */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 ">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5 px-6 py-16 text-center shadow-2xl sm:px-12 sm:py-20 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(6,182,212,0.06),transparent_50%)] pointer-events-none" />

          <div className="mx-auto max-w-2xl space-y-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the NextFabric Gazette
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
              Get weekly updates on incoming fabric imports, limited run vintage weavers, and exclusive digital swatch invites.
            </p>

            {subscribed ? (
              <div className="rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 p-4 text-brand-cyan text-sm font-medium animate-fade-in">
                ✓ Check your inbox! You have successfully subscribed to our newsletter list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-md gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your designer email"
                  className="w-full min-w-0 flex-auto rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-brand-indigo hover:bg-brand-indigo/90 px-6 py-3 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-xs text-zinc-500">
              We respect your privacy. Unsubscribe at any time. No third-party sharing.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
