import Table from "@/app/ui/applications/tables"
import AppSearch from "@/app/ui/applications/app-search"
import AddApplicationButton from "@/app/ui/applications/add-app-button"

export default function Page() {
  return(
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <h1 className='pl-2 text-3xl mb-6'>Applications</h1>
        <div className="flex flex-col align-center justify-between lg:flex-row">
          <AppSearch/>
          <AddApplicationButton/>
        </div>
        <Table/>
      </div>
    </div>
  )
}