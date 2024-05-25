import { fetchApplicationById } from "@/app/lib/data";
import EditApplication from "@/app/ui/applications/edit-app";

export default async function EditPage({ params }: { params: { id: string } }) {
  const appId = params.id;
  console.log(appId);

  const application = await fetchApplicationById(appId)
  console.log(application)


  return (
    <div className='w-full'>
      <EditApplication application={application} />
    </div>
  )
}