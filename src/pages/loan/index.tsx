import { FilterFrequency } from '@/components/filterTables/filterFrequency'
import { FilterRoute } from '@/components/filterTables/filterRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LoanStatusFilter } from './components/loan-status-filter'
import { LoansPagination } from './components/loans-pagination'
import { LoansTable } from './components/loans-table'
import { useLoans } from './hooks/use-loans'
import { Actions } from './components/actions'

export default function LoanPage() {
  const {
    loans,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalLoans,
    goToPage,
    searchByDni,
    filterByFrequency,
    filterByRoute,
    filterByStatus,
  } = useLoans({ limit: 10 })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-medium">Préstamos</h2>
          <p className="text-sm text-muted-foreground">
            Gestión de los préstamos.
          </p>
        </div>
        <Link to={'/loans/create'}>
          <Button className="w-full md:w-auto">Nuevo Prestamo</Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
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
          <div className="flex gap-2">
            <LoanStatusFilter onChangeStatus={filterByStatus} />
            <FilterFrequency onChangeFrequency={filterByFrequency} />
            <FilterRoute onChangeRoute={filterByRoute} />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-muted-foreground place-self-end">
            Mostrando {loans.length} de {totalLoans} préstamos.
          </span>
          <div>
            <div
              className={`${
                !isLoading && error == null && loans.length > 0
                  ? 'visible'
                  : 'invisible'
              }`}
            >
              <LoansPagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
            </div>
          </div>
        </div>
        <LoansTable
          isLoading={isLoading}
          loans={loans}
          error={error}
          renderActions={(loan) => <Actions loan={loan} />}
        />
      </div>
    </div>
  )
}
