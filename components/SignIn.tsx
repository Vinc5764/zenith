'use client';

import { useState } from 'react';
import logo from '@/public/kan-logo-2-removebg-preview.png'
import { Mail, Lock } from 'lucide-react';
import useTokenStore from '@/lib/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken } = useTokenStore();

  const r = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://kanassetmanagement.com/api/login', {
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

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-blue-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="  w-[150px] rounded-full flex items-center justify-center">
            <Image src={logo} alt='logo'/>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">
          Sign in to your account
        </h2>
        {/* <p className="mt-2 text-center text-sm text-blue-700">
          Or{' '}
          <Link href="/sign-up" className="font-medium text-blue-500 hover:text-blue-600">
            create a new account
          </Link>
        </p> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-blue-50 block w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-blue-50 block w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-500 hover:text-blue-600">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-300" />
              </div>
             
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
            

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
