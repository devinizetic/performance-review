interface CustomTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  underline?: boolean;
  bold?: boolean;
  className?: string;
}

export default function CustomText({
  children,
  size = 'small',
  underline,
  bold,
  className
}: CustomTextProps) {
  return (
    <div
      className={`flex w-full
      ${className}
      ${underline ? 'underline' : ''}
      ${
        size === 'large'
          ? 'text-2xl'
          : size === 'medium'
          ? 'text-lg'
          : 'text-md'
      }
      ${bold ? 'font-bold' : ''}`}
    >
      {children}
    </div>
  );
}
