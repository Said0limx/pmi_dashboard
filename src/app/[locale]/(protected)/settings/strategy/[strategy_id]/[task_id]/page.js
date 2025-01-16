import { StrategyTaskItemView } from '@/widgets/strategy/task-item-view';

const Page = async (props) => {
  const params = await props.params;
  return (
    <div>
      <StrategyTaskItemView taskId={params.task_id} locale={params.locale} />
    </div>
  );
};

export default Page;
