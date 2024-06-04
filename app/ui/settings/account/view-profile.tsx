export default function Profile({
  user,
}: {
  user: any;
}) {
  return (
    <div className="flex flex-col items-center">

      <div className="w-full md:w-4/5 flex flex-col md:flex-row">
        <div className="w-2/5">
          <h3 className="text-sm font-medium text-gray-400">Name</h3>
          <p className="w-fit h-4 text-base">{user.user_metadata.name}</p>
        </div>

        <hr className="h-[3px] w-full md:w-5/6 my-4 text-gray-300 md:hidden" />

        <div className="w-3/5">
          <h3 className="text-sm font-medium text-gray-400">Email</h3>
          <p className="w-fit h-4 text-base">{user.email}</p>
        </div>
      </div>

      <hr className="h-[3px] w-full md:w-5/6 my-4 text-gray-300" />

      <div className="w-full md:w-4/5 flex flex-col md:flex-row">
        <div className="w-2/5">
          <h3 className="text-sm font-medium text-gray-400">Phone</h3>
          <p className="w-fit h-4 text-base">{user.phone}</p>
        </div>

        <hr className="h-[3px] w-full md:w-5/6 my-4 text-gray-300 md:hidden" />

        <div className="w-3/5">
          <h3 className="text-sm font-medium text-gray-400">Email</h3>
          <p className="w-fit h-4 text-base">{user.email}</p>
        </div>
      </div>
      
    </div>
  )
}