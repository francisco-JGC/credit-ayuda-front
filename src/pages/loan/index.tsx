import { FilterFrequency } from '@/components/filterTables/filterFrequency'
import { FilterRoute } from '@/components/filterTables/filterRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLoanFilters } from '@/pages/loan/hooks/use-loan-filters'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LoansTable } from './components/loans-table'
import { useLoans } from './hooks/use-loans'
import { LoansPagination } from './components/loans-pagination'

export default function LoanPage() {
  const {
    loans,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToPage,
    searchByDni,
    totalLoans,
  } = useLoans({ limit: 5 })
  const { filteredLoans, filterByFrequency, filterByRoute } = useLoanFilters({
    loans,
  })

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link to={'/loans/create'}>
          <Button className="w-full md:w-auto">Nuevo Prestamo</Button>
        </Link>
        <div className="flex flex-col md:flex-row justify-between gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[350px]">
            <Search
              className="text-gray-500 absolute top-0 bottom-0 my-auto left-3"
              width={19}
            />
            <Input
              placeholder="Cédula del cliente..."
              className="pl-10 w-full"
              name="search_dni"
              onChange={(e) => searchByDni(e.target.value)}
            />
          </div>
          <div className="mt-2 md:mt-0 flex gap-2">
            <FilterFrequency onChangeFrequency={filterByFrequency} />
            <FilterRoute onChangeRoute={filterByRoute} />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">
            Mostrando {loans.length} de {totalLoans} préstamos.
          </span>
        </div>
        <LoansTable isLoading={isLoading} loans={filteredLoans} error={error} />
      </div>
      <div className="flex justify-end">
        <div>
          {!isLoading && error == null && totalPages > 0 && (
            <LoansPagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
