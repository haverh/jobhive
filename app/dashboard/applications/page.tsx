// 'use client';
import { Metadata } from "next";
import Table from "@/app/ui/applications/tables"
import AppSearch from "@/app/ui/applications/app-search"
import { AddApplicationButton } from "@/app/ui/applications/buttons"
import AppFilter from "@/app/ui/applications/app-filters";
import Pagination from "@/app/ui/applications/pagination";
import { fetchTotalPages } from "@/app/lib/data";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import { getUser } from "@/app/lib/action";


export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Applications",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
    filters?: string;
  };
}) {
  const { data, error } = await getUser()
  console.log(data)
  const {id} =  data.user!;

  // const [params, setParams] = useState();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort || 'date_applied desc';
  const filters: Array<string> = searchParams?.filters && JSON.parse(searchParams?.filters!) || ['pending', 'rejected', 'interviewed', 'offered', 'accepted'];

  const totalPages = Number(await fetchTotalPages(id, query, sort, filters));

  // console.log("QUERY => ", query);
  // console.log("CURRENT PAGE => ", currentPage);
  // console.log("SORT => ", sort);
  // console.log("FILTERS => ", filters);

  return(
    <div className="w-full">
      <h1 className='flex w-full items-center justify-between text-xl'>Applications</h1>
      <div className="h-12 mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AppSearch/>
        <AddApplicationButton/>
      </div>
      <div className="w-full mt-4 flex items-center items-end gap-2 md:mt-8">
        <AppFilter />
      </div>
      <Suspense fallback={<Loading />}>
        <Table id={id} query={query} currentPage={currentPage} sort={sort} filters={filters} />
        <Pagination totalPages={totalPages}/>
      </Suspense>
    </div>
  )
}