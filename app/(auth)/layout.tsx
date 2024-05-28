import { GeistSans } from 'geist/font/sans';
import '../globals.css';

const defaultUrl = process.env.VERCEL_SITE_URL
  ? `https://${process.env.VERCEL_SITE_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Devlights ED',
  description: 'Best performance reviews in the county'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen">
          <div className="bg-devlights-bg bg-cover bg-bottom">{children}</div>
        </main>
      </body>
    </html>
  );
}
