'use client';

import { useState } from 'react';
import logo from '@/public/kan-logo-2-removebg-preview.png';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RequestCode() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const r = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    setError('');
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('https://kanassetmanagement.com/api/request-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setMessage('A verification code has been sent to your email.');
      r.push('/reset-password');
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
          <div className="w-[150px] rounded-full flex items-center justify-center">
            <Image src={logo} alt="logo" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-sm text-blue-700">
          Enter your email address to receive a verification code.
        </p>
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
                  required
                  className="bg-blue-50 block w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
            {message && <div className="text-green-500 text-sm">{message}</div>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? 'Sending code...' : 'Send verification code'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => r.push('/sign-in')}
              className="text-blue-500 hover:text-blue-600 font-medium text-sm"
            >
              Back to sign-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
