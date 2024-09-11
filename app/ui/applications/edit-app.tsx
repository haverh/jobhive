'use client';
import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import { Application } from '@/app/lib/definitions';
import { 
  CheckIcon,
  XMarkIcon,
  ClockIcon, 
  ChatBubbleBottomCenterIcon,
  DocumentCheckIcon,} from '@heroicons/react/24/solid';
import { updateApplication } from "@/app/lib/action";
import { Button } from '../button';

export default function EditApplication({ application }: { application: Application }) {
  const [applicationForm, setApplicationForm] = useState<Application>(application);
  const maxDate = new Date().toISOString().split("T")[0];

  const updateApplicationEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if ( (JSON.stringify(application) === JSON.stringify(applicationForm)) ) {
      console.log("ERROR: NO VALUES HAVE BEEN MODIFIED");
    } else if ( Object.values(applicationForm).some(value => value.trim() === '') ) {
      console.log("THERE ARE SOME MISSING FIELDS THAT NEED TO BE FILLED");
    } else {
      console.log("COMMENCING UPDATE WITH DATA", applicationForm);
      updateApplication(applicationForm);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='pl-2 text-3xl md:w-4/5 lg:w-3/5 mb-6'>Applications / Edit</h1>
      <form className='app-form md:w-4/5 lg:w-3/5'>
        <div className='pl-2 mb-4'>
          <label htmlFor="role" className="block">Role</label>
          <input id="role" name="role" type="text"
            className="h-8 pl-2 border border-black w-full rounded-md focus:outline-yellow-500"
            placeholder={application.role}
            defaultValue={application.role}
            onChange={(e) => {setApplicationForm({...applicationForm, role: e.target.value})}}></input>
        </div>

        <div className='pl-2 mb-4'>
          <label htmlFor="company" className="block">Company</label>
          <input id="company" name="company" type="text"
            className="h-8 pl-2 border border-black w-full rounded-md focus:outline-yellow-500"
            placeholder={application.company}
            defaultValue={application.company}
            onChange={(e) => {setApplicationForm({...applicationForm, company: e.target.value})}}></input>
        </div>

        <div className='pl-2 mb-4'>
          <label htmlFor="job-posting" className="block">Job Posting</label>
          <input id="job-posting" name="job-posting" type="text"
            className="h-8 pl-2 border border-black w-full rounded-md focus:outline-yellow-500"
            placeholder={application.job_posting}
            defaultValue={application.job_posting}
            onChange={(e) => {setApplicationForm({...applicationForm, job_posting: e.target.value})}}></input>
        </div>

        <div className='pl-2 mb-4'>
          <label htmlFor="date" className="block">Date</label>
          <input id="date" name="date" type="date" max={maxDate}
            className="h-8 pl-2 border border-black w-full rounded-md focus:outline-yellow-500"
            placeholder={application.date_applied}
            defaultValue={application.date_applied}
            onChange={(e) => {setApplicationForm({...applicationForm, date_applied: e.target.value})}}></input>
        </div>

        <div>
          <fieldset className='app-fieldset pl-2 mb-4'>
            <legend>Status</legend>

            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className=' flex flex-wrap gap-4' >
                <div className="flex items-center">
                  <input id="pending" name="status" type="radio" value="pending"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    defaultChecked={application.status === 'pending'}
                    onClick={() => setApplicationForm({...applicationForm, status: 'pending'})} />
                  <label htmlFor="pending" className="ml-2 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium">
                    Pending <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </label>
                </div>  
              

                <div className="flex items-center">
                  <input type="radio" id="rejected" name="status" value="rejected"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    defaultChecked={application.status === 'rejected'}
                    onClick={() => setApplicationForm({...applicationForm, status: 'rejected'})} />
                  <label htmlFor="rejected" className="ml-2 bg-red-200 dark:bg-red-900 px-3 py-1.5 text-xs font-medium">
                    Rejected<XMarkIcon className='w-4 h-4 text-red-600 dark:text-red-400'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="interviewed" name="status" value="interviewed"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    defaultChecked={application.status === 'interviewed'}
                    onClick={() => setApplicationForm({...applicationForm, status: 'interviewed'})} />
                  <label htmlFor="interviewed" className="ml-2 bg-yellow-200 dark:bg-yellow-900 px-3 py-1.5 text-xs font-medium">
                    Interviewed<ChatBubbleBottomCenterIcon className='w-4 h-4 text-yellow-600 dark:text-yellow-400'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="offered" name="status" value="offered"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    defaultChecked={application.status === 'offered'}
                    onClick={() => setApplicationForm({...applicationForm, status: 'offered'})} />
                  <label htmlFor="offered" className="ml-2 bg-blue-200 dark:bg-blue-900 px-3 py-1.5 text-xs font-medium">
                    Offered<DocumentCheckIcon className='w-4 h-4 text-blue-600 dark:text-blue-400'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="accepted" name="status" value="accepted"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    defaultChecked={application.status === 'accepted'}
                    onClick={() => setApplicationForm({...applicationForm, status: 'accepted'})} />
                  <label htmlFor="accepted" className="ml-2 bg-green-200 dark:bg-green-900 px-3 py-1.5 text-xs font-medium">
                    Accepted<CheckIcon className='w-4 h-4 text-green-600 dark:text-green-400'/>
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        
      </form>
      <div className='flex justify-end md:w-3/5'>
        <Link href='/dashboard/applications' className='bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-200 active:bg-gray-400 mr-4'>Cancel</Link>
        <Button className='bg-yellow-400 px-3 py-2 rounded-lg hover:bg-yellow-300 active:bg-yellow-500'
          onClick={(e) => updateApplicationEvent(e)}>Update Application</Button>
      </div>
    </div>
  )
}