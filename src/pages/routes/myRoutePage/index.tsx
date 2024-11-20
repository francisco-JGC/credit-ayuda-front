import { FilterFrequency } from '@/components/filterTables/filterFrequency'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoanStatusFilter } from '@/pages/loan/components/loan-status-filter'
import { LoansPagination } from '@/pages/loan/components/loans-pagination'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMyRoute } from './hooks/useMyRoute'
import { LayuotPage } from '@/components/layuotPage'
import { MyRouteLoanTable } from './components/myRouteLoanTable'

export default function MyRoutePage() {
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
    filterByStatus,
  } = useMyRoute({ limit: 20 })

  return (
    <LayuotPage title='Mi Ruta' description='Clientes establecidos en tu ruta'>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Link to="/loans/create" className="w-full md:w-auto">
            <Button className="w-full md:w-auto">Nuevo Préstamo</Button>
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
                placeholder="Nombre del cliente..."
                className="pl-10 w-full"
                name="search_dni"
                onChange={(e) => searchByDni(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <LoanStatusFilter onChangeStatus={filterByStatus} />
              <FilterFrequency onChangeFrequency={filterByFrequency} />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex flex-col sm:flex-row justify-between gap-2">
            <span className="text-sm text-muted-foreground place-self-start sm:place-self-end">
              Mostrando {loans.length} de {totalLoans} préstamos.
            </span>
            <div
              className={`${!isLoading && error == null && loans.length > 0
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

          <MyRouteLoanTable
            isLoading={isLoading}
            loans={loans}
            error={error}
          />
        </div>
      </div>
    </LayuotPage>
  )
}