// src/components/Signup.js
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from './AuthLayout';
import api from '../../api';             // ← your axios instance
import { saveAuth } from '../../auth'; // ← helper to persist the JWT
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    agreeToTerms: true,
    role: ''
  });
  const accountTypes = [
    {
      id: 'user',
      name: 'User',
    },
    {
      id: 'seller',
      name: 'Seller',
    }
  ];

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/api/auth/signup', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: selectedRole
      });
      saveAuth({ token: data.token, user: data.user });
      // TODO: redirect to dashboard or home
      alert("Signup successfully")
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to start planning your next adventure"
      alternateLink="/login"
      alternateLinkText="Already have an account? Sign in"
      overlayTitle="Join Our Exclusive Community"
      overlayText="Unlock premium travel experiences, personalized itineraries, and exclusive deals available only to our members."
    >
      <form onSubmit={handleSubmit} className="w-full">
        {error && (
          <p className="text-red-500 text-[1.4rem] mb-4">{error}</p>
        )}

        <div className="bg-white rounded-2xl">
          <div className="flex justify-center gap-4">
            {accountTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedRole(type.id)}
                className={`
                    relative px-6 py-3 w-full rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${selectedRole === type.id
                    ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                  `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    rounded-lg transition-colors
                      ${selectedRole === type.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                    }
                    `}>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{type.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Name Input */}
        <div className="!mt-5">
          <label className="block text-[1.4rem] font-medium text-gray-700 !mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full !p-4 text-[1.6rem] bg-white rounded-xl border-2 border-gray-100 focus:border-gray-300"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="!mt-5">
          <label className="block text-[1.4rem] font-medium text-gray-700 !mb-2">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                if (value.length <= 10) {
                  setFormData({ ...formData, phone: value });
                }
              }}
              className="w-full pl-16 !p-4 text-[1.6rem] bg-white rounded-xl border-2 border-gray-100 focus:border-gray-300"
              placeholder="XXXXXXXXXX"
              maxLength={10}
              required
            />
          </div>
        </div>

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
        </div>

        {/* Terms and Conditions */}
        <div className="!mt-4 !mb-5 flex items-center">
          <input
            id="terms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) =>
              setFormData({ ...formData, agreeToTerms: e.target.checked })
            }
            className="!w-6 !h-6 rounded border-gray-300 text-[#0297CF] focus:ring-[#0297CF]"
          />
          <label
            htmlFor="terms"
            className="ml-3 text-[1.4rem] text-gray-700"
          >
            I agree to the{' '}
            <a href="/terms" className="!text-blue-500 !underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" className="!text-blue-500 !underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#0297CF] !text-white text-[1.6rem] py-4 rounded-xl transform transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0297CF]/90'
            }`}
        >
          {loading ? 'Creating…' : 'Create Account'}
        </button>

        {/* Social Divider */}
        <div className="flex items-center !my-8">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <span className="!px-4 text-[1.4rem] text-gray-500">
            or sign up with
          </span>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

        {/* Social Buttons (no change) */}
        <div className="grid w-full">
          <button
            type="button"
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl border-2 border-gray-100 hover:bg-gray-200 transition-colors duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="size-5"
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
