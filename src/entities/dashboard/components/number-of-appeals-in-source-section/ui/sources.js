import SourceItem from './source-item';

const Sources = ({ data }) => {
  return (
    <div className='grid grid-cols-2 xl:grid-cols-3 1xl:grid-cols-4 gap-4 overflow-auto max-h-[385px] px-5 pb-5'>
      {data?.map((source) => (
        <SourceItem
          key={source.id}
          iconUrl={source.src_url}
          title={source.title}
          amount={source.amount}
          percent={source.percentage}
        />
      ))}
    </div>
  );
};

export default Sources;
