import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col p-4 bg-zinc-100 flex-grow">{children}</div>
  );
}
