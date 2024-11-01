import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface LoansPaginationProps {
  goToPage: (page: number) => void
  currentPage: number
  totalPages: number
}

export function LoansPagination({
  goToPage,
  currentPage,
  totalPages,
}: LoansPaginationProps) {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <div className="flex flex-col items-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`hover:cursor-pointer ${
                !hasPreviousPage && 'opacity-50 hover:cursor-not-allowed'
              }`}
              onClick={goToPreviousPage}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={goToNextPage}
              className={`hover:cursor-pointer ${
                !hasNextPage && 'opacity-50 hover:cursor-not-allowed'
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <span className="text-xs text-muted-foreground">
        Página {currentPage} / {totalPages}
      </span>
    </div>
  )
}
