
import AddApplication from '@/app/ui/applications/add-app';
import { createClient } from '@/utils/supabase/server';


export default async function AddApplicationPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const {id} =  data.user!;


  return (
    <div className='w-full'>
      <AddApplication id={id} />
    </div>
  )
}