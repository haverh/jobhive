export default function Profile({
  user,
}: {
  user: any;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-4/5 flex">
        <div className="w-2/5">
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="text-base">{user.user_metadata.name}</p>
        </div>
        <div className="w-3/5">
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="w-fit text-base">{user.email}</p>
        </div>
      </div>
      <hr className="h-[3px] w-5/6 my-4 text-gray-300" />
      <div className="w-4/5 flex">
        <div className="w-2/5">
          <h3 className="text-sm font-medium text-gray-500">Phone</h3>
          <p className="text-base">{user.phone}</p>
        </div>
        <div className="w-3/5">
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="w-fit text-base">{user.email}</p>
        </div>
      </div>
      
    </div>
  )
}