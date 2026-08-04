import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../lib/firebase';
import { AuthenticationLayout } from '../layouts/AuthenticationLayout';
import { parseAuthError } from '../utils/authErrors';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingCode, setIsValidatingCode] = useState(!!oobCode);
  const [codeEmail, setCodeEmail] = useState<string | null>(null);

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setCodeEmail(email);
          setIsValidatingCode(false);
        })
        .catch((err) => {
          console.error('Invalid or expired reset code:', err);
          setError('This password reset link is invalid or has expired. Please request a new link.');
          setIsValidatingCode(false);
        });
    }
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!oobCode) {
      setError('Missing reset code. Please use the password reset link sent to your email.');
      return;
    }

    setIsSubmitting(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Confirm password reset error:', err);
      const parsed = parseAuthError(err);
      if (err?.code === 'auth/expired-action-code') {
        setError('This password reset link has expired. Please request a new link.');
      } else if (err?.code === 'auth/invalid-action-code') {
        setError('This password reset link is invalid or has already been used.');
      } else {
        setError(parsed.message + (parsed.suggestedAction ? ` ${parsed.suggestedAction}` : ''));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthenticationLayout
      title="Buildora AI"
      subtitle="AI Operating System for Entrepreneurs"
    >
      <div className="w-full space-y-5">
        <div className="text-center">
          <h2 className="text-lg font-bold text-white">Set new password</h2>
          <p className="text-xs text-zinc-400 mt-1">
            {codeEmail ? `Resetting password for ${codeEmail}` : 'Must be at least 6 characters.'}
          </p>
        </div>

        {isValidatingCode && (
          <div className="flex items-center justify-center gap-2 py-4 text-xs text-zinc-400">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span>Validating reset link...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-950/60 p-3 text-xs font-semibold text-rose-300 border border-rose-900/50">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="space-y-4 text-center py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="text-xs text-zinc-300 font-medium">
              Your password has been successfully reset!
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-[#F3F4F6] cursor-pointer font-semibold"
            >
              Log In Now
            </button>
          </div>
        ) : (
          !isValidatingCode && (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-zinc-300 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl bg-black border border-[#2A2A2A] py-3 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full rounded-xl bg-black border border-[#2A2A2A] py-3 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-[#F3F4F6] active:scale-[0.99] mt-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>
          )
        )}

        <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] text-center">
          <Link
            to="/login"
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Back to Log In
          </Link>
        </div>
      </div>
    </AuthenticationLayout>
  );
};
