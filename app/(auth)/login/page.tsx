import { cookies } from 'next/headers';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import googleLogo from '../../g-logo.png';

export default async function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const signInWithGoogle = async () => {
    'use server';

    const cookieStore = cookies();
    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.VERCEL_URL_CALLBACK}`
      }
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect(data.url);
  };

  return (
    <form
      className="flex h-screen items-end justify-center"
      action={signInWithGoogle}
    >
      <div className="flex items-center justify-center h-1/2">
        <button className="bg-[#fff] border-[#d3d3d3] border-solid border-[1px] rounded-[4px] text-[#737373] cursor-pointerm-0 px-3 py-3 text-center flex items-center justify-center gap-3">
          <Image src={googleLogo} alt="Google logo" width="20" height="20" />
          Iniciar sesión con Google
        </button>
      </div>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
