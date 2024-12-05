import { Metadata } from "next";
import AddApplication from '@/app/ui/applications/add-app';
import { getUser } from "@/app/lib/action";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Add Application",
  },
};

export default async function AddApplicationPage() {

  const { data, error } = await getUser();
  const {id} =  data.user!;


  return (
    <div className='w-full'>
      <AddApplication id={id} />
    </div>
  )
}