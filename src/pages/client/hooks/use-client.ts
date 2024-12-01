import {
  deleteClientById,
  getClientById,
  getPaginationClient,
} from '@/services/client'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function useClients({ limit = 10 } = {}) {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [routeFilter, setRouteFilter] = useState<string | undefined>()
  const [dni, setDni] = useState('')
  const { data, isFetching, error } = useQuery({
    queryKey: ['clients', currentPage, dni, routeFilter],
    queryFn: async () => {
      const { success, data, message } = await getPaginationClient({
        limit,
        page: currentPage,
        filter: dni,
        route: routeFilter,
      })
      if (!success) {
        throw new Error(message)
      }

      return data
    },
    placeholderData: keepPreviousData,
  })

  const clients = data?.data ?? []
  const totalClients = data?.total_data ?? 0
  const totalPages = data?.total_page ?? 0

  const debouncedSearchByDni = useDebouncedCallback((dni: string) => {
    setDni(dni)
    setLoading(false)
  }, 500)

  const searchByDni = (dni: string) => {
    setLoading(true)
    debouncedSearchByDni(dni)
  }

  const isLoading = isFetching || loading

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const filterByRoute = (route: string | undefined) => {
    setRouteFilter(route)
    setCurrentPage(1)
  }

  return {
    clients,
    currentPage,
    totalClients,
    totalPages,
    isLoading,
    error,
    searchByDni,
    goToPage,
    filterByRoute,
  }
}

export function useClient({ id }: { id: number }) {
  const { data, isFetching, error } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const response = await getClientById(id)
      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data
    },
  })

  return {
    client: data,
    isLoading: isFetching,
    error,
  }
}

export function useDeleteClient() {
  const queryClient = useQueryClient()

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: async (id: number) => {
      deleteClientById(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      })
    },
  })

  return {
    deleteClient: mutateAsync,
    isLoading: isPending,
    error,
  }
}
