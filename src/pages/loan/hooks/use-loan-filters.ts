import { ILoan } from '@/types/loans'
import { useState } from 'react'

export type LoanFrequency =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'yearly'

export type LoanFilters = {
  dni: string
  frequency: LoanFrequency
  route: string
}

export type LoanFrequencyWithAll = LoanFrequency | ''

export function useLoanFilters({ loans }: { loans: ILoan[] }) {
  const [dniQuery, setDniQuery] = useState('')
  const [frequencyFilter, setFrequencyFilter] =
    useState<LoanFrequencyWithAll>('')
  const [routeFilter, setRouteFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredLoans = loans.filter((loan) => {
    const dniMatch =
      loan.client.dni.toLowerCase().includes(dniQuery.toLowerCase()) ||
      dniQuery === ''
    const frequencyMatch =
      loan.payment_plan.frequency === frequencyFilter || frequencyFilter === ''
    const routeMatch =
      loan.client.route?.name === routeFilter || routeFilter === ''

    return dniMatch && frequencyMatch && routeMatch
  })

  const searchByDni = (dni: string) => {
    setDniQuery(dni)
  }

  const filterByFrequency = (frequency: LoanFrequencyWithAll) => {
    setFrequencyFilter(frequency)
  }

  const filterByRoute = (route: string) => {
    setRouteFilter(route)
  }

  const cleanFilters = () => {
    setDniQuery('')
    setFrequencyFilter('')
    setRouteFilter('')
  }

  return {
    dniQuery,
    frequencyFilter,
    routeFilter,
    filteredLoans,
    searchByDni,
    filterByFrequency,
    filterByRoute,
    cleanFilters,
  }
}
