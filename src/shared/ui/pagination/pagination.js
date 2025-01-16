export const Pagination = ({ pageNumber, changePage, nextPage, previousPage, pageCount }) => {
  const items = [];
  const maxPagesToShow = 5; // Number of page buttons to display at once
  const halfRange = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(pageNumber - halfRange, 0);
  let endPage = Math.min(startPage + maxPagesToShow - 1, pageCount - 1);

  // Adjust startPage if we're near the end of the page count
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(endPage - maxPagesToShow + 1, 0);
  }

  // Add first page and ellipsis if needed
  if (startPage > 0) {
    items.push(
      <div
        key={0}
        className={`w-8 h-8 ${
          pageNumber === 0
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:text-white dark:bg-gray-400'
        } rounded-lg flex items-center justify-center cursor-pointer`}
        onClick={() => changePage(0)}
      >
        1
      </div>,
    );

    if (startPage > 1) {
      items.push(
        <div key='start-ellipsis' className='w-8 h-8 flex items-center justify-center'>
          ...
        </div>,
      );
    }
  }

  // Add page numbers
  for (let i = startPage; i <= endPage; i++) {
    items.push(
      <div
        key={i}
        className={`w-8 h-8 ${
          i === pageNumber
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:text-white dark:bg-gray-400'
        } rounded-lg flex items-center justify-center cursor-pointer`}
        onClick={() => changePage(i)}
      >
        {i + 1}
      </div>,
    );
  }

  // Add ellipsis and last page if needed
  if (endPage < pageCount - 1) {
    if (endPage < pageCount - 2) {
      items.push(
        <div key='end-ellipsis' className='w-8 h-8 flex items-center justify-center'>
          ...
        </div>,
      );
    }

    items.push(
      <div
        key={pageCount - 1}
        className={`w-8 h-8 ${
          pageNumber === pageCount - 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:text-white dark:bg-gray-400'
        } rounded-lg flex items-center justify-center cursor-pointer`}
        onClick={() => changePage(pageCount - 1)}
      >
        {pageCount}
      </div>,
    );
  }

  return (
    <div className='flex gap-2 items-center'>
      <button
        className='w-8 h-8 bg-blue-500 flex items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:bg-gray-200 dark:disabled:bg-gray-400'
        onClick={previousPage}
        disabled={pageNumber === 0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='icon icon-tabler icons-tabler-outline icon-tabler-chevron-left'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M15 6l-6 6l6 6' stroke='#fff' />
        </svg>
      </button>
      {items}
      <button
        className='w-8 h-8 bg-blue-500 flex items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:bg-gray-200 dark:disabled:bg-gray-400'
        onClick={nextPage}
        disabled={pageNumber === pageCount - 1}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='icon icon-tabler icons-tabler-outline icon-tabler-chevron-right'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M9 6l6 6l-6 6' stroke='#fff' />
        </svg>
      </button>
    </div>
  );
};
