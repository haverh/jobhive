import StatusRatio from '@/app/ui/dashboard/status-ratio';
import ValueCard from '@/app/ui/dashboard/value-card';
import ApplyTimeline from '@/app/ui/dashboard/apply-timelime';
import { fetchStatistics } from '@/app/lib/data';
import { StatusRatioSkeleton, ValueCardSkeleton, ApplyTimelineSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { getUser } from '@/app/lib/action';

export default async function Page() {

  const { data, error } = await getUser()
  const {id} =  data.user!;

  const {
    totalApplied,
    totalAppliedThisWeek,
    statusRatio,
    appsThisWeek,
    appsPrevWeek,
    appCountByMonth
  } = await fetchStatistics(id);



  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 p-4 xl:p-12">
      <Suspense fallback={<StatusRatioSkeleton />}>
        <StatusRatio statusratio={statusRatio} />
      </Suspense>
      <Suspense fallback={<ValueCardSkeleton />}>
        <ValueCard title={'Total Applied'} value={totalApplied} />
      </Suspense>
      <Suspense fallback={<ValueCardSkeleton />}>
        <ValueCard title={'Total Applied This Week'} value={totalAppliedThisWeek} />
      </Suspense>
      <Suspense fallback={<ApplyTimelineSkeleton />}>
        <ApplyTimeline thisWeek={appsThisWeek} prevWeek={appsPrevWeek} appCountByMonth={appCountByMonth} />
      </Suspense>
    </div>
  )
}