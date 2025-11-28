'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/authService';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(credentials);
      router.push('/tasks');
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30">
        <h2 className="text-center text-3xl font-bold text-gray-900 drop-shadow-sm">
          Welcome Back 👋
        </h2>
        <p className="mt-2 text-center text-sm text-gray-700">
          Sign in to <span className="font-semibold">Task Manager</span>
        </p>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-800 mb-1 font-medium">Username</label>
            <input
              type="text"
              required
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm bg-white/70"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-1 font-medium">Password</label>
            <input
              type="password"
              required
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm bg-white/70"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          *Use any username and password for demo
        </p>
      </div>
    </div>
  );
}
