import { GeistSans } from 'geist/font/sans';
import '../globals.css';
import HeaderMobile from '../components/header-mobile';
import Header from '../components/header';
import SideNav from '../components/side-nav';
import PageWrapper from '../components/page-wrapper';
import MarginWidthWrapper from '../components/margin-width-wrapper';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div className="flex">
          <SideNav />
          <main className="min-h-screen flex-1">
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
