export const enumsMapper = (data = [], { valueKey = 'id', labelKey = 'name' } = {}) => {
  if (!data?.length) return [];
  return data?.map(({ [valueKey]: value, [labelKey]: label, ...rest }) => ({
    ...rest,
    value: value?.toString(),
    label: label?.toString(),
  }));
};
