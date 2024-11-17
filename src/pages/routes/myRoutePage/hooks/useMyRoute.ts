import { getLoansByRouteUser } from '@/services/loan'
import { LoanStatus } from '@/types/loans'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { LoanFrequency } from '@/pages/loan/hooks/use-loan-filters'

export function useMyRoute({ limit = 20 } = {}) {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [dni, setDni] = useState('')
  const [loanStatus, setLoanStatus] = useState<LoanStatus | undefined>()
  const [frequency, setFrequency] = useState<LoanFrequency | undefined>()
  const [route, setRoute] = useState<string | undefined>()
  const { data, isError, error, isFetching } = useQuery({
    queryKey: [
      'my-route-loans',
      currentPage,
      dni,
      loanStatus,
      frequency,
      route,
    ],
    queryFn: async () => {
      return await getLoansByRouteUser({
        page: currentPage,
        limit,
        dni,
        status: loanStatus,
        frequency,
        route,
      })
    },
    placeholderData: keepPreviousData,
  })

  const loans = data?.data ?? []
  const totalLoans = data?.total_data ?? 0
  const totalPages = data?.total_page ?? 0

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const searchByDni = useDebouncedCallback((dni: string) => {
    setDni(dni)
    setLoading(false)
  }, 500)

  const handleSearchByDni = (dni: string) => {
    setLoading(true)
    searchByDni(dni)
  }

  const filterByStatus = (status: LoanStatus | undefined) => {
    setLoanStatus(status)
    setCurrentPage(1)
  }

  const filterByFrequency = (frequency: LoanFrequency | undefined) => {
    setFrequency(frequency)
    setCurrentPage(1)
  }

  const filterByRoute = (route: string | undefined) => {
    setRoute(route)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setLoanStatus(undefined)
    setFrequency(undefined)
    setRoute(undefined)
  }

  const isLoading = isFetching || loading

  return {
    isError,
    error,
    isLoading,
    currentPage,
    loans,
    totalLoans,
    totalPages,
    filterByStatus,
    filterByFrequency,
    filterByRoute,
    searchByDni: handleSearchByDni,
    goToPage,
    resetFilters,
  }
}
