'use server';
/* eslint-disable import/no-anonymous-default-export */
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import type { User } from './definitions';

export async function signUpUser(user: User){
  const supabase = createClient();

  // Sign Up with email
  const { error } = await supabase.auth.signUp(
    {
      email: user.email,
      password: user.password,
      options: {
        emailRedirectTo: 'http://localhost:3000/sign-in',
        data: {
          name: user.name,
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


export async function signOutUser(user: User) {
  const supabase = createClient();
  
  // Sign Out with email
  const { error } = await supabase.auth.signOut()
}