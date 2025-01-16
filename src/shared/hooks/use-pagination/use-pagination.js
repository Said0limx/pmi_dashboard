'use client';
import { useEffect, useState } from 'react';

function usePagination(items, pageLimit = 10) {
  const [pageNumber, setPageNumber] = useState(0);
  const [limit, setLimit] = useState(pageLimit);
  const pageCount = Math.ceil(items?.length / limit);
  useEffect(() => {
    setPageNumber(0);
  }, [limit]);
  const changePage = (pN) => {
    setPageNumber(pN);
  };

  const pageData = () => {
    const s = pageNumber * limit;
    const e = s + limit;
    return items.slice(s, e);
  };

  const nextPage = () => {
    setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
  };

  const previousPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
  };

  const start = pageNumber * limit;
  const end = start + limit;

  return {
    pageNumber,
    pageCount,
    changePage,
    pageData,
    nextPage,
    previousPage,
    pageLimit: limit,
    setLimit,
    start,
    end,
  };
}

export default usePagination;
