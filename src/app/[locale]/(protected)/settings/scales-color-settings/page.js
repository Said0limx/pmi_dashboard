'use client';

import { ScaleColorSettingsForm } from '@/entities/settings/scale-color-settings/scale-color-settings-form';
import { ScaleColorSettingsHeader } from '@/entities/settings/scale-color-settings/scale-color-settings-header';

const ScalesColorSettings = () => {
  return (
    <div>
      <ScaleColorSettingsHeader />
      <ScaleColorSettingsForm />
    </div>
  );
};

export default ScalesColorSettings;
