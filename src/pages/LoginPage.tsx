import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { AuthenticationLayout } from '../layouts/AuthenticationLayout';
import { UnauthorizedDomainModal } from '../components/common/UnauthorizedDomainModal';
import { AuthErrorDetails } from '../utils/authErrors';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, continueAsGuest } = useRoadmap();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [unauthorizedError, setUnauthorizedError] = useState<AuthErrorDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password, rememberMe);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || 'Invalid credentials.');
    } else {
      navigate('/');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setUnauthorizedError(null);
    setIsGoogleSubmitting(true);
    const result = await loginWithGoogle();
    setIsGoogleSubmitting(false);

    if (!result.success) {
      if (result.errorDetails?.isUnauthorizedDomain) {
        setUnauthorizedError(result.errorDetails);
      } else {
        setError(result.message || 'Google sign in failed.');
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
          <h2 className="text-lg font-bold text-white">Log in to your account</h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-950/60 p-3 text-xs font-semibold text-rose-300 border border-rose-900/50">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
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
          <span>{isGoogleSubmitting ? 'Signing in with Google...' : 'Continue with Google'}</span>
        </button>

        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-[rgba(255,255,255,0.08)] w-full"></div>
          <span className="bg-[#121212] px-3 text-[11px] font-medium text-zinc-500 uppercase tracking-wider shrink-0">
            or email
          </span>
          <div className="border-t border-[rgba(255,255,255,0.08)] w-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Email */}
          <div>
            <label className="block font-medium text-zinc-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-xl bg-black border border-[#2A2A2A] py-3 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-medium text-zinc-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-black border border-[#2A2A2A] py-3 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 font-medium text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded bg-[#181818] border-[#2A2A2A] text-[#B87EFD] focus:ring-[#B87EFD] focus:ring-offset-0 transition-all cursor-pointer"
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-[#F3F4F6] active:scale-[0.99] mt-2 cursor-pointer"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Log In'}</span>
          </button>
        </form>

        {/* Links */}
        <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] text-center space-y-3">
          <p className="text-xs text-zinc-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-white hover:underline">
              Create Account
            </Link>
          </p>

          <button
            type="button"
            onClick={handleGuest}
            className="w-full flex items-center justify-center gap-1.5 pt-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200 group cursor-pointer"
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
        />
      )}
    </AuthenticationLayout>
  );
};
