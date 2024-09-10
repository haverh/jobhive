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
    <div className="h-full bg-white dark:bg-[#383838] rounded-b-xl">
      <div className="h-full w-full flex flex-col lg:flex-row">
        <SubNav />
        <div className="relative w-full h-full p-4 overflow-y-scroll">
          {task === 'view' && <Profile user={user} />}
          {task === 'edit' && <EditProfile user={user} />}
          {task === 'delete' && <DeleteAccount user_id={user.id}  />}
        </div>
      </div>
    </div>
  )
}