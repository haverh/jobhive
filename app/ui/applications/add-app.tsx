'use client';
import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckIcon,
  XMarkIcon,
  ClockIcon, 
  ChatBubbleBottomCenterIcon,
  DocumentCheckIcon,
  } from '@heroicons/react/24/solid';
import { Application } from '@/app/lib/definitions';
import { insertApplication } from '@/app/lib/action';
import { Button } from '../button';
import Link from 'next/link';
import { hasEmptyField } from '@/app/lib/action';
import EmptyFieldError from './empty-field-error';
  
export default function AddApplication({
  id
}: {
  id: string;
}) {
  const router = useRouter();
  const date = new Date();
  const maxDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const [applicationForm, setApplicationForm] = useState<Application>({id: id, role:'', company:'', job_posting: '', date_applied: maxDate, status: 'pending'});
  const [error, setError] = useState(false);

  const addApp = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if ( await hasEmptyField(applicationForm) ) {
      setError(true);
    } else {
      setError(false);
      insertApplication(applicationForm);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {error && <EmptyFieldError setDisplay={setError} />}
      <h1 className='pl-2 text-3xl md:w-4/5 lg:w-3/5 mb-6'>Applications / Add</h1>
      <form className='app-form md:w-4/5 lg:w-3/5'>
        <div className='pl-2 mb-2'>
          <label htmlFor="role" className="block">Enter Role</label>
          <input id="role" name="role" type="text"
            className="h-8 pl-2"
            onChange={(e) => {setApplicationForm({...applicationForm, role: e.target.value})}}></input>
        </div>

        <div className='pl-2 mb-2'>
          <label htmlFor="company" className="block">Enter Company</label>
          <input id="company" name="company" type="text"
            className="h-8 pl-2"
            onChange={(e) => {setApplicationForm({...applicationForm, company: e.target.value})}}></input>
        </div>

        <div className='pl-2 mb-2'>
          <label htmlFor="job-posting" className="block">Enter Job Posting</label>
          <input id="job-posting" name="job-posting" type="text"
            className="h-8 pl-2"
            onChange={(e) => {setApplicationForm({...applicationForm, job_posting: e.target.value})}}></input>
        </div>

        <div className='pl-2 mb-4'>
          <label htmlFor="date" className="block">Enter Date</label>
          <input id="date" name="date" type="date" max={maxDate} defaultValue={maxDate}
            className="h-8 pl-2"
            onChange={(e) => {setApplicationForm({...applicationForm, date_applied: e.target.value})}}></input>
        </div>

        <div>
          <fieldset className='app-fieldset pl-2 mb-4'>
            <legend>Choose Status</legend>

            <div className="rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-[#2B2B2B] px-[14px] py-3">
              <div className=' flex flex-wrap gap-4'>
                <div className="flex items-center">
                  <input id="pending" name="status" type="radio" value="pending" defaultChecked
                    className="focus:ring-2"
                    onClick={() => setApplicationForm({...applicationForm, status: 'pending'})}/>
                  <label htmlFor="pending" className="ml-2 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium">
                    Pending <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </label>
                </div>
              

                <div className="flex items-center">
                  <input type="radio" id="rejected" name="status" value="rejected"
                    className="focus:ring-2" 
                    onClick={() => setApplicationForm({...applicationForm, status: 'rejected'})}/>
                  <label htmlFor="rejected" className="ml-2 bg-red-200 dark:bg-red-900 px-3 py-1.5 text-xs font-medium">
                    Rejected<XMarkIcon className='w-4 h-4 text-red-600 dark:text-red-400'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="interviewed" name="status" value="interviewed"
                    className="focus:ring-2" 
                    onClick={() => setApplicationForm({...applicationForm, status: 'interviewed'})}/>
                  <label htmlFor="interviewed" className="ml-2 bg-yellow-200 dark:bg-yellow-900 px-3 py-1.5 text-xs font-medium">
                    Interviewed<ChatBubbleBottomCenterIcon className='w-4 h-4 text-yellow-600 dark:text-yellow-400'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="offered" name="status" value="offered"
                    className="focus:ring-2"
                    onClick={() => setApplicationForm({...applicationForm, status: 'offered'})} />
                  <label htmlFor="offered" className="ml-2 bg-blue-200 dark:bg-blue-900 px-3 py-1.5 text-xs font-medium">
                    Offered<DocumentCheckIcon className='w-4 h-4 text-blue-600 dark:text-blue-400'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="accepted" name="status" value="accepted"
                    className="border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
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
        <Button className='bg-gray-300 dark:bg-[#2C2C2C] px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#333333] active:bg-gray-400 mr-4'
          onClick={() => router.back()}>Cancel</Button>
        <Button className='font-bold dark:text-[#333333] bg-yellow-400 dark:bg-[#FF8C42] px-3 py-2 rounded-lg hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500'
          onClick={(e) => {addApp(e)}}>Add Application</Button>
      </div>
    </div>
  )
}