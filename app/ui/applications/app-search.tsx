'use client';
import { useState, MouseEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "../button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function AppSearch() {

  const [query, setQuery] = useState('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const searchApp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    params.set('query', query);
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form className="md:w-3/5 h-16 flex items-center">
      <input className="search-input w-full h-10 pl-2 mr-2 rounded-lg" type="text" 
        placeholder="Search for role..."
        onChange={(e) => {setQuery(e.target.value)}} />
      <Button className="h-10 w-12 flex justify-center items-center dark:text-[#333333] bg-yellow-400 dark:bg-[#FF8C42] rounded-lg hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500"
        onClick={(e) => {searchApp(e)}}>
        <MagnifyingGlassIcon className="w-5 font-bold" />
      </Button>
    </form>
  )
}