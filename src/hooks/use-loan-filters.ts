import { ILoanTable } from '@/types/loans'
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

export type LoanFrequencyWithAll = LoanFrequency | 'all'

export function useLoanFilters({ loans }: { loans: ILoanTable[] }) {
  const [dniQuery, setDniQuery] = useState('')
  const [frequencyFilter, setFrequencyFilter] =
    useState<LoanFrequencyWithAll>('all')
  const [routeFilter, setRouteFilter] = useState('')

  const filteredLoans = loans.filter((loan) => {
    const dniMatch =
      loan.dni.toLowerCase().includes(dniQuery.toLowerCase()) || dniQuery === ''
    const frequencyMatch =
      loan.frequency === frequencyFilter || frequencyFilter === 'all'
    const routeMatch = loan.route === routeFilter || routeFilter === ''

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

  return {
    dniQuery,
    frequencyFilter,
    routeFilter,
    filteredLoans,
    searchByDni,
    filterByFrequency,
    filterByRoute,
  }
}
