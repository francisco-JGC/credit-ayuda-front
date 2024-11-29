import { deleteClientById, getClientById } from '@/services/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
