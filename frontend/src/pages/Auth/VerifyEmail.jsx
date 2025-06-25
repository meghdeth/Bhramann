import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { saveAuth } from '../../auth';
import { verifyOtp, resendOtp } from '../../api';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetloading, setResetLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendMsg, setResendMsg] = useState('');

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!userId) throw new Error('Missing user ID for verification.');
      const { data } = await verifyOtp({ userId, otp });
      saveAuth({ token: data.token, user: data.user });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResetLoading(true);
    setError('');
    setResendMsg('');
    try {
      if (!userId) throw new Error('Missing user ID for resend.');
      const { data } = await resendOtp(userId);
      setResendMsg(data.message || 'OTP resent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to resend OTP');
    } finally {
      setResetLoading(false);
    }
  };
  

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the OTP sent to your email"
      alternateLink="/login"
      alternateLinkText="Already have an account? Sign in"
      overlayTitle="Verify Your Email"
      overlayText="We sent a 6-digit code to your email. Enter it below to activate your account."
    >
      {(!userId) && <p className="text-red-500 text-[1.4rem] mb-4">Missing user ID. Please sign up again.</p>}
      <form onSubmit={handleOtpSubmit} className="w-full">
        {error && <p className="text-red-500 text-[1.4rem] mb-4">{error}</p>}
        {resendMsg && <p className="text-green-600 text-[1.4rem] mb-4">{resendMsg}</p>}
        <div className="!my-5">
          <label className="block text-[1.4rem] font-medium text-gray-700 !mb-2">
            OTP Code
          </label>
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full !p-4 text-[1.6rem] bg-white rounded-xl border-2 border-gray-100 focus:border-gray-300"
            placeholder="Enter 6-digit code"
            required
            disabled={!userId}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !userId}
          className={`w-full bg-[#0297CF] !text-white text-[1.6rem] py-4 rounded-xl transform transition duration-300 ${loading || !userId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0297CF]/90'}`}
        >
          {loading ? 'Verifying…' : 'Verify'}
        </button>
      </form>
      <button
        type="button"
        onClick={handleResendOtp}
        disabled={resetloading || !userId}
        className="w-full mt-4 bg-gray-200 text-gray-700 text-[1.4rem] py-3 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {resetloading ? 'Resending' : 'Resend OTP'}
      </button>

    </AuthLayout>
  );
}