import { PaginationItem, PaginationLink, PaginationContent, PaginationPrevious, PaginationNext, PaginationEllipsis, Pagination } from "./pagination";

interface BrowsePaginationProps {
  page: number;
  totalPages: number;
}

const BrowsePagination = ({ page, totalPages }: BrowsePaginationProps) => {
  const getPaginationItems = () => {
    const items = [];

    // Always show the first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink to="/browse" search={{ page: 1 }} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>,
    );

    // Determine the range of pages to display around the current page
    let startPage = Math.max(2, page - 1);
    let endPage = Math.min(totalPages - 1, page + 1);

    // Ensure there are at most 3 pages shown in the middle (5 items total with first, last, and two ellipses)
    if (page - 1 <= 2) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, 4);
    } else if (totalPages - page <= 2) {
      startPage = Math.max(2, totalPages - 3);
      endPage = totalPages - 1;
    }
    // Add ellipsis if there is a gap between the first page and the startPage
    if (startPage > 2) {
      items.push(<PaginationEllipsis key="startEllipse" />);
    }

    // Add the range of pages
    for (let p = startPage; p <= endPage; p++) {
      items.push(
        <PaginationItem key={p}>
          <PaginationLink to="/browse" search={{ page: p }} isActive={page === p}>
            {p}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Add ellipsis if there is a gap between the endPage and the last page
    if (endPage < totalPages - 1) {
      items.push(<PaginationEllipsis key="endEllipse" />);
    }

    // Always show the last page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink to="/browse" search={{ page: totalPages }} isActive={page === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={page === 1} to="/browse" search={{ page: page - 1 }} />
        </PaginationItem>
        {getPaginationItems()}
        <PaginationItem>
          <PaginationNext disabled={page === totalPages} to="/browse" search={{ page: page + 1 }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default BrowsePagination;
