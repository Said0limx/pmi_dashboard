'use client';
import { useClickOutside } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { startTransition, useState } from 'react';

import { usePathname, useRouter } from '@/i18n/routing';
import { languages } from '@/shared/variables/languages';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setOpened] = useState(false);
  const toggle = () => setOpened((o) => !o);
  const ref = useClickOutside(() => setOpened(false));
  const params = useParams();
  // Filter out the current language from the list of languages
  const langs = Object.values(languages).filter(
    (lang) => lang.toLowerCase() !== currentLocale.toLowerCase(),
  );

  // Animation definitions
  const animationCurrentLanguage = {
    initial: { borderRadius: '6px' },
    animate: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  };

  const animationLanguageFirst = {
    initial: { opacity: 0, right: 0 },
    animate: { right: '100%', opacity: 1 },
  };

  const animationLanguageSecond = {
    initial: { opacity: 0, right: 0 },
    animate: { right: '200%', opacity: 1 },
  };

  // List of animations for languages
  const languageAnimations = [animationLanguageFirst, animationLanguageSecond];

  function onSelectChange(locale) {
    startTransition(() => {
      router.replace({ pathname, params }, { locale: locale });
    });
  }

  return (
    <motion.div
      className='relative'
      initial={false}
      animate={isOpen ? 'animate' : 'initial'}
      ref={ref}
    >
      {/* Current language button */}
      <motion.button
        onClick={() => toggle()}
        variants={animationCurrentLanguage}
        className='flex justify-center w-[42px] h-[42px] items-center p-[0.563rem] bg-white dark:bg-main_blue_3 text-main_medium_blue dark:text-white  font-medium uppercase relative z-10'
      >
        {languages[currentLocale]}
      </motion.button>

      {/* Language buttons */}
      {langs.map((lang, index) => (
        <motion.button
          key={lang}
          variants={languageAnimations[index]}
          onClick={() => onSelectChange(lang.toLowerCase())}
          className='w-[42px] h-[42px] absolute top-0 p-[0.563rem] bg-white dark:bg-main_blue_3 text-main_medium_blue dark:text-white  font-medium uppercase last:rounded-tl-md last:rounded-bl-md'
        >
          {lang}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default LanguageSwitcher;
