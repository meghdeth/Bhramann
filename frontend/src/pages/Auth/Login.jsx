import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from './AuthLayout';
import api from '../../api';            // ← axios instance
import { saveAuth } from '../../auth'; // ← helper to persist the JWT
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      saveAuth({ token: data.token, user: data.user });
      // TODO: redirect to dashboard or home
      alert('Login successful');
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
      alternateLink="/signup"
      alternateLinkText="Don't have an account? Sign up"
      overlayTitle="Luxury Travel Awaits"
      overlayText="Experience the world's most exclusive destinations with personalized service and unparalleled comfort."
    >
      <form onSubmit={handleSubmit} className="w-full">
        {error && (
          <p className="text-red-500 text-[1.4rem] mb-4">{error}</p>
        )}

        {/* Email Input */}
        <div className="!mt-5">
          <label className="block text-[1.4rem] font-medium text-gray-700 !mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full !p-4 text-[1.6rem] bg-white rounded-xl border-2 border-gray-100 focus:border-gray-300"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="!mt-2 !mb-5">
          <label className="block text-[1.4rem] font-medium text-gray-700 !mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full !p-4 text-[1.6rem] bg-white rounded-xl border-2 border-gray-100 focus:border-gray-300"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="size-8" />
              ) : (
                <Eye className="size-8" />
              )}
            </button>
          </div>
          <div className="flex justify-end !mt-5 !mb-5">
            <button type="button" className="text-[1.4rem] !text-blue-500 hover:!underline">
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#0297CF] !text-white text-[1.6rem] py-4 rounded-xl transform transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0297CF]/90'
          }`}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        {/* Social Divider */}
        <div className="flex items-center !my-8">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <span className="!px-4 text-[1.4rem] text-gray-500">
            or continue with
          </span>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

        {/* Social Buttons */}
        <div className="grid w-full">
          <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl border-2 border-gray-100 hover:bg-gray-200 transition-colors duration-300">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-[1.4rem] font-medium text-gray-700">
              Google
            </span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
