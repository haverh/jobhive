'use client';
import Link from "next/link";
import { ChevronLeftIcon,
  ChevronRightIcon, 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon 
} from "@heroicons/react/24/solid"
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";


function PaginationArrow({
  type,
  href,
  disabled,
}: {
  type: string;
  href: string;
  disabled: boolean;
}) {

  const ArrowType = () => {
    if ( type === 'left' ) {
      return <ChevronLeftIcon className="h-5" />
    } else if ( type === 'right' ) {
      return <ChevronRightIcon className="h-5" />
    } else if ( type === 'start' ) {
      return <ChevronDoubleLeftIcon className="h-5" />
    } else {
      return <ChevronDoubleRightIcon className="h-5" />
    }
  }
  
  return (
    <Link href={href} className={clsx(
      'flex justify-center rounded py-2 mx-2',
      {
        'text-gray-400 pointer-events-none' : disabled,
      }
    )
    }>
      {ArrowType()}
    </Link>
  )
}

function PaginationNumber({
  page,
  totalPages,
}: {
  page: number | string;
  totalPages: number;
}) {
  return (  
    <div className="flex mx-4 ">
      <div className="flex items-center mr-1 px-2 border border-gray-500">{page}</div>
      <span>of {totalPages}</span>
    </div>
  )
}

export default function Pagination({
  totalPages,
}: {
  totalPages: number
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-center mt-4">
      <PaginationArrow type={'start'} href={createPageURL(1)} disabled={currentPage === 1} />
      <PaginationArrow type={'left'} href={createPageURL(currentPage - 1)} disabled={currentPage === 1} />
      <PaginationNumber page={currentPage} totalPages={totalPages} />
      <PaginationArrow type={'right'} href={createPageURL(currentPage + 1)} disabled={currentPage === totalPages} />
      <PaginationArrow type={'end'} href={createPageURL(totalPages)} disabled={currentPage === totalPages} />
    </div>
  )
}