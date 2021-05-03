import React, { useState, useEffect, memo } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AcceptButton } from './styled/AcceptButton';
import { ButtonWrapper } from './styled/ButtonWrapper';
import { CookieBox } from './styled/CookieBox';
import { CookieImage } from './styled/CookieImage';
import { CookieText } from './styled/CookieText';

export const CookieInfo = memo(() => {
  const [showCookieModal, setShowCookieModal] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookiesConsent');
    if (cookieConsent === null || undefined) {
      setShowCookieModal(true);
    }
  }, []);

  const cookiesAcceptHandler = () => {
    localStorage.setItem('cookiesConsent', 'given');
    setShowCookieModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {showCookieModal && (
          <CookieBox>
            <CookieImage alt="cookies" />
            <CookieText>dasdasd</CookieText>
            <ButtonWrapper>
              <AcceptButton renderAs="button" onClick={cookiesAcceptHandler}>
                test3
              </AcceptButton>
            </ButtonWrapper>
          </CookieBox>
        )}
      </AnimatePresence>
    </>
  );
});

CookieInfo.displayName = 'CookieInfo';
