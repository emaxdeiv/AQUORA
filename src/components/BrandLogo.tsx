interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function BrandLogo({ variant = 'dark', className = '' }: BrandLogoProps) {
  const textColor = variant === 'light' ? 'text-[#FAF7EE]' : 'text-[#184435]';
  const markClass =
    variant === 'light'
      ? 'w-8 h-8 object-contain shrink-0 brightness-0 invert opacity-95'
      : 'w-8 h-8 object-contain shrink-0';

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <img
        src="/assets/aistudio/logo-mark-green_a10c4ca0.png"
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className={markClass}
      />
      <span className={`font-display text-xl font-bold tracking-tight ${textColor}`}>
        Aquora
      </span>
    </span>
  );
}
