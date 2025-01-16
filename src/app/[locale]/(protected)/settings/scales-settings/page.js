import { ScalesSettings } from '@/widgets/scales-settings';

const Page = async (props) => {
  const params = await props.params;
  return (
    <div>
      <ScalesSettings locale={params.locale} />
    </div>
  );
};

export default Page;
