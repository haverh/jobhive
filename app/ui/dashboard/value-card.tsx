'use client';
export default function ValueCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col w-full items-center justify-center bg-gray-200 text-center text-4xl rounded-xl sm:bg-yellow-200 md:bg-blue-200 lg:bg-green-200 xl:bg-red-200 2xl:bg-white
      col-span-1 
      md:col-span-2">
      <h2 className='text-lg font-bold'>{title}</h2>
      <p className='text-base'>{value}</p>
    </div>
  )
}