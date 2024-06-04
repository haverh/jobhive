import { Button } from "../../button";

export default function EditProfile({
  user,
}: {
  user: any;
}) {
  return (
    <form className="flex flex-col items-center">

      <div className="w-full max-w-[500px] flex flex-col gap-2 md:flex-row">
        <div className="w-full md:w-2/5">
          <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
          <input type="text" id="name" name="name" className="w-full h-8 text-base rounded-xl" defaultValue={user.user_metadata.name}></input>
        </div>

        <hr className="h-[3px] w-full md:w-5/6 my-2 text-gray-300 md:hidden" />

        <div className="w-full md:w-3/5">
          <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
          <input type="text" id="email" name="email" className="w-full h-8 text-base rounded-xl" defaultValue={user.email}></input>
        </div>
      </div>

      <hr className="h-[3px] w-full md:w-5/6 my-2 text-gray-300" />

      <div className="w-full max-w-[500px] flex flex-col gap-2 md:flex-row">
        <div className="w-full md:w-2/5">
          <label htmlFor="phone" className="text-sm font-medium text-gray-400">Phone</label>
          <input type="text" id="phone" name="phone" className="w-full h-8 text-base rounded-xl" defaultValue={user.phone}></input>
        </div>

        <hr className="h-[3px] w-full md:w-5/6 my-2 text-gray-300 md:hidden" />

        <div className="w-full md:w-3/5">
          <label htmlFor="something" className="text-sm font-medium text-gray-400">Something</label>
          <input type="text" id="something" name="something"  className="w-full h-8 text-base rounded-xl" defaultValue={'Some Value'}></input>
        </div>
      </div>
      
      <div className="w-full max-w-[500px] flex justify-center">
        <Button className="w-full px-3 py-2 mt-4 bg-yellow-400 rounded-xl hover:bg-yellow-300 active:bg-yellow-500"
          >
          Update
        </Button>
      </div>

    </form>
  )
}