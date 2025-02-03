'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/supabase/server';


const ITEMS_PER_PAGE = 10;

// Fetching total number of pages with ITEMS_PER_PAGE on each page
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

// Fetches a list of applications given queries
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

  return data ?? [];
}

// Fetch application given id
export async function fetchApplicationById(id: string) {
  noStore();
  const supabase = await createClient();

  let {data, error} = await supabase
    .from('Applications')
    .select('*')
    .eq('id', id);
  return data && data[0];
}


// Fetch the total number of applications applied to
export async function fetchTotalApplied(id: string) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('totalapplied', {uid: id});

  return data;  
}

// Fetch the total number of applications applied this week
export async function fetchTotalAppliedThisWeek(id: string) {
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('totalappliedthisweek', {uid: id});

  return data;
}

// Fetch ratio of application statuses
export async function fetchStatusRatios(id: string) {
  noStore();
  const supabase = await createClient();

  let {data, error} = await supabase.rpc('statusratio', {uid: id});

  return data;  
}

// Fetch the number of applications applied each day for the week
export async function fetchAppsTimelineThisWeek(id: string) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('applicationsthisweek', {uid: id});

  return data;  
}

// Fetch the number of applications applied each day for the previous week
export async function fetchAppsTimelinePrevWeek(id: string) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('applicationsprevweek', {uid: id});

  return data;  
}

// Fetch the number of applications applied monthly
export async function fetchAppCountByMonth(id: String) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('appsbymonth', {uid: id});

  return data;
}

// Fetch the number of applications applied weekly
export async function fetchAppCountByWeek(id: String) {
  noStore();
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('last12weeks', {uid: id});

  return data;
}

// Fetch all statistics
export async function fetchStatistics(id: string) {
  noStore();
  
  const data = await Promise.all([
    fetchTotalApplied(id),
    fetchTotalAppliedThisWeek(id),
    fetchStatusRatios(id),
    fetchAppsTimelineThisWeek(id),
    fetchAppsTimelinePrevWeek(id),
    fetchAppCountByWeek(id),
    fetchAppCountByMonth(id)
  ])
  
  const totalApplied = data[0];
  const totalAppliedThisWeek = data[1];
  const statusRatio = data[2];
  const appsThisWeek = data[3];
  const appsPrevWeek = data[4];
  const appCountByWeek = data[5]
  const appCountByMonth = data[6]

  return {
    totalApplied,
    totalAppliedThisWeek,
    statusRatio,
    appsThisWeek,
    appsPrevWeek,
    appCountByWeek,
    appCountByMonth
  }
}