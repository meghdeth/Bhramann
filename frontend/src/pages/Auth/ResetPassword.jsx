import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import api from '../../api';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post(`/api/auth/reset-password/${token}`, { password });
      setSuccess(data.message || 'Password reset successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password below"
      alternateLink="/login"
      alternateLinkText="Back to login"
      overlayTitle="Reset Your Password"
      overlayText="Create a new password to regain access to your account."
    >
      <form onSubmit={handleSubmit} className="w-full">
        {error && <p className="text-red-500 text-[1.4rem] mb-4">{error}</p>}
        {success && <p className="text-green-600 text-[1.4rem] mb-4">{success}</p>}
        <div className="!mt-5">
          <label className="block text-[1.4rem] font-medium text-gray-700 !mb-2">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full !p-4 text-[1.6rem] bg-white rounded-xl border-2 border-gray-100 focus:border-gray-300"
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="!my-5">
          <label className="block text-[1.4rem] font-medium text-gray-700 !mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full !p-4 text-[1.6rem] bg-white rounded-xl border-2 border-gray-100 focus:border-gray-300"
            placeholder="Confirm new password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#0297CF] !text-white text-[1.6rem] py-4 rounded-xl transform transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0297CF]/90'}`}
        >
          {loading ? 'Resetting…' : 'Reset Password'}
        </button>
      </form>
    </AuthLayout>
  );
} 