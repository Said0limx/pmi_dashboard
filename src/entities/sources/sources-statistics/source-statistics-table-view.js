'use client';
import {
  LoadingOverlay,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableTd,
  TableTh,
} from '@/shared/ui';

const SourceStatisticsTableView = ({ data: { data = [], headers = {} } = {}, isFetching }) => {
  return (
    <LoadingOverlay isLoading={isFetching} className={'rounded-xl overflow-hidden mt-5'}>
      <TableContainer className={'max-h-[600px] overflow-y-auto'}>
        <Table>
          <TableHead className='sticky top-0 z-20'>
            <TableRow>
              <TableTh className='min-w-[60px] border-b sticky left-0' align='center'>
                №
              </TableTh>
              <TableTh
                className='whitespace-nowrap border-b border-x sticky left-[60px]'
                align='center'
              >
                Manba
              </TableTh>
              {Object.keys(headers?.main_column_key || {}).map((column) => (
                <TableTh
                  className='whitespace-nowrap border-b border-x'
                  align='center'
                  key={column}
                >
                  {headers?.main_column_key[column]}
                </TableTh>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {headers.source?.map((row, index) => (
              <TableRow key={row.source}>
                <TableTd className='border-b sticky left-0' align='center'>
                  {index + 1}
                </TableTd>
                <TableTd className='border-x border-b whitespace-nowrap sticky left-[60px]'>
                  {row.source}
                </TableTd>
                {Object.keys(data[index] || {}).map((column) => (
                  <TableTd className='border-x border-b' align='center' key={column}>
                    {data[index][column]}
                  </TableTd>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LoadingOverlay>
  );
};

export default SourceStatisticsTableView;
