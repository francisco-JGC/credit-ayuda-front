import { FilterFrequency } from '@/components/filterTables/filterFrequency'
import { FilterRoute } from '@/components/filterTables/filterRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLoanFilters } from '@/hooks/use-loan-filters'
import { getPaginationLoans } from '@/services/loan'
import { ILoanTable } from '@/types/loans'
import { IPaginationResponse } from '@/utils/fetch-data'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoansTable } from './components/loans-table'

export default function LoanPage() {
  const [loans, setLoans] = useState<ILoanTable[]>([])
  const {
    filteredLoans,
    dniQuery,
    searchByDni,
    filterByFrequency,
    filterByRoute,
  } = useLoanFilters({ loans })

  useEffect(() => {
    getPaginationLoans({ page: 1, limit: 20, filter: '' }).then((response) => {
      if (response.success) {
        const { data } = response.data as IPaginationResponse<ILoanTable[]>
        setLoans(data ?? [])
      }
    })
  }, [])

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
              value={dniQuery}
            />
          </div>

          <div className="mt-2 md:mt-0 flex gap-2">
            <FilterFrequency onChangeFrequency={filterByFrequency} />
            <FilterRoute handleSetRouteFilter={filterByRoute} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <LoansTable loans={filteredLoans} />
      </div>
    </div>
  )
}
