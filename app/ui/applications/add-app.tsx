import { 
  CheckIcon,
  XMarkIcon,
  ClockIcon, 
  ChatBubbleBottomCenterIcon,
  DocumentCheckIcon,} from '@heroicons/react/24/solid';
  
export default function AddApplication() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='pl-2 text-3xl md:w-4/5 lg:w-3/5 mb-6'>Applications / Add</h1>
      <form className='md:w-4/5 lg:w-3/5'>
        <div className='pl-2 mb-4'>
          <label htmlFor="title" className="block">Enter Role</label>
          <input id="title" name="title" type="text"
            className="h-8 pl-2 border border-black w-full rounded-md focus:outline-yellow-500"></input>
        </div>

        <div className='pl-2 mb-4'>
          <label htmlFor="company" className="block">Enter Company</label>
          <input id="company" name="company" type="text"
            className="h-8 pl-2 border border-black w-full rounded-md focus:outline-yellow-500"></input>
        </div>

        <div className='pl-2 mb-4'>
          <label htmlFor="job-posting" className="block">Enter Job Posting</label>
          <input id="job-posting" name="job-posting" type="text"
            className="h-8 pl-2 border border-black w-full rounded-md focus:outline-yellow-500"></input>
        </div>

        <div className='pl-2 mb-4'>
          <label htmlFor="date" className="block">Enter Date</label>
          <input id="date" name="date" type="date"
            className="h-8 pl-2 border border-black w-full rounded-md focus:outline-yellow-500"></input>
        </div>

        <div>
          <fieldset className='pl-2 mb-4'>
            <legend>Choose Status</legend>

            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className=' flex flex-wrap gap-4' >
                <div className="flex items-center">
                  <input id="pending" name="status" type="radio" value="pending"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"/>
                  <label htmlFor="pending" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    Pending <ClockIcon className="h-4 w-4 text-gray-500" />
                  </label>
                </div>
              

                <div className="flex items-center">
                  <input type="radio" id="rejected" name="status" value="rejected"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" />
                  <label htmlFor="rejected" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    Rejected<XMarkIcon className='w-4 h-4 text-red-500'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="interviewed" name="status" value="interviewed"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" />
                  <label htmlFor="interviewed" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    Interviewed<ChatBubbleBottomCenterIcon className='w-4 h-4 text-yellow-500'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="offered" name="status" value="offered"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" />
                  <label htmlFor="offered" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    Offered<DocumentCheckIcon className='w-4 h-4 text-blue-500'/>
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" id="accepted" name="status" value="accpeted"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" />
                  <label htmlFor="accepted" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    Accepted<CheckIcon className='w-4 h-4 text-green-500'/>
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        
      </form>
      <div className='flex justify-end md:w-3/5'>
        <button className='bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 mr-4'>Cancel</button>
        <button className='bg-yellow-400 px-3 py-2 rounded-lg hover:bg-yellow-500'>Add Application</button>
      </div>
    </div>
  )
}