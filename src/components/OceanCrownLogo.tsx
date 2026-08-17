import React from 'react';

interface OceanCrownLogoProps {
  variant?: 'light' | 'dark' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  tagline?: string;
}

export const OceanCrownLogo: React.FC<OceanCrownLogoProps> = ({
  variant = 'white',
  className = '',
  size = 'md',
  name = 'Ocean Crown',
  tagline = 'Shipping Services L.L.C.',
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-white' : 'text-slate-900';
  const subtextColor = isWhite ? 'text-slate-300' : 'text-slate-600';
  const iconColor = isWhite ? '#ffffff' : '#0a2540';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Globe & Crown Monogram Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Globe Outer Circle */}
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke={iconColor}
            strokeWidth="2"
            strokeOpacity="0.9"
          />
          {/* Globe Latitude Ellipses */}
          <ellipse
            cx="22"
            cy="22"
            rx="12"
            ry="20"
            stroke={iconColor}
            strokeWidth="1.6"
            strokeOpacity="0.85"
          />
          <line
            x1="2"
            y1="22"
            x2="42"
            y2="22"
            stroke={iconColor}
            strokeWidth="1.6"
            strokeOpacity="0.85"
          />
          <ellipse
            cx="22"
            cy="22"
            rx="20"
            ry="11"
            stroke={iconColor}
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeDasharray="2 2"
          />
          {/* Stylized Crown Peaks across the equator */}
          <path
            d="M13 22L17 14L22 19L27 14L31 22H13Z"
            fill={iconColor}
            fillOpacity={isWhite ? '0.9' : '0.8'}
          />
        </svg>
      </div>

      {/* Brand Typography (Arabic & English) */}
      <div className="flex flex-col leading-tight text-left">
        <span
          className={`font-arabic text-[11px] font-bold tracking-wider ${isWhite ? 'text-white/90' : 'text-slate-800'}`}
          dir="rtl"
        >
          أوشن كراون لخدمات الشحن ذ.م.م
        </span>
        <span
          className={`font-montserrat text-[14px] font-extrabold tracking-wide uppercase ${textColor}`}
        >
          {name}
        </span>
        <span
          className={`font-poppins text-[9.5px] font-medium tracking-tight uppercase ${subtextColor}`}
        >
          {tagline}
        </span>
      </div>
    </div>
  );
};
