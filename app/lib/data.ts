'use server';
/* eslint-disable import/no-anonymous-default-export */
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers'
// import type { User, Application } from '@/app/lib/definitions';
// import { cookies } from 'next/headers';


const ITEMS_PER_PAGE = 10;
export async function fetchTotalPages(id:string, query: string, sort: string, filters: Array<string>) {
  noStore();

  const supabase = await createClient();

  const {count, error} = await supabase
    .from('Applications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id)
    .filter('status', 'in', `(${filters})`)
    .or(`role.ilike.*${query}*, company.ilike.*${query}*`)

  const totalPages = Math.ceil(Number(count && count/ITEMS_PER_PAGE))
  return totalPages;
}


export async function fetchApplications(id: string, query: string, currentPage: number, sort: string, filters: Array<string>) {
  noStore();
  const supabase = await createClient();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  const sortOptions = sort.split(' ');

  let { data, error } = await supabase
    .from('Applications')
    .select('*')
    .eq('user_id', id)
    .filter('status', 'in', `(${filters})`)
    .or(`role.ilike.*${query}*, company.ilike.*${query}*`)
    .order(sortOptions[0], {ascending: sortOptions[1] === 'asc'})
    .order('id', { ascending: true })
    .range(offset, offset+ITEMS_PER_PAGE - 1)

  return data;
}

export async function fetchApplicationById(id: string) {
  noStore();
  const supabase = await createClient();

  let {data, error} = await supabase
    .from('Applications')
    .select('*')
    .eq('id', id);
  return data && data[0];
}


// Fetching Statistics
export async function fetchTotalApplied(id: string) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('totalapplied', {uid: id});

  return data;  
}

export async function fetchTotalAppliedThisWeek(id: string) {
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('totalappliedthisweek', {uid: id});

  return data;
}

export async function fetchStatusRatios(id: string) {
  noStore();
  const supabase = await createClient();

  let {data, error} = await supabase.rpc('statusratio', {uid: id});

  return data;  
}

export async function fetchAppsTimelineThisWeek(id: string) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('applicationsthisweek', {uid: id});

  return data;  
}

export async function fetchAppsTimelinePrevWeek(id: string) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('applicationsprevweek', {uid: id});

  return data;  
}

export async function fetchAppCountByMonth(id: String) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('appsbymonth', {uid: id});

  return data;
}

export async function fetchStatistics(id: string) {
  noStore();
  
  const data = await Promise.all([
    fetchTotalApplied(id),
    fetchTotalAppliedThisWeek(id),
    fetchStatusRatios(id),
    fetchAppsTimelineThisWeek(id),
    fetchAppsTimelinePrevWeek(id),
    fetchAppCountByMonth(id)
  ])
  
  const totalApplied = data[0];
  const totalAppliedThisWeek = data[1];
  const statusRatio = data[2];
  const appsThisWeek = data[3];
  const appsPrevWeek = data[4];
  const appCountByMonth = data[5]

  return {
    totalApplied,
    totalAppliedThisWeek,
    statusRatio,
    appsThisWeek,
    appsPrevWeek,
    appCountByMonth
  }
}