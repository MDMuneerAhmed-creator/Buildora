import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { AuthenticationLayout } from '../layouts/AuthenticationLayout';
import { UnauthorizedDomainModal } from '../components/common/UnauthorizedDomainModal';
import { AuthErrorDetails } from '../utils/authErrors';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle, continueAsGuest } = useRoadmap();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [unauthorizedError, setUnauthorizedError] = useState<AuthErrorDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    const result = await signup(fullName, email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || 'Failed to create account.');
    } else {
      navigate('/');
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setUnauthorizedError(null);
    setIsGoogleSubmitting(true);
    const result = await loginWithGoogle();
    setIsGoogleSubmitting(false);

    if (!result.success) {
      if (result.errorDetails?.isUnauthorizedDomain) {
        setUnauthorizedError(result.errorDetails);
      } else {
        setError(result.message || 'Google sign up failed.');
      }
    } else {
      navigate('/');
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/');
  };

  return (
    <AuthenticationLayout
      title="Buildora AI"
      subtitle="AI Operating System for Entrepreneurs"
    >
      <div className="w-full space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-bold text-white">Create your account</h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-950/60 p-3 text-xs font-semibold text-rose-300 border border-rose-900/50">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={isGoogleSubmitting || isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#1F1F1F] border border-[#333333] hover:border-[#444444] text-white font-medium text-xs sm:text-sm transition-all duration-200 hover:bg-[#282828] active:scale-[0.99] cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.8-1.5-1.2-3.2-1.2-5z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          <span>{isGoogleSubmitting ? 'Signing up with Google...' : 'Continue with Google'}</span>
        </button>

        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-[rgba(255,255,255,0.08)] w-full"></div>
          <span className="bg-[#121212] px-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider shrink-0">
            or email
          </span>
          <div className="border-t border-[rgba(255,255,255,0.08)] w-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Full Name */}
          <div>
            <label className="block font-medium text-zinc-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full rounded-xl bg-black border border-[#2A2A2A] py-2.5 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block font-medium text-zinc-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-xl bg-black border border-[#2A2A2A] py-2.5 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-zinc-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-xl bg-black border border-[#2A2A2A] py-2.5 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium text-zinc-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full rounded-xl bg-black border border-[#2A2A2A] py-2.5 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-[#F3F4F6] active:scale-[0.99] mt-2 cursor-pointer"
          >
            <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
          </button>
        </form>

        {/* Links */}
        <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] text-center space-y-2.5">
          <p className="text-xs text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white hover:underline">
              Log In
            </Link>
          </p>

          <button
            type="button"
            onClick={handleGuest}
            className="w-full flex items-center justify-center gap-1.5 pt-0.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200 group cursor-pointer"
          >
            <span>Continue as Guest</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Unauthorized Domain Modal */}
      {unauthorizedError && (
        <UnauthorizedDomainModal
          isOpen={!!unauthorizedError}
          onClose={() => setUnauthorizedError(null)}
          errorDetails={unauthorizedError}
          onContinueAsGuest={handleGuest}
          onSwitchToEmail={() => setUnauthorizedError(null)}
        />
      )}
    </AuthenticationLayout>
  );
};

// Also export SignupPage alias for consistency
export const SignupPage = SignUpPage;
