import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../lib/firebase';
import { AuthenticationLayout } from '../layouts/AuthenticationLayout';
import { parseAuthError } from '../utils/authErrors';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, trimmedEmail.toLowerCase());
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      if (err?.code === 'auth/user-not-found') {
        // Security requirement: Do NOT reveal whether an email exists in the system.
        setIsSubmitted(true);
      } else {
        const parsed = parseAuthError(err);
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
          <h2 className="text-lg font-bold text-white">Reset your password</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-xl bg-rose-950/60 p-3 text-xs font-semibold text-rose-300 border border-rose-900/50"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-4 text-center py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div className="space-y-2 text-xs text-zinc-300 font-medium leading-relaxed">
              <p className="font-semibold text-white text-sm">
                Password reset email sent successfully.
              </p>
              <p>
                If an account exists for this email address, you will receive a password reset link shortly.
              </p>
              <p className="text-zinc-400">
                Please check your inbox and spam folder.
              </p>
            </div>

            <Link
              to="/login"
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-[#F3F4F6] active:scale-[0.99] mt-4"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
            <div>
              <label htmlFor="reset-email" className="block font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                id="reset-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="you@company.com"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-black border border-[#2A2A2A] py-3 px-4 font-medium text-white placeholder-[#6B7280] focus:outline-none focus:border-[#B87EFD] focus:ring-1 focus:ring-[#B87EFD] transition-all disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-[#F3F4F6] active:scale-[0.99] mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Sending Link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </AuthenticationLayout>
  );
};
