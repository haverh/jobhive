import { Button } from "../../button";

export default function EditProfile({
  user,
}: {
  user: any;
}) {
  return (
    <form className="flex flex-col items-center">
      <div className="w-4/5 flex gap-2">
        <div className="w-2/5">
          <label htmlFor="name" className="text-sm font-medium text-gray-500">Name</label>
          <input type="text" id="name" name="name" className="w-full text-base" defaultValue={user.user_metadata.name}></input>
        </div>
        <div className="w-3/5">
          <label htmlFor="email" className="text-sm font-medium text-gray-500">Email</label>
          <input type="text" id="email" name="email" className="w-full text-base" defaultValue={user.email}></input>
        </div>
      </div>
      <hr className="h-[3px] w-5/6 my-4 text-gray-300" />
      <div className="w-4/5 flex gap-2">
        <div className="w-2/5">
          <label htmlFor="phone" className="text-sm font-medium text-gray-500">Phone</label>
          <input type="text" id="phone" name="phone" className="w-full text-base" defaultValue={user.phone}></input>
        </div>
        <div className="w-3/5">
          <label htmlFor="something" className="text-sm font-medium text-gray-500">Something</label>
          <input type="text" id="something" name="something"  className="w-full text-base" defaultValue={'Some Value'}></input>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button className="px-3 py-2 mt-4 bg-yellow-400 rounded-xl hover:bg-yellow-300 active:bg-yellow-500"
          >
          Update
        </Button>
      </div>

    </form>
  )
}