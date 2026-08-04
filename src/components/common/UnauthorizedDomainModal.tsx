import React, { useState } from 'react';
import { ShieldAlert, Copy, Check, ExternalLink, X, Mail, UserCheck } from 'lucide-react';
import { AuthErrorDetails } from '../../utils/authErrors';

interface UnauthorizedDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorDetails: AuthErrorDetails;
  onSwitchToEmail?: () => void;
  onContinueAsGuest?: () => void;
}

export const UnauthorizedDomainModal: React.FC<UnauthorizedDomainModalProps> = ({
  isOpen,
  onClose,
  errorDetails,
  onSwitchToEmail,
  onContinueAsGuest,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyDomain = () => {
    if (errorDetails.domain) {
      navigator.clipboard.writeText(errorDetails.domain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#141414] border border-[#2B2B2B] p-6 shadow-2xl text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Google Sign-In Preview Action</h3>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                Domain requires Firebase Console setup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-[#222222] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Domain Display & Copy */}
        <div className="mb-4 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">Current Web Domain:</span>
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
              AI Studio Preview
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 bg-[#111111] border border-[#262626] rounded-lg p-2.5">
            <code className="text-xs font-mono font-bold text-white truncate max-w-[320px]">
              {errorDetails.domain || 'run.app domain'}
            </code>
            <button
              onClick={handleCopyDomain}
              className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-md bg-[#252525] hover:bg-[#333333] border border-[#3A3A3A] text-xs font-semibold text-white transition-all cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-300" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Steps to Fix */}
        <div className="space-y-2.5 mb-5 text-xs">
          <p className="font-semibold text-zinc-200">
            To enable Google Sign-In on this preview URL:
          </p>
          <ol className="space-y-1.5 pl-4 list-decimal text-zinc-300 leading-relaxed font-normal">
            <li>
              Open <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-[#B87EFD] hover:underline inline-flex items-center gap-0.5 font-semibold">Firebase Console <ExternalLink className="h-3 w-3 inline" /></a>
            </li>
            <li>Go to <strong>Authentication</strong> → <strong>Settings</strong> → <strong>Authorized Domains</strong></li>
            <li>Click <strong>Add Domain</strong> and paste the copied domain above.</li>
            <li>Click <strong>Save</strong>. Google Sign-In will work immediately!</li>
          </ol>
        </div>

        {/* Alternative Auth Options */}
        <div className="pt-4 border-t border-[#262626] space-y-2.5">
          <p className="text-xs text-zinc-400 font-medium text-center">
            Or continue instantly with another method:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {onSwitchToEmail && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToEmail();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-semibold text-white transition-all cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                <span>Use Email & Password</span>
              </button>
            )}

            {onContinueAsGuest && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContinueAsGuest();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-semibold text-zinc-300 transition-all cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5 text-purple-400" />
                <span>Continue as Guest</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
