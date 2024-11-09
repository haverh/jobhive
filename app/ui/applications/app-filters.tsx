'use client';
import { Dispatch, SetStateAction, useEffect } from "react";
import { useState, MouseEvent } from "react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from "../button";
import clsx from "clsx";
import Loading from "../loading";

const sortList = [
  ['Latest', 'date_applied desc'],
  ['Oldest', 'date_applied asc'],
  ['Role Ascending', 'role asc'],
  ['Role Descending', 'role desc'],
  ['Company Ascending', 'company asc'],
  ['Company Descending', 'company desc'],
  ['Status Ascending', 'status asc'],
  ['Status Descending', 'status desc']
];

const filterList = ['Pending', 'Rejected', 'Interviewed', 'Offered', 'Accepted'];

function SortComponent({
  setSort
}: {
  setSort: Dispatch<SetStateAction<string>>
}) {

  return (
    <form>
      <div>
        <label htmlFor="sortBy" className="h-8">Sort By: </label>
        <select name="sortBy" id="sortBy" className="dark:bg-[#2C2C2C] py-2 w-fit h-10 rounded dark:hover:bg-[#333333]"
          onChange={(e) => {setSort(e.target.value)}}>
          {sortList.map((sortElement, index) => {
            return (
              <option key={index} value={sortElement[1]}>{sortElement[0]}</option>
            )
          })}
        </select>
      </div>      
    </form>
  )
}

function FilterComponent({
  filtersBool,
  setFilterBool
}: {
  filtersBool: Array<boolean>,
  setFilterBool : Dispatch<SetStateAction<Array<boolean>>>
}) {

  const [toggle, setToggle] = useState(false);
  
  const handleCheckboxes = (index: number) => {
    const updatedFiltersBool: Array<boolean> = filtersBool.map((bool:boolean, filterIndex:number) => {
      return filterIndex === index ? !bool : bool;
    })
    setFilterBool(updatedFiltersBool);
  }

  if (filtersBool.length < 0) return <Loading />

  return (
    <div className="relative">
      <button onClick={() => setToggle(!toggle)} className='bg-gray-200 dark:bg-[#2C2C2C] dark:text-white p-2 h-10 rounded-xl flex items-center gap-2 dark:hover:bg-[#333333]'>
        <span>Filter </span>
        <FunnelIcon className="inline w-4 h-4"/>
      </button>
      <form className={clsx(
        'bg-gray-300 dark:bg-[#2C2C2C] absolute rounded p-5 top-12 right-0',
        {
          'hidden' : toggle === false,
          'block' : toggle === true
        }
      )}>
        {filterList.map((filterElement, index) => {
          return (
            <div key={index} className='flex items-center'>
              <input name={filterElement.toLowerCase()} id={filterElement.toLowerCase()} type="checkbox" className='mr-2 hover:cursor-pointer hover:bg-yellow-300'
                checked={filtersBool[index]} onChange={() => {handleCheckboxes(index)}}></input>
              <label htmlFor={filterElement.toLowerCase()} className='hover:cursor-pointer'>{filterElement}</label>
            </div>
          )
        })}
      </form>
    </div>
    
  )
}

export default function AppFilter() {
  const [sortValue, setSortValue] = useState<string>('date_applied desc')
  const [filtersBool, setFiltersBool] = useState( new Array<boolean>(filterList.length).fill(false) );

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  useEffect(() => {
    const filtersParam = params.get("filters");
    const myFiltersList = filtersParam ? JSON.parse(filtersParam) : [];
    setFiltersBool(filtersBool.map((bool:boolean, index:number) => {
      return myFiltersList.includes(filterList[index].toLowerCase());
    }))
  }, [])

  const applyFilters = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let updatedFilters = filterList.filter((filterElement, index) => {
      if (filtersBool[index]) return filterElement;
    }).map((value) => {
      return value.toLowerCase();
    });

    params.set('sort', sortValue.toString());
    updatedFilters.length !== 0 ? params.set('filters', JSON.stringify(updatedFilters)) : params.delete('filters');
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 justify-end items-end">
      <SortComponent setSort={setSortValue} />
      <div className="flex gap-2">      
        <FilterComponent filtersBool={filtersBool} setFilterBool={setFiltersBool} />
        <Button onClick={(e) => {applyFilters(e)}}
          className='px-3 flex justify-center items-center font-bold dark:text-[#333333] bg-yellow-400 dark:bg-[#FF8C42] rounded-xl hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500'>
          Apply
        </Button>
      </div>
    </div>
  )
}