import { getRequests } from '@/services/loan'
import { LoanStatus } from '@/types/loans'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function useRequests({ limit = 10 } = {}) {
  const [loading, setLoading] = useState(false) // This is state is used to show loading status instantly when user search by dni
  const [currentPage, setCurrentPage] = useState(1)
  const [dni, setDni] = useState('')
  const [loanStatus, setLoanStatus] = useState<LoanStatus | undefined>()
  const [route, setRoute] = useState<string | undefined>()
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ['requests', currentPage, dni, loanStatus, route],
    queryFn: async () => {
      return await getRequests({
        page: currentPage,
        limit,
        dni,
        status: loanStatus,
        route,
      })
    },
    placeholderData: keepPreviousData,
  })

  const requests = data?.data ?? []
  const totalRequests = data?.total_data ?? 0
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

  const filterByRoute = (route: string | undefined) => {
    setRoute(route)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setLoanStatus(undefined)
    setRoute(undefined)
  }

  const isLoading = isFetching || loading

  return {
    isError,
    error,
    isLoading,
    currentPage,
    requests,
    totalRequests,
    totalPages,
    filterByStatus,
    filterByRoute,
    searchByDni: handleSearchByDni,
    goToPage,
    resetFilters,
  }
}
