import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BuildoraLogo } from '../components/common/BuildoraLogo';

interface AuthenticationLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showFooterTerms?: boolean;
  showBackButton?: boolean;
  backTo?: string;
  onBack?: () => void;
}

export const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({
  title = 'Buildora AI',
  subtitle = 'AI Operating System for Entrepreneurs',
  children,
  showFooterTerms = true,
  showBackButton = true,
  backTo,
  onBack,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backTo) {
      navigate(backTo);
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/welcome');
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#000000] text-white flex flex-col justify-between items-center p-4 sm:p-6 overflow-y-auto sm:overflow-hidden select-none z-50">
      {/* Top Left Back Button */}
      {showBackButton && (
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back to previous page"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-zinc-400 hover:text-white bg-[#111111] hover:bg-[#181818] border border-[rgba(255,255,255,0.08)] rounded-xl px-3.5 py-2 text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer z-50 group"
        >
          <ArrowLeft className="h-4 w-4 text-zinc-400 group-hover:text-white transition-transform group-hover:-translate-x-0.5" />
          <span>Back</span>
        </button>
      )}

      {/* Top spacer for vertical balance */}
      <div className="w-full flex-1 max-h-8 sm:max-h-16" />

      {/* Main Centered Content Wrapper */}
      <div className="w-full max-w-[480px] flex flex-col items-center my-auto">
        
        {/* Buildora Logo with Soft Purple Glow */}
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute -inset-3 rounded-full bg-[#EC4899]/20 blur-2xl opacity-80 pointer-events-none" />
          <div className="relative flex items-center justify-center">
            <BuildoraLogo size={88} />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-1.5 text-center">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA3AF] font-medium tracking-wide mb-6 text-center">
          {subtitle}
        </p>

        {/* Premium Dark Authentication Card */}
        <div className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-6 sm:p-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          {children}
        </div>

        {/* Terms & Privacy Policy Note */}
        {showFooterTerms && (
          <p className="text-[11px] text-[#6B7280] text-center mt-6 leading-normal">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full py-2 text-center text-[11px] text-[#6B7280] font-medium tracking-wide shrink-0">
        © 2026 Buildora AI
      </footer>
    </div>
  );
};
