import {
  createRegister,
  getAllRegisters,
  updateRegister,
} from '@/services/registers'
import { CreateRegister, Register } from '@/types/registers'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useRegisters() {
  const {
    data: registers,
    isFetching: isLoading,
    error,
  } = useQuery({
    queryKey: ['registers'],
    queryFn: async () => {
      return await getAllRegisters()
    },
  })

  const sortedRegisters = [...(registers ?? [])].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )

  return {
    registers: sortedRegisters,
    isLoading,
    error,
  }
}

export function useCreateRegister() {
  const queryClient = useQueryClient()
  const {
    data: newRegister,
    mutateAsync: create,
    isPending,
  } = useMutation({
    mutationFn: async (register: CreateRegister) => {
      await createRegister(register)
      queryClient.invalidateQueries({
        queryKey: ['registers'],
      })
    },
  })

  return {
    newRegister,
    create,
    isPending,
  }
}

export function useUpdateRegister() {
  const { mutateAsync: update, isPending } = useMutation({
    mutationFn: async (register: Register) => {
      return updateRegister(register)
    },
  })

  return {
    update,
    isPending,
  }
}
