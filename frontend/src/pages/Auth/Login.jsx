import React, { useState, useEffect } from 'react';
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
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    let timer;
    if (!canResend && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, canResend]);

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
      // Role-based redirect
      if (data.user.role === 'admin') {
        navigate('/superadmin-panel');
      } else if (data.user.role === 'seller') {
        navigate('/seller-dashboard');
      } else if (data.user.role === 'user') {
        navigate('/user-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg('');
    try {
      const { data } = await api.post('/api/auth/forgot-password', { email: forgotEmail });
      setForgotMsg(data.message || 'If the email you entered is registered, you will receive a password reset link shortly. Please check your inbox and spam folder.');
      setTimeLeft(30);
      setCanResend(false);
    } catch (err) {
      setForgotMsg(err.response?.data?.message || 'Failed to send reset email.');
    } finally {
      setForgotLoading(false);
    }
  };

  
  if (showForgot) {
    return (
      <AuthLayout
        title="Reset Password"
        subtitle="Enter your email to receive a password reset link."
        overlayTitle="Reset Your Password"
        overlayText="Create a new password to regain access to your account."
      >
        <form onSubmit={handleForgotPassword} className="w-full">
          {error && (
            <p className="text-red-500 text-[1.4rem] mb-4">{error}</p>
          )}
          {forgotMsg && (
            <p className="mt-4 text-center text-[1.2rem] text-blue-600">{forgotMsg}</p>
          )}
          <div className="!my-5">
            <label className="block text-[1.4rem] font-medium text-gray-700 !mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              className="w-full !p-4 text-[1.6rem] bg-white rounded-xl border-2 border-gray-100 focus:border-gray-300"
              placeholder="Enter your email"
              required
              disabled={forgotLoading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !canResend}
            className={`w-full bg-[#0297CF] !text-white text-[1.6rem] py-4 rounded-xl transform transition duration-300 ${loading || !canResend ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0297CF]/90'}`}
          >
            {forgotLoading ? 'Sending…' : 'Send Reset Link'}
          </button>
          {!canResend && (
            <div className="mt-2 text-gray-500 text-center text-[1.2rem]">
              Resend link in {timeLeft}s
            </div>
          )}
          <p className="mt-4 text-gray-500 text-[1.3rem] text-center">
          </p>

          <button
            type="button"
            className="w-full mt-4 text-[#0297CF] underline"
            onClick={() => setShowForgot(false)}
          >
            Back to Login
          </button>

        </form>
      </AuthLayout>
    );
  }

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
            <button type="button" className="text-[1.4rem] !text-blue-500 hover:!underline" onClick={() => setShowForgot(true)}>
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#0297CF] !text-white text-[1.6rem] py-4 rounded-xl transform transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0297CF]/90'
            }`}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        {/* Social Divider */}
        <div className="flex items-center !my-6">
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
