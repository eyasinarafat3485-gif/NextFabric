
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { signIn } from '@/app/lib/auth-client';
// import { toast } from 'react-toastify';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');

//   // Handle standard login submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.error('Please fill in all credentials.');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     setSuccess('');
//     try {
//       const { data, error: authError } = await signIn.email({
//         email,
//         password,
//       });

//       if (authError) {
//         toast.error(authError.message || 'Failed to sign in. Please verify credentials.');
//         setError(authError.message || 'Failed to sign in.');
//       } else {
//         toast.success('Logged in successfully!');
//         setSuccess('Logged in successfully!');
//         if (data && data.user) {
//           localStorage.setItem('user', JSON.stringify(data.user));
//         }
//         setTimeout(() => {
//           window.location.replace('/shop');
//         }, 1000);
//       }
//     } catch (err) {
//       console.error('Sign in error:', err);
//       toast.error('An unexpected error occurred during sign in.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Demo Login button e click korle input field fill hobe
//   const handleDemoLogin = () => {
//     setError('');
//     setSuccess('');

//     // Input field e state manually set kore deya hochhe
//     setEmail('user@gmail.com');
//     setPassword('user1234@');

//     toast.info('Demo credentials auto-filled! Click Sign In to proceed.');
//   };

//   return (
//     <div className="flex min-h-[80vh] items-center justify-center px-6 py-12 lg:px-8 bg-zinc-950 text-zinc-50">
//       <div className="glow-border relative w-full max-w-md rounded-2xl bg-zinc-900/40 p-8 space-y-6 overflow-hidden">

//         {/* Radial highlight accent */}
//         <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-brand-indigo/10 blur-3xl pointer-events-none" />

//         {/* Brand/Header */}
//         <div className="text-center space-y-2">
//           <Link href="/" className="text-2xl font-bold tracking-tight text-white">
//             Next<span className="text-brand-indigo">Fabric</span>
//           </Link>
//           <h2 className="text-lg font-semibold text-zinc-300">Sign in to your account</h2>
//         </div>

//         {/* Feedback Messages */}
//         {error && (
//           <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 text-red-400 text-xs font-medium text-center">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 p-3.5 text-brand-cyan text-xs font-medium text-center">
//             {success}
//           </div>
//         )}

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-indigo/60 transition-colors"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-xl mt-6 bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-indigo/10 transition-all cursor-pointer flex items-center justify-center gap-2"
//           >
//             {loading ? 'Verifying...' : 'Sign In'}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="relative flex items-center justify-center my-2">
//           <div className="absolute inset-x-0 h-px bg-white/5" />
//           <span className="relative bg-zinc-900 px-3 text-xs text-zinc-500 uppercase tracking-wider">or</span>
//         </div>

//         {/* Demo Login Button */}
//         <button
//           type="button"
//           disabled={loading}
//           onClick={handleDemoLogin}
//           className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 py-3 text-sm font-semibold text-zinc-300 transition-all cursor-pointer flex items-center justify-center gap-2"
//         >
//           Access Demo Space
//         </button>

//         {/* Bottom Link */}
//         <p className="text-center text-xs text-zinc-500 pt-2">
//           New to NextFabric?{' '}
//           <Link href="/register" className="font-semibold text-brand-cyan hover:underline">
//             Create an account
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from '@/app/lib/auth-client';
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

  // Google Social Login Handler
  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/shop', // লগইন সফল হলে যেখানে রিডাইরেক্ট হবে
      });
    } catch (err) {
      console.error('Google Sign in error:', err);
      toast.error('An error occurred during Google Sign In.');
    } finally {
      setLoading(false);
    }
  };

  // Demo Login button e click korle input field fill hobe
  const handleDemoLogin = () => {
    setError('');
    setSuccess('');

    // Input field e state manually set kore deya hochhe
    setEmail('user@gmail.com');
    setPassword('user1234@');

    toast.info('Demo credentials auto-filled! Click Sign In to proceed.');
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
            className="w-full rounded-xl mt-6 bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-indigo/10 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute inset-x-0 h-px bg-white/5" />
          <span className="relative bg-zinc-900 px-3 text-xs text-zinc-500 uppercase tracking-wider">or</span>
        </div>

        {/* Google Required Social Login */}
        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-200 transition-all cursor-pointer group disabled:opacity-50"
        >
          <svg className="h-5 w-5 transition-transform group-hover:scale-105" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Demo Login Button */}
        <button
          type="button"
          disabled={loading}
          onClick={handleDemoLogin}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 py-3 text-sm font-semibold text-zinc-300 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          Access Demo Space
        </button>

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