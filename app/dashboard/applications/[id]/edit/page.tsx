import { Metadata } from "next";
import { fetchApplicationById } from "@/app/lib/data";
import EditApplication from "@/app/ui/applications/edit-app";
import { Application } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Edit Application",
  },
};

export default async function EditPage({ params }: { params: { id: string } }) {
  const resolvedParams = await (params ?? {});

  const appId = resolvedParams.id;
  // console.log(appId);

  const app = await fetchApplicationById(appId)

  let formattedApp = app;

  if (app?.date_applied) {
    const displayDate = new Date(app.date_applied);
    
    // Calculate the time difference in milliseconds between UTC and local time
    const offsetMs = displayDate.getTimezoneOffset() * 60000;
    
    // Adjust the UTC time to the client's local time
    const localTime = new Date(displayDate.getTime() - offsetMs);
    
    // Generate the required 'YYYY-MM-DDTHH:mm' string and slice off seconds/Z
    const datetimeLocalFormat = localTime.toISOString().slice(0, 16);
    
    // Create the new object with the date field correctly formatted for the input
    formattedApp = {
        ...app,
        date_applied: datetimeLocalFormat
    };
  }
  // console.log(application)


  return (
    <div className='w-full'>
      <EditApplication application={formattedApp} />
    </div>
  )
}