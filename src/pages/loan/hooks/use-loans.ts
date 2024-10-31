import { getPaginationLoans } from '@/services/loan'
import { ILoan } from '@/types/loans'
import { IPaginationResponse } from '@/utils/fetch-data'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function useLoans({ limit = 10 } = {}) {
  const [loading, setLoading] = useState(false) // This is state is used to show loading status instantly when user search by dni
  const [currentPage, setCurrentPage] = useState(1)
  const [dni, setDni] = useState('')

  const { data, isError, error, isFetching } = useQuery({
    queryKey: ['loans', currentPage, dni],
    queryFn: async () => {
      const response = await getPaginationLoans({
        page: currentPage,
        limit,
        filter: dni,
      })
      if (!response.success) {
        throw new Error(response.message)
      }
      const data = response.data as IPaginationResponse<ILoan[]>
      return data
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

  const isLoading = isFetching || loading

  return {
    isError,
    error,
    isLoading,
    currentPage,
    loans,
    totalLoans,
    totalPages,
    searchByDni: handleSearchByDni,
    goToPage,
  }
}
