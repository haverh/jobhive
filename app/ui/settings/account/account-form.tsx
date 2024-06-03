import { useSearchParams } from 'next/navigation';
import SubNav from "./settings-subnav";
import Profile from "./view-profile";
import EditProfile from './edit-profile';
import DeleteAccount from './delete-account';

export default function AccountForm({
  user,
}: {
  user: any;
}) {
  const searchParams = useSearchParams();
  const task = searchParams.get("task");

  return (
    <div className="bg-white h-full rounded-b-xl">
      <div className="h-full w-full flex">
        <SubNav />
        <div className="flex-grow p-4 overflow-y-scroll">
          {task === 'view' && <Profile user={user} />}
          {task === 'edit' && <EditProfile user={user} />}
          {task === 'delete' && <DeleteAccount />}
        </div>
      </div>
    </div>
  )
}