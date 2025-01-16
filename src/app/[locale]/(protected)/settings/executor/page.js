import { Executor } from '@/widgets/executor';

const Page = async (props) => {
  const params = await props.params;
  return (
    <div>
      <Executor locale={params.locale} />
    </div>
  );
};

export default Page;
