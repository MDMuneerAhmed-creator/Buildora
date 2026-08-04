import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { AuthenticationLayout } from '../layouts/AuthenticationLayout';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { continueAsGuest } = useRoadmap();

  const handleGuest = () => {
    continueAsGuest();
    navigate('/');
  };

  return (
    <AuthenticationLayout
      title="Buildora AI"
      subtitle="AI Operating System for Entrepreneurs"
      showBackButton={false}
    >
      <div className="w-full space-y-3">
        {/* Primary Button */}
        <Link
          to="/signup"
          className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-[#F3F4F6] active:scale-[0.99] shadow-sm"
        >
          Create Account
        </Link>

        {/* Secondary Button */}
        <Link
          to="/login"
          className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl border border-[#2A2A2A] bg-[#181818] text-white font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-[#222222] active:scale-[0.99]"
        >
          Log In
        </Link>

        {/* Text Button: Continue as Guest */}
        <button
          onClick={handleGuest}
          type="button"
          className="w-full flex items-center justify-center gap-1.5 pt-3 pb-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200 group cursor-pointer"
        >
          <span>Continue as Guest</span>
          <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </AuthenticationLayout>
  );
};
