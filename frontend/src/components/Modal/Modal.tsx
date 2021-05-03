import React from 'react';
import { AnimatePresence } from 'framer-motion';

import { ModalWrapper } from './styled/ModalWrapper';
import { ModalBackground } from './styled/ModalBackground';
import { ModalContentWrapper } from './styled/ModalContentWrapper';
import { CloseButtonContainer } from './styled/CloseButtonContainer';
import { CloseButtonImg } from './styled/CloseButtonImg';
import { OpacityWrapper } from './styled/OpacityWrapper';
import { Wrapper } from './styled/Wrapper';

interface ModalSettingsType {
  maxWidth: number;
  padding: number;
  margin: number;
}

interface ModalProps {
  toggle: () => void;
  children: React.ReactNode;
  isVisible: boolean;
  classNames?: string;
  modalSettings: ModalSettingsType;
}

export const Modal = React.memo<ModalProps>(props => {
  const { toggle, children, isVisible, modalSettings } = props;

  return (
    <Wrapper isVisible={isVisible}>
      <AnimatePresence exitBeforeEnter={false}>
        {isVisible && (
          <ModalWrapper>
            <ModalBackground type="button" onClick={toggle} />

            <OpacityWrapper>
              <ModalContentWrapper
                maxWidth={modalSettings.maxWidth}
                padding={modalSettings.padding}
                margin={modalSettings.margin}
              >
                <CloseButtonContainer type="button" onClick={toggle}>
                  <CloseButtonImg />
                </CloseButtonContainer>
                {children}
              </ModalContentWrapper>
            </OpacityWrapper>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </Wrapper>
  );
});

Modal.displayName = 'Modal';
