import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { todosQueryOptions } from '../query/todosQueryOptions'
import { LIMIT } from '../constants'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface TodosPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TodosPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TodosPaginationProps) {
  //   const queryClient = useQueryClient()
  const visiblePages = Math.min(totalPages, 5)
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
  const endPage = Math.min(totalPages, startPage + visiblePages - 1)

  //   useEffect(() => {
  //     queryClient.prefetchQuery(todosQueryOptions.all(LIMIT, currentPage * LIMIT))
  //   }, [currentPage, totalPages])

  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNum = startPage + index
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(pageNum)
                  }}
                  isActive={currentPage === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
