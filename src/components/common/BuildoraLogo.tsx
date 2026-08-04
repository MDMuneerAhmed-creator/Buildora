import React from 'react';
import { Rocket } from 'lucide-react';

interface BuildoraLogoProps {
  size?: number;
  className?: string;
}

export const BuildoraLogo: React.FC<BuildoraLogoProps> = ({ size = 36, className = "" }) => {
  const iconSize = Math.round(size * 0.58);
  const borderRadius = Math.max(6, Math.round(size * 0.28));

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 text-white shadow-sm ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${borderRadius}px`,
        background: 'linear-gradient(135deg, #A855F7 0%, #C084FC 40%, #E11D48 100%)',
      }}
    >
      <Rocket
        className="text-white stroke-[2.2]"
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      />
    </div>
  );
};

