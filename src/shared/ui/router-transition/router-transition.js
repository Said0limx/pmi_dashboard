'use client';
// components/RouterTransition.tsx
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function RouterTransition() {
  return (
    <ProgressBar
      height='4px'
      color='#42BCFB'
      options={{ showSpinner: false }}
      memo
      shallowRouting
    />
  );
}
