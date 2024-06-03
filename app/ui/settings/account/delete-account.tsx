import { Button } from "../../button"
import clsx from "clsx"


export default function DeleteAccount() {
  return (
    <div>
      <h1 className="font-bold text-xl">Delete Your Account</h1>
      <h2 className="text-base">To delete your account, type the text below in the input box and submit.</h2>
      <p className="bg-gray-200 text-sm">&quot;Delete My JobHive Account&quot;</p>
      <form className="flex flex-col">
        <label htmlFor="confirmText">Confirm Deletion</label>
        <input type="text" id="confirmText" name="confirmText"></input>
        <Button disabled={true} className={clsx(
        "px-3 py-2 mt-4 bg-yellow-100 rounded-xl",
        {
          "bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500" : false
        }
        )}>
          Delete Account
        </Button>
      </form>
    </div>
  )
}