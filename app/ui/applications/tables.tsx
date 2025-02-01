'use client';
import { useState, useEffect } from 'react';
import AppStatus from './app-status';
import { fetchApplications } from '@/app/lib/data';
import { JobPostingButton, EditApplicationButton } from '@/app/ui/applications/buttons';
import { DeleteApplicationButton } from './delete-application';
import { Application } from '@/app/lib/definitions';
import Loading from '../loading';

const tableHeaders = ['Role', 'Company', 'Date Applied', 'Status', ''];

export default function Table({
  id,
  query,
  currentPage,
  sort,
  filters,
}: {
  id: string;
  query: string;
  currentPage: number;
  sort: string;
  filters: Array<string>;
}) {

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apps: Application[] = await fetchApplications(id, query, currentPage, sort, filters);
        setApplications(apps || []);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [id, query, currentPage, sort, filters]);

  if (loading) return <Loading />;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="application-table rounded-lg px-2 pb-2 md:pt-0">
          <div className="md:hidden">
            {applications?.map((application, index) => (
              <div
                key={index}
                className="mb-2 w-full rounded-md p-4 border border-yellow-500"
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
                    <p>{application.date_applied}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <JobPostingButton href={application.job_posting} />
                    <EditApplicationButton appId={application.id} />
                    <DeleteApplicationButton appId={application.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="application-table hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {tableHeaders.map((header, index) => {
                  return (
                    <th key={index} scope="col" className="whitespace-nowrap px-2 py-2">
                      {header}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="application-table">
              {applications?.map((application, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-2 py-3">
                    <div className="flex items-center">
                      <p>{application.role}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {application.company}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {application.date_applied}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    <AppStatus status={application.status} />
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    <div className="flex justify-end items-center gap-3">
                      <JobPostingButton href={application.job_posting} />
                      <EditApplicationButton appId={application.id} />
                      <DeleteApplicationButton appId={application.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}