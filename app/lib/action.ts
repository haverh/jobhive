'use server';
/* eslint-disable import/no-anonymous-default-export */
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import type { User, Application } from '@/app/lib/definitions';
import { cookies } from 'next/headers'
import { supabase } from '@supabase/auth-ui-shared';

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

export async function signOutUser() {
  const supabase = createClient();
  
  // Sign Out with email
  const { error } = await supabase.auth.signOut()
}

const ITEMS_PER_PAGE = 10;
export async function fetchTotalPages(query: string, sort: string, filters: Array<string>) {
  noStore();

  const supabase = createClient();

  const {count, error} = await supabase
    .from('Applications')
    .select('*', { count: 'exact', head: true })
    .filter('status', 'in', `(${filters})`)
    .or(`role.ilike.*${query}*, company.ilike.*${query}*`)

  const totalPages = Math.ceil(Number(count && count/ITEMS_PER_PAGE))
  return totalPages;
}


export async function fetchApplications(query: string, currentPage: number, sort: string, filters: Array<string>) {
  noStore();
  const supabase = createClient();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  console.log(filters)
  const sortOptions = sort.split(' ');

  let { data, error } = await supabase
    .from('Applications')
    .select('*')
    .filter('status', 'in', `(${filters})`)
    .or(`role.ilike.*${query}*, company.ilike.*${query}*`)
    .order(sortOptions[0], {ascending: sortOptions[1] === 'asc'})
    .range(offset, offset+ITEMS_PER_PAGE - 1)

  return data;
}

export async function fetchApplicationById(id: string) {
  noStore();
  const supabase = createClient();

  let {data, error} = await supabase
    .from('Applications')
    .select('*')
    .eq('id', id);
  return data && data[0];
}

export async function insertApplication(app: Application) {
  noStore();
  const supabase = createClient();

  const cookieStore = cookies();
  const authCookie = cookieStore.get(`sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}-auth-token`);
  const authCookieValue = JSON.parse(authCookie?.value!);
  const user_id = authCookieValue?.user.id;

  const {data, error} = await supabase
    .from('Applications')
    .insert([
      {user_id: user_id, 
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

  console.log(app);

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