interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CustomButton({
  children,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:bg-primary hover:text-white"
      {...props}
    >
      {children}
    </button>
  );
}
