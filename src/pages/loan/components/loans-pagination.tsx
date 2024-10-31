import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
  const pagesAsNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
  const goToPreviousPage = () => goToPage(currentPage - 1)
  const goToNextPage = () => goToPage(currentPage + 1)
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <Pagination>
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious
              className="hover:cursor-pointer"
              onClick={goToPreviousPage}
            />
          </PaginationItem>
        )}
        {pagesAsNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              className="hover:cursor-pointer"
              isActive={pageNumber === currentPage}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              onClick={goToNextPage}
              className="hover:cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
