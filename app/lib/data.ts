'use server';
/* eslint-disable import/no-anonymous-default-export */
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { create } from 'domain';
// import type { User, Application } from '@/app/lib/definitions';
// import { cookies } from 'next/headers';


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


// Fetching Statistics
export async function fetchTotalApplied() {
  noStore();
  const supabase = createClient();

  const {data, error} = await supabase.rpc('totalapplied');
  // console.log('Total Applied =>', data, error)

  return data;  
}

export async function fetchTotalAppliedThisWeek() {
  const supabase = createClient();

  const {data, error} = await supabase.rpc('totalappliedthisweek');
  console.log("Total Applied This Week =>", data);

  return data;
}

export async function fetchStatusRatios() {
  noStore();
  const supabase = createClient();

  let {data, error} = await supabase.rpc('statusratio');

  console.log('Status Ratio =>', data, error);

  return data;  
}

export async function fetchAppsTimelineThisWeek() {
  noStore();
  const supabase = createClient();

  const {data, error} = await supabase.rpc('applicationsthisweek');
  // console.log('Applications Applied This Week =>', data, error)

  return data;  
}

export async function fetchAppsTimelinePrevWeek() {
  noStore();
  const supabase = createClient();

  const {data, error} = await supabase.rpc('applicationsprevweek');
  // console.log('Applications Applied Prev Week =>', data, error)

  return data;  
}

export async function fetchStatistics() {
  noStore();
  
  const data = await Promise.all([
    fetchTotalApplied(),
    fetchTotalAppliedThisWeek(),
    fetchStatusRatios(),
    fetchAppsTimelineThisWeek(),
    fetchAppsTimelinePrevWeek()
  ])
  console.log(data)
  const totalApplied = data[0];
  const totalAppliedThisWeek = data[1];
  const statusRatio = data[2];
  const appsThisWeek = data[3];
  const appsPrevWeek = data[4];
  
  console.log("Total Applied =>", totalApplied);
  console.log("Total Applied This Week =>", totalAppliedThisWeek);
  console.log("Status Ratio =>", statusRatio);
  console.log("Apps This Week =>", appsThisWeek);
  console.log("Apps Prev Week =>", appsPrevWeek);

  return {
    totalApplied,
    totalAppliedThisWeek,
    statusRatio,
    appsThisWeek,
    appsPrevWeek
  }
}