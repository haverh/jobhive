'use server';
/* eslint-disable import/no-anonymous-default-export */
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import type { User, Application, Links } from '@/app/lib/definitions';
import { cookies } from 'next/headers'

export async function registerUser(user: User){
  const supabase = createClient();

  // Sign Up with email
  const { error } = await supabase.auth.signUp(
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
  
  if ( error ) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signInUser(user: User) {
  const supabase = createClient();
  
  // Sign in with email
  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  })
  
  if ( error ) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
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

  console.log("FORGOT PASSWORD -", data, error);
}

export async function updatePassword(password: string, code: string | null) {
  const supabase = createClient();

  // console.log("GOT INTO UPDATE PASSWORD")

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