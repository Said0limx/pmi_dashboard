import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const SelectedCatalogListSelect = ({ catalog, selected, setSelected, data }) => {
  return (
    <Select
      className='mt-5'
      label={catalog?.label}
      placeholder={catalog?.label}
      data={enumsMapper(data, {
        labelKey:
          catalog?.value === '10' || catalog?.value === '11' || catalog?.value === '12'
            ? 'name'
            : 'title',
      })}
      value={String(selected?.id)}
      onChange={(value) => {
        setSelected(data.find((item) => item.id === Number(value)));
      }}
    />
  );
};

export default SelectedCatalogListSelect;
