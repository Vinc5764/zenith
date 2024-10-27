'use client';

import { useState } from 'react';
import logo from '@/public/kan-logo-2-removebg-preview.png';
import { Key, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SetNewPassword() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('https://kanassetmanagement.com/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setMessage('Your password has been reset successfully.');
      router.push('/sign-in');
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
          Set New Password
        </h2>
        <p className="mt-2 text-center text-sm text-blue-700">
          Enter the code sent to your email along with your new password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-blue-700">
                Verification Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                className="bg-blue-50 block w-full px-3 py-2 border border-blue-300 rounded-md text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-blue-700">
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="bg-blue-50 block w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="bg-blue-50 block w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Setting Password...' : 'Set New Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
