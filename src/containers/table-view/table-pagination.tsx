'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PAGE_SIZE_OPTIONS } from '@/constants';
import { useTable } from '@/stores';

export function TablePagination() {
  const tableRows = useTable(state => state.rows);
  const pagination = useTable(state => state.pagination);
  const setPagination = useTable(state => state.setPagination);

  const { page, limit } = pagination;
  const totalPages = Math.max(1, Math.ceil(tableRows.length / limit));

  function handlePreviousPage(): void {
    if (page > 1) {
      setPagination({ page: page - 1, limit });
    }
  }

  function handleNextPage(): void {
    if (page < totalPages) {
      setPagination({ page: page + 1, limit });
    }
  }

  function getPageNumbers() {
    const visiblePages = 3;
    const pages = [];
    const halfVisible = Math.floor(visiblePages / 2);

    let start = Math.max(1, page - halfVisible);
    let end = Math.min(totalPages, page + halfVisible);

    if (page <= halfVisible) {
      end = Math.min(totalPages, visiblePages);
    } else if (page + halfVisible >= totalPages) {
      start = Math.max(1, totalPages - visiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
    }

    if (start > 2) {
      pages.push('ellipsis-start');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    if (end < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  }

  if (tableRows.length === 0 || totalPages === 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2 py-4 w-full max-w-7xl mx-auto">
      <Select
        value={String(limit)}
        onValueChange={(value: string) => {
          setPagination({ page: 1, limit: Number(value) });
        }}
      >
        <SelectTrigger className="!w-auto">
          <SelectValue placeholder="Page size" />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZE_OPTIONS.map(key => (
            <SelectItem key={key} value={String(key)}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Pagination className="block m-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={page === 1 ? 'cursor-not-allowed' : ''}
              onClick={handlePreviousPage}
            />
          </PaginationItem>

          <div className="hidden sm:flex">
            {getPageNumbers().map((item, index) => (
              <PaginationItem key={index}>
                {item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    className={item === page ? 'bg-slate-900 text-slate-50' : ''}
                    onClick={() => typeof item === 'number' && setPagination({ page: item, limit })}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
          </div>

          <PaginationItem>
            <PaginationNext
              href="#"
              className={page === totalPages ? 'cursor-not-allowed' : ''}
              onClick={handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
