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
      className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:border-none hover:bg-primary hover:text-white"
      type="submit"
      form="question-form"
      {...props}
    >
      {children}
    </button>
  );
}