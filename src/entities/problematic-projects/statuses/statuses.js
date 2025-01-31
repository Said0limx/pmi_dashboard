import { useGetProblemProjectStatuses } from '@/entities/dashboard/hooks';
import { ContentBox } from '@/shared/ui';

import TitleCard from './ui/title-card';

const Statuses = () => {
  const { data } = useGetProblemProjectStatuses();

  return (
    <ContentBox className='grid grid-cols-5 justify-between gap-5 p-5'>
      {data?.map((item, index) => {
        return (
          <TitleCard
            key={index}
            url={item.icon_file}
            title={item.title}
            end={item.problem_project_count}
          />
        );
      })}
    </ContentBox>
  );
};

export default Statuses;
