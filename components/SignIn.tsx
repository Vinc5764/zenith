'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import useTokenStore from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  // State variables to store email, password, and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken } = useTokenStore();
  const { token } = useTokenStore();

  const r = useRouter();

  // useEffect(() => {
  //   if (!token) {
  //     r.push("/sign-in");
  //   } else {
  //     r.push("/dashboard");
  //   }
  // }, [token, r]);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email and password fields
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    setError(''); // Reset error message
    setLoading(true); // Set loading to true during request

    // Send the form data to the backend
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      setToken(data?.token, data?.user?.role, data?.user?.name, data);

      if (data.token) {
        r.push("/dashboard/");
      }
      
      if (!res.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      // Handle successful sign-in (e.g., redirect or store token)
      console.log('Sign-in successful:', data);
      // You might want to redirect the user to a dashboard or another page here
      // For example: router.push('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading state after the request is done
    }
  };

  return (
    <div className="min-h-screen bg-[#001f3f] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-[#c9a55a] rounded-full flex items-center justify-center">
            <span className="text-[#001f3f] text-2xl font-bold">Z</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link href="/sign-up" className="font-medium text-[#c9a55a] hover:text-[#d9b56a]">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#002a4f] py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-[#001f3f] text-white block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 focus:outline-none focus:ring-[#c9a55a] focus:border-[#c9a55a] sm:text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-[#001f3f] text-white block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 focus:outline-none focus:ring-[#c9a55a] focus:border-[#c9a55a] sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#c9a55a] focus:ring-[#c9a55a] border-gray-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#c9a55a] hover:text-[#d9b56a]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#001f3f] bg-[#c9a55a] hover:bg-[#d9b56a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9a55a]"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#002a4f] text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-[#001f3f] text-sm font-medium text-gray-300 hover:bg-[#002a4f]"
                >
                  <span className="sr-only">Sign in with Google</span>
                  {/* Google Icon */}
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-[#001f3f] text-sm font-medium text-gray-300 hover:bg-[#002a4f]"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  {/* GitHub Icon */}
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.173c-3.338.727-4.033-1.653-4.033-1.653-.547-1.39-1.333-1.753-1.333-1.753-1.093-.747.087-.733.087-.733 1.207.087 1.84 1.233 1.84 1.233 1.087 1.86 2.827 1.32 3.52 1.007.107-.787.427-1.32.773-1.627-2.667-.307-5.467-1.347-5.467-5.987 0-1.327.467-2.4 1.227-3.253-.12-.307-.533-1.547.12-3.227 0 0 1.013-.333 3.32 1.24.96-.267 1.973-.4 2.987-.4s2.027.133 2.987.4c2.307-1.573 3.32-1.24 3.32-1.24.653 1.68.24 2.92.12 3.227.76.853 1.227 1.933 1.227 3.253 0 4.653-2.8 5.667-5.467 5.973.453.387.827 1.153.827 2.373v3.493c0 .32.187.693.793.573C20.563 21.8 24 17.307 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
