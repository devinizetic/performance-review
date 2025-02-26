import '../globals.css';
import HeaderMobile from '../components/header-mobile';
import Header from '../components/header';
import SideNav from '../components/side-nav';
import { Montserrat } from 'next/font/google';
import { createClient } from '@/utils/supabase/server';
import UserRepository from '@/lib/repository/user-repository';
import { redirect } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/constants';

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

  const userRoles = await UserRepository.getUserRoles({
    id: session.user.id
  });

  const roleItems = SIDENAV_ITEMS.filter((item) => {
    return item.roles?.some((role) =>
      userRoles.some((uRole) => uRole.role_id === role)
    );
  });

  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-background text-foreground">
        <div className="h-12">
          <Header />
          <HeaderMobile sideNavItems={roleItems} />
        </div>
        <div className="flex h-screen-minus-header overflow-hidden">
          <div className="md:w-60 h-full fixed overflow-auto">
            <SideNav sideNavItems={roleItems} />
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
