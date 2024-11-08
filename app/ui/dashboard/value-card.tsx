'use client';
export default function ValueCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="stats-background flex flex-col w-full items-center justify-center text-center text-4xl rounded-xl 
      col-span-1 
      md:col-span-2">
      <h2 className='text-xl font-bold mb-4'>{title}</h2>
      <p className='text-lg'>{value}</p>
    </div>
  )
}