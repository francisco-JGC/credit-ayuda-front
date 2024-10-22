const generateDaysTerm = (days: number[]): { value: number; label: string }[] =>
  days.map((day) => ({ value: day, label: `${day} días` }))

const generateWeeksTerm = (
  weeks: number[],
): { value: number; label: string }[] =>
  weeks.map((week) => ({ value: week, label: `${week} semanas` }))

const generateBiweeklyTerm = (
  biweeks: number[],
): { value: number; label: string }[] =>
  biweeks.map((biweek) => ({ value: biweek, label: `${biweek} quincenas` }))

const generateMonthsTerm = (
  months: number[],
): { value: number; label: string }[] =>
  months.map((month) => ({ value: month, label: `${month} meses` }))

const generateYearsTerm = (
  years: number[],
): { value: number; label: string }[] =>
  years.map((year) => ({ value: year, label: `${year} años` }))

export const getPaymentTermByFrequency = (
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly',
): { value: number; label: string }[] => {
  const termMap: Record<typeof frequency, { value: number; label: string }[]> =
    {
      daily: generateDaysTerm([20, 25, 30, 35, 40, 50, 70, 80, 90]),
      weekly: generateWeeksTerm([4, 6, 8, 10, 12, 16, 18]),
      biweekly: generateBiweeklyTerm([2, 4, 6, 8, 10, 12]),
      monthly: generateMonthsTerm([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
      yearly: generateYearsTerm([2, 3, 4, 5]),
    }

  return termMap[frequency] || [{ value: 0, label: '' }]
}
