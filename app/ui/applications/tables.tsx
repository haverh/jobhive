import {applications} from '@/app/lib/placeholder-data.js';
import { 
  CheckIcon,
  XMarkIcon,
  ClockIcon, 
  ChatBubbleBottomCenterIcon,
  DocumentCheckIcon,
  ArrowTopRightOnSquareIcon,  
  PencilSquareIcon,
  TrashIcon } from '@heroicons/react/24/solid';
import AppStatus from './app-status';
import { fetchApplications } from '@/app/lib/action';
import { EditApplicationButton, DeleteApplicationButton } from '@/app/ui/applications/buttons';
import Link from 'next/link';


const statusIcon = (status:string) => {
  switch(status) {
    case 'rejected': return <p className='bg-gray-200'>Rejected<XMarkIcon className='w-6 h-6 text-[red]'/></p>;
    case 'accepted': return <div><p className='name'>Accepted</p><CheckIcon className='w-6 h-6 text-[green]'/></div>;
    case 'offered': return <div><p>Offered</p><DocumentCheckIcon className='w-6 h-6'/></div>;
    case 'interviewed': return <div><p>Interviewed</p><ChatBubbleBottomCenterIcon className='w-6 h-6'/></div>;
    default: return <div><p>Pending</p><ClockIcon className='w-6 h-6 text-yellow-500'/></div>;
  }
}

const tableHeaders = ['Role', 'Company', 'Date Applied', 'Status', ' ', ' '];

export default async function Table({
  query,
  currentPage,
  sort,
  filters,
}: {
  query: string;
  currentPage: number;
  sort: string;
  filters: Array<string>;
}) {
  console.log()
  console.log("QUERY => ", query);
  console.log("CURRENT PAGE => ", currentPage);
  console.log("SORT => ", sort);
  console.log("FILTERS => ", filters);

  const applications2 = await fetchApplications(query, currentPage, sort, filters);

  return (
    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
      <div className="md:hidden">
        {applications2?.map((application, index) => (
          <div
            key={index}
            className="mb-2 w-full rounded-md bg-white p-4 border border-[red]"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <p className='font-medium'>{application.role}</p>
                </div>
                <p className="text-sm text-gray-500">{application.company}</p>
              </div>
              <AppStatus status={application.status} />
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <a target='_blank' href={application.job_posting}>
                  <ArrowTopRightOnSquareIcon className='w-5 h-5 text-blue-500' />
                </a>
                <p>{application.date_applied}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button className='mr-2'><PencilSquareIcon className='w-5 h-5' /></button>
                  <button><TrashIcon className='w-5 h-5' /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            {tableHeaders.map((header, index) => {
              return (
                <th key={index} scope="col" className="whitespace-nowrap px-3 py-3">
                  {header}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="bg-white">
          {applications2?.map((application, index) => (
            <tr
              key={index}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap px-3 py-3">
                <div className="flex items-center gap-3">
                  <p>{application.role}</p>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {application.company}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {application.date_applied}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <AppStatus status={application.status} />
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <a target="_blank" href={application.job_posting}>
                  <ArrowTopRightOnSquareIcon className='w-5 h-5 text-blue-500' />
                </a>
                
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <EditApplicationButton appId={application.id} />
                  <DeleteApplicationButton appId={application.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}