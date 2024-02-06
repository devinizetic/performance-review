import '../globals.css';
import HeaderMobile from '../components/header-mobile';
import Header from '../components/header';
import SideNav from '../components/side-nav';
import PageWrapper from '../components/page-wrapper';
import MarginWidthWrapper from '../components/margin-width-wrapper';
import { Montserrat } from 'next/font/google';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase'
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-background text-foreground">
        <div className="h-12">
          <Header />
          <HeaderMobile />
        </div>
        <div className="flex h-screen-minus-header overflow-hidden">
          <div className="md:w-60 h-full fixed overflow-auto">
            <SideNav />
          </div>
          <main className="flex-1 md:ml-60 overflow-auto">
            <div className="flex flex-col h-full">
              <div className="flex flex-col p-4 bg-zinc-100 flex-grow">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
