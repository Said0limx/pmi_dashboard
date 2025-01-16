import { api } from './api';

export const getSoatoRegions = async () => {
  const { data } = await api.get('/admin/soato/region-list');
  return data.data;
};
export const getSoatoDistricts = async (region_id) => {
  const { data } = await api.get(`/admin/soato/district-list?region_id=${region_id}`);
  return data.data;
};
