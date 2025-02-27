import '../globals.css';
import { Montserrat } from 'next/font/google';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Navbar from '../components/navbar';

const defaultUrl = process.env.VERCEL_SITE_URL
  ? `https://${process.env.VERCEL_SITE_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Devlights ED',
  description: 'Best performance reviews in the county'
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-background text-foreground">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="flex flex-col min-h-[calc(100vh-3rem)]">
            <div className="flex flex-col p-4 bg-zinc-50 flex-grow">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
