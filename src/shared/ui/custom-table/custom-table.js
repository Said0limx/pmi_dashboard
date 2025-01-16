import { classNames } from '@/shared/utils';

import CustomTableTbody from './custom-table-tbody';
import CustomTableThead from './custom-table-thead';

export const CustomTable = ({
  theadColumns = [],
  columns = [],
  data = [],
  className = '',
  rowClassName = '',
  dataKey = 'id',
}) => {
  return (
    <div className='overflow-auto w-full rounded-xl'>
      <table className={classNames(className, 'w-full table')}>
        <CustomTableThead theadColumns={theadColumns} />
        <CustomTableTbody
          data={data}
          dataKey={dataKey}
          rowClassName={rowClassName}
          columns={columns}
        />
      </table>
    </div>
  );
};
