import { useMemo, useState } from 'react';

const useSort = ({ data = [], sortStates = {} } = {}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortType, setSortState] = useState(null);
  const [sortedData, setSortedData] = useState([]);

  const sort = (key) => {
    if (key !== sortKey) {
      setSortKey(key);
      setSortState('asc');
      return;
    }
    if (sortKey && sortType === 'desc') {
      setSortKey(null);
      setSortState(null);
    } else if (sortKey && sortType === 'asc') {
      setSortKey(key);
      setSortState('desc');
    } else {
      setSortKey(key);
      setSortState('asc');
    }
  };
  const key = sortKey || sortStates?.sortKey;
  const type = sortType || sortStates?.sortType;
  useMemo(() => {
    if (data.length > 0) {
      setSortedData(
        [...data].sort((a, b) => {
          if (type === 'asc') {
            return a[key] > b[key] ? 1 : -1;
          } else {
            return a[key] < b[key] ? 1 : -1;
          }
        }),
      );
    }
  }, [data, key, type]);

  return { sortKey, sortType, sort, sortedData: key ? sortedData : data };
};

export default useSort;
