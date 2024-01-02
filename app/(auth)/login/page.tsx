import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import googleLogo from '../../g-logo.png';

export default function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  const signInWithGoogle = async () => {
    'use server';

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    });
    console.log(data, error);
    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect(data.url);
  };

  return (
    <form
      className="flex h-screen items-center justify-center"
      action={signInWithGoogle}
    >
      <button className="bg-[#fff] border-[#d3d3d3] border-solid border-[1px] rounded-[4px] text-[#737373] cursor-pointerm-0 px-3 py-3 text-center flex items-center justify-center gap-3">
        <Image src={googleLogo} alt="Google logo" width="20" height="20" />
        Sign in with Google
      </button>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
