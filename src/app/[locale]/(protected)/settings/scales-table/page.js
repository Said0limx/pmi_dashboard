import { ScalesTable } from '@/widgets/scales-table';

const Page = async (props) => {
  const params = await props.params;
  return (
    <div>
      <ScalesTable locale={params.locale} />
    </div>
  );
};

export default Page;
