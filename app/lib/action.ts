'use server';
/* eslint-disable import/no-anonymous-default-export */
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import type { User, Application, Links, Profile } from '@/app/lib/definitions';
import { cookies } from 'next/headers'
import { isAuthApiError, isAuthError } from '@supabase/supabase-js';


// Account Server Functions
export async function registerUser(user: User){
  console.log("IN RESIGETER IN ACTION TS")
  const supabase = createClient();

  // Sign Up with email
  const { data, error } = await supabase.auth.signUp(
    {
      email: user.email,
      password: user.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/sign-in`,
        data: {
          name: user.name,
          links: [{site: 'linkedin', link: ''}, {site: 'github', link: ''}, {site: 'portfolio', link: ''}],
        }
      }
    }
  );
  
  console.log(data, error )

  if ( error ) {
    console.log(error.code)
    redirect(`/auth/error?error?${error.code}`)
  } else {
    if ( data.user && data.user.identities && data.user.identities.length === 0 ) {
      console.log("ALREADY EXISTS")
      return "user_already_exists"
    } else {
      revalidatePath('/', 'layout')
      redirect('/dashboard')
    }
    
  }

  
}


export async function resendConfirmation(email: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/sign-in`,
    }
  })

  if ( error ) {
    console.log(error)
    redirect('/auth/error')
  }

  return {error}
}


export async function signInUser(user: User) {
  const supabase = createClient();
  
  // Sign in with email
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  })
  
  if ( error ) {
    let redirectURL = `/auth/error?error=${error.code}&error_msg=${error.message}`
    console.log(error.code, error.name, error.message)
    if (error.code === 'email_not_confirmed') {
      redirect(redirectURL + `&unverified_email=${user.email}`)
    } else if (error.code === 'invalid_credentials')
      return error.code
  } else {
    revalidatePath('/', 'layout')
    redirect('/dashboard')
    return "success";
  }

  
}


export async function signOutUser() {
  const supabase = createClient();
  
  // Sign Out with email
  const { error } = await supabase.auth.signOut()
}

export async function forgotPassword(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/reset-password`,
  })

  console.log(data,error)

  return { data, error };

  console.log("FORGOT PASSWORD -", data, error);
}

export async function updatePassword(password: string, code: string | null) {
  const supabase = createClient();

  // console.log("GOT INTO UPDATE PASSWORD")
  console.log("CODE IS:", code);

  if ( code ) {
    const {error} = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return { subdirectory: 'reset-password', parameters: 'message=Unable to reset Password. Link expired!'}
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { subdirectory: 'reset-password', parameters: 'message=Undable to reset Password. Try again!'}
  }

  return { subdirectory: 'sign-in', parameters: 'message=Your Password has been reset successfully. Sign In.'}
}

export async function updateLinks(links: Links) {
  console.log("IN UPDATE LINKS ", links)
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      links: {linkedin: links.linkedin, github: links.github, portfolio: links.portfolio}
    }
  })

  if ( error ) {
    console.log(error)
    redirect('/error')
  }
}

export async function updateProfile(profile: Profile) {
  const supabase = createClient();
  console.log("PROFILE: ==>", profile);
  const { error } = await supabase.auth.updateUser({
    email: profile.email,
    phone: profile.phone,
    data: {
      email: profile.email,
      name: profile.name,
      location: profile.location
    }
  })

  if ( error ) {
    console.log(error);
    redirect('/error');
  }
}

export async function deleteAccount(userId: string) {
  const supabase = createClient();

  
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if ( error ) {
    console.log(error);
    redirect('/error');
  }
}




// Application Server Functions
export async function insertApplication(app: Application) {
  noStore();
  const supabase = createClient();

  const {data, error} = await supabase
    .from('Applications')
    .insert([
      {user_id: app.id, 
        date_applied: app.date_applied, 
        role: app.role, 
        company: app.company,
        job_posting: app.job_posting,
        status: app.status  
      }
    ])
    .select()

  if ( error ) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard/applications')
}

export async function updateApplication(app: Application) {
  noStore();
  const supabase = createClient();

  // console.log(app);

  const {data, error} = await supabase
    .from('Applications')
    .update({ 
      date_applied: app.date_applied, 
      role: app.role, 
      company: app.company,
      job_posting: app.job_posting,
      status: app.status  
    })
    .eq('id',app.id)
    .select()

  console.log(data, error);
  if ( error ) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard/applications')
}

export async function deleteApplication(id: string) {
  noStore();
  const supabase = createClient();

  const {error} = await supabase
    .from('Applications')
    .delete()
    .eq('id', id)

  if ( error ) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard/applications')  
}




// Non-database related
export async function hasEmptyField(obj: any) {
  for (const prop in obj) {
    if ( obj[prop].length === 0 ) {
      console.log(obj[prop], obj[prop].length)
      return true;
    }
  }
  return false;
}