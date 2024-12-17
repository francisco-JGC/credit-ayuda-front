import { LoansTable } from '@/pages/loan/components/loans-table'
import { RequestsActions } from '../components/requests-actions'
import { useRequests } from '../hooks/use-requests'
// // import { LoansPagination } from '@/pages/loan/components/loans-pagination'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { FilterFrequency } from '@/components/filterTables/filterFrequency'
import { FilterRoute } from '@/components/filterTables/filterRoute'

export function RequestsPage() {
  const {
    requests,
    error,
    isLoading,
    totalRequests,
    // // currentPage,
    // // totalPages,
    // // goToPage,
    searchByDni,
    filterByFrequency,
    filterByRoute,
  } = useRequests()

  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-medium">Solicitudes</h1>
        <p className="text-sm text-muted-foreground">
          {totalRequests} solicitud/es.
        </p>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="relative w-full md:w-[350px]">
          <Search
            className="text-gray-500 absolute top-0 bottom-0 my-auto left-3"
            width={19}
          />
          <Input
            placeholder="Nombre del cliente..."
            className="pl-10 w-full"
            name="search_dni"
            onChange={(e) => searchByDni(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <FilterFrequency onChangeFrequency={filterByFrequency} />
          <FilterRoute onChangeRoute={filterByRoute} />
        </div>
      </div>

      {/* <div className="w-full flex justify-end">
        <LoansPagination
          currentPage={currentPage}
          goToPage={goToPage}
          totalPages={totalPages}
        />
      </div> */}

      <div className="mt-4">
        <LoansTable
          error={error}
          isLoading={isLoading}
          loans={requests}
          renderActions={(request) => <RequestsActions request={request} />}
        />
      </div>
    </div>
  )
}
