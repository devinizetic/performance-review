import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevLights Performance Review - External Access',
  description: 'External access to DevLights Performance Review system'
};

export default function ExternalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto flex items-center h-16 px-8">
            <Image
              src="/images/logodev3.png"
              alt="DevLights Logo"
              width={140}
              height={48}
              priority
              className="block"
            />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col p-4 px-8 bg-zinc-50 flex-grow">
              {children}
            </div>
          </div>
        </main>
        <footer className="mt-auto bg-gray-100 py-4 border-t">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} DevLights. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
