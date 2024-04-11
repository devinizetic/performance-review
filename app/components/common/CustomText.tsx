interface CustomTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function CustomText({ children }: CustomTextProps) {
  return <div className={`text-2xl font-bold`}>{children}</div>;
}
