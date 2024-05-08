export default function Page() {

  const temp = (amount:number) => {
    let arr = [];
    for (let i = 0; i < amount; i++) {
      arr.push(<div className="bg-blue-400 rounded-xl"></div>)
    }
    return arr;
  }

  return (
    <div className="h-full grid grid-cols-7 grid-rows-auto gap-4 p-4 xl:p-12">
      <div className="bg-blue-400 text-center text-4xl rounded-xl col-span-full row-span-3 xl:col-span-3 lg:col-span-4 sm:col-span-4 sm:row-span-1">ONE</div>
      <div className="bg-blue-400 text-center text-4xl rounded-xl col-span-3 row-span-3 xl:col-span-2 lg:col-span-3 sm:col-span-3  sm:row-span-1">TWO</div>
      <div className="bg-blue-400 text-center text-4xl rounded-xl col-span-4 row-span-3 xl:row-span-2 xl:col-span-2 lg:col-span-5 sm:col-span-4  sm:row-span-1">THREE</div>
      <div className="bg-blue-400 text-center text-4xl rounded-xl col-span-3 row-span-3 xl:col-span-2 lg:col-span-2 sm:col-span-3  sm:row-span-1">FOUR</div>
      <div className="bg-blue-400 text-center text-4xl rounded-xl col-span-4 row-span-3 xl:col-span-3 lg:col-span-7 sm:col-span-full  sm:row-span-1">FIVE</div>
    </div>
  )
}