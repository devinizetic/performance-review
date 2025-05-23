import { redirect } from 'next/navigation';
import LoginButton from './components/LoginButton';
import { createClient } from '@/utils/supabase/server';

export default async function Login() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const signInWithGoogle = async () => {
    'use server';

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.VERCEL_URL_CALLBACK}`
      }
    });

    if (error) {
      return redirect('/login');
    }

    return redirect(data.url);
  };

  return (
    <form className="flex h-screen items-end justify-center">
      <div className="flex items-center justify-center h-1/2">
        <LoginButton onLogin={signInWithGoogle} />
      </div>
    </form>
  );
}
