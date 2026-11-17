import { useState } from 'react';
import { Waves } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[16/9]',
  priority = false,
  fallbackTitle = 'Aquora Aquaculture System',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#184435] text-[#FAF7EE] p-6 text-center ${aspectClassName} ${className}`}
      >
        <Waves className="w-8 h-8 text-[#38b6ff] mb-3" aria-hidden="true" />
        <p className="font-display text-sm font-medium text-[#FAF7EE]">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#184435]/10 ${aspectClassName} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover block"
      />
    </div>
  );
}
