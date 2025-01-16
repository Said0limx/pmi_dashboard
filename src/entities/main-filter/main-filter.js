'use client';
import { CloseButton } from '@mantine/core';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import ClassifierTypeSelect from '@/entities/main-filter/components/fields/classifier-type-select';
import ReportCategorySelect from '@/entities/main-filter/components/fields/report-category-select';
import ReportTypeSelect from '@/entities/main-filter/components/fields/report-type-select';
import { useFilterToggleStore } from '@/shared/store/use-filter-toggle-store';
import { Title } from '@/shared/ui';
import GraphicViewTabs from '@/shared/ui/graphic-view-tabs/graphic-view-tabs';
import ReportViewTabs from '@/shared/ui/report-view-tabs/report-view-tabs';

import { AdditionalFilterFields } from './components/additional-filter-fields';
import AreaFields from './components/area-fields/area-fields';
import ClassificationFields from './components/classification-fields/classification-fields';
import AuthorityTerritorialitySelect from './components/fields/authority-territoriality-select';
import OrganizationsSelect from './components/fields/organizations-select';
import SourceSelect from './components/fields/source-select';
import TerritoryTypeSelect from './components/fields/territory-type-select';
import { PeriodFilterFields } from './components/period-filter-fields';
import { ToggleButton } from './ui/toggle-button';
const MainFilter = () => {
  const { toggle, opened } = useFilterToggleStore();
  const t = useTranslations();

  return (
    <>
      <ToggleButton opened={opened} toggle={toggle} />
      <motion.div
        className='bg-white dark:bg-main_blue_5'
        initial={{ width: 270, height: 'inherit' }}
        animate={
          opened
            ? {
                opacity: 1,
                right: 20,
                position: 'fixed',
                width: 270,
                zIndex: 100,
                height: 'inherit',
                borderRadius: 12,
                overflowY: 'auto',
              }
            : {
                opacity: 0,
                width: 270,
                right: -500,
                height: 'inherit',
                position: 'fixed',
                borderRadius: 12,
              }
        }
      >
        <div className='pb-2'>
          <div className='flex justify-between bg-white dark:bg-main_blue_5 items-center px-5 py-2 sticky top-0 bg-inherit z-20'>
            <Title>{t('Filter')}</Title>
            <CloseButton onClick={toggle} />
          </div>
          <div className='flex flex-col gap-2 mb-4 px-5 pb-5'>
            <ReportViewTabs />
            <GraphicViewTabs />
            <ReportTypeSelect />
            <ReportCategorySelect />
            <ClassifierTypeSelect />
            <OrganizationsSelect />
            <TerritoryTypeSelect />
            <AuthorityTerritorialitySelect />
            <ClassificationFields />
            <PeriodFilterFields />
            <AreaFields />
            <SourceSelect />
            <AdditionalFilterFields />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MainFilter;
