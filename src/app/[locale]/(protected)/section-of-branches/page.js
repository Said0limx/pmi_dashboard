import BranchesList from '@/entities/section-of-branches/branches-view/branches-list';
import ByMonth from '@/entities/section-of-branches/by-month/by-month';
import ByRegions from '@/entities/section-of-branches/by-regions/by-regions';
import InitiatorsPercent from '@/entities/section-of-branches/initiators-percent/initiators-percent';
import TotalInvestments from '@/entities/section-of-branches/total-investments/total-investments';

export default function SectionOfBranches() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='grid grid-cols-2 gap-5 h-[400px]'>
        <BranchesList />
        <TotalInvestments />
      </div>
      <div className='h-[400px]'>
        <InitiatorsPercent />
      </div>
      <div className='grid grid-cols-2 gap-5 '>
        <ByMonth />
        <ByRegions />
      </div>
    </div>
  );
}
