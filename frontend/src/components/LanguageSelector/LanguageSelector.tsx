import React, { memo } from 'react';
import { useRouter } from 'next/router';
import { Variants, Transition } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';
import { Option } from './styled/Option';

interface LanguageSelectorProps {
  variants?: Variants;
  transition?: Transition;
}

export const LanguageSelector = memo<LanguageSelectorProps>(props => {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  const { ...rest } = props;

  const changeLocale = (loc: string) => {
    router.replace(asPath, asPath, { locale: loc });
  };

  return (
    <>
      <Wrapper {...rest}>
        {locales.map(loc => (
          <Option
            onClick={() => changeLocale(loc)}
            key={loc}
            isActive={loc === locale}
          >
            {loc}
          </Option>
        ))}
      </Wrapper>
    </>
  );
});

LanguageSelector.displayName = 'LanguageSelector';
