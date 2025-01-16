import { useSetRegionOrDistrictId } from '@/shared/hooks';
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import {
  Pagination,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableTd,
  TableTh,
} from '@/shared/ui';

const TableViewOverTheYears = ({ data, headers, areaKey }) => {
  const { handleSet } = useSetRegionOrDistrictId();
  const {
    nextPage,
    pageCount,
    pageNumber,
    changePage,
    previousPage,
    pageLimit,
    start,
    end,
    setLimit,
  } = usePagination(headers.source);

  return (
    <div>
      <TableContainer className={'max-h-[800px]'}>
        <Table>
          <TableHead className='sticky top-0 z-20 border-b'>
            <TableRow>
              <TableTh rowSpan={3} className='min-w-[60px] sticky left-0' align='center'>
                №
              </TableTh>
              <TableTh rowSpan={3} className='border-x sticky left-[60px] min-w-64' align='center'>
                Tasniflar
              </TableTh>
              {headers[areaKey].map((column) => (
                <TableTh
                  className='border-x whitespace-nowrap border-b cursor-pointer'
                  align='center'
                  colSpan={
                    Object.keys(headers.main_column_key).length *
                    Object.keys(headers.sub_column_key).length
                  }
                  onClick={() => handleSet(column.id)}
                  key={column.id}
                >
                  {column[areaKey]}
                </TableTh>
              ))}
            </TableRow>
            <TableRow>
              {headers[areaKey].map((column) => {
                return headers.main_column_key.map((mKey) => (
                  <TableTh
                    className='border-x whitespace-nowrap border-b'
                    align='center'
                    key={`${mKey}-${column.id}`}
                    colSpan={Object.keys(headers.sub_column_key).length}
                  >
                    {mKey}
                  </TableTh>
                ));
              })}
            </TableRow>
            <TableRow>
              {headers[areaKey].map((column) => {
                return headers.main_column_key.map((mKey) =>
                  Object.values(headers.sub_column_key).map((subKey) => (
                    <TableTh
                      className='border-x whitespace-nowrap border-b'
                      align='center'
                      key={`${mKey}-${column.id}-${subKey}`}
                      onClick={() => handleSet(column.id)}
                    >
                      {subKey}
                    </TableTh>
                  )),
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {headers.source.slice(start, end).map((row, index) => {
              return (
                <TableRow key={row.id} className='border-b last:border-b-0'>
                  <TableTd className='border-x whitespace-nowrap sticky left-0' align='center'>
                    {index + 1}
                  </TableTd>
                  <TableTd className='border-x  sticky left-14'>{row.source}</TableTd>
                  {data.slice(start, end)[index].map((item) =>
                    item.map((subItem) => {
                      return Object.values(subItem).map((value, iIndex) => {
                        return (
                          <TableTd
                            className='border-x whitespace-nowrap'
                            align='center'
                            key={`${row.id}-${value}-${index}-${iIndex}`}
                          >
                            {value}
                          </TableTd>
                        );
                      });
                    }),
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='mt-5 flex gap-2'>
        <Select
          className='w-32'
          value={pageLimit.toString()}
          onChange={(value) => {
            setLimit(+value);
          }}
          data={[
            { value: '10', label: '10' },
            { value: '20', label: '20' },
            { value: '30', label: '50' },
            { value: '40', label: '40' },
            { value: '50', label: '50' },
            { value: '60', label: '60' },
            { value: '70', label: '70' },
            { value: '80', label: '80' },
            { value: '90', label: '90' },
            { value: '100', label: '100' },
          ]}
        />
        <Pagination
          pageCount={pageCount}
          changePage={changePage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

export default TableViewOverTheYears;
