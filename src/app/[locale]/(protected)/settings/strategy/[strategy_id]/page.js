import { StrategyTaskView } from '@/widgets/strategy/task-view';

const Page = async (props) => {
  const params = await props.params;
  const { strategy_id, locale } = params;

  return (
    <div>
      <StrategyTaskView strategyId={strategy_id} locale={locale} />
    </div>
  );
};

export default Page;
