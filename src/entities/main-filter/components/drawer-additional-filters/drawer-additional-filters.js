import { CloseButton } from '@mantine/core';
import { useClickOutside, useMounted, useToggle } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

import { Title } from '@/shared/ui';

// import { CitizenColorCheckboxes } from './components/citizen-color-checkboxes/citizen-color-checkboxes';
// import { CollectiveCheckboxes } from './components/collective-checkboxes/collective-checkboxes';
import { ComplexCheckboxes } from './components/complex-checkboxes/complex-checkboxes';
// import { EmploymentCheckboxes } from './components/employment-checkboxes/employment-checkboxes';
// import { GenderCheckboxes } from './components/gender-checkboxes/gender-checkboxes';
// import { ProceduralCheckboxes } from './components/procedural-checkboxes/procedural-checkboxes';
// import { RecipientCheckboxes } from './components/recipient-checkboxes/recipient-checkboxes';
// import { RepeatabilityCheckboxes } from './components/repeatability-checkboxes/repeatability-checkboxes';
import { ToggleButtonDrawer } from './components/toggle-button-drawer';

export const DrawerAdditionalFilters = () => {
  const t = useTranslations();
  const mounted = useMounted();

  const [opened, toggleDrawer] = useToggle();
  const ref = useClickOutside(() => toggleDrawer(false));
  return (
    <div>
      <ToggleButtonDrawer toggle={toggleDrawer} />
      {mounted &&
        createPortal(
          <div
            ref={ref}
            className={`fixed w-[700px]  h-full transition-all duration-150 bottom-0 z-[1000] ${opened ? 'right-0' : '-right-full'} `}
          >
            <div className='p-5 bg-white dark:bg-main_dark_blue h-svh overflow-y-auto relative z-50'>
              <div className='flex justify-between items-center'>
                <Title size='2xl'>{t('Filterlar sozlamasi')}</Title>{' '}
                <CloseButton onClick={toggleDrawer} />
              </div>
              <div className='grid mt-5'>
                <ComplexCheckboxes />
                {/* <div className='flex flex-col gap-5'>
                  <RepeatabilityCheckboxes />
                  <ProceduralCheckboxes />
                  <GenderCheckboxes />
                  <EmploymentCheckboxes />
                  <RecipientCheckboxes />
                  <CollectiveCheckboxes />
                  <CitizenColorCheckboxes />
                </div> */}
              </div>
            </div>
          </div>,
          document.querySelector('body'),
        )}
    </div>
  );
};
