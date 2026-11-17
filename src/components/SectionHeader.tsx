interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
}

export function SectionHeader({
  kicker,
  title,
  description,
  tone = 'light',
  align = 'left',
}: SectionHeaderProps) {
  const isDark = tone === 'dark';
  const titleColor = isDark ? 'text-[#FAF7EE]' : 'text-[#184435]';
  const descColor = isDark ? 'text-[#FAF7EE]/80' : 'text-[#184435]/75';
  const kickerColor = isDark ? 'text-[#38b6ff]' : 'text-[#1b7895]';
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignClasses}`}>
      {kicker && (
        <p className={`font-display text-sm font-semibold mb-2 ${kickerColor}`}>
          {kicker}
        </p>
      )}
      <h2
        className={`font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight text-balance ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
