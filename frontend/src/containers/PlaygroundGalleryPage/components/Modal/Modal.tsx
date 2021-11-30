import React from 'react';

import { ModalItem } from '../../classes/types';
import * as S from './Modal.styles';

export interface ModalProps {
  initial: string;
  animate: string;
  exit: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalItem: ModalItem | null;
}

export const Modal = (props: ModalProps) => {
  const { modalItem, setShowModal, ...rest } = props;

  const defaultTransition = {
    type: 'tween',
    duration: 0.65,
    easing: 'easeInOut',
  };

  const wrapperV = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const translateWrapperV = {
    initial: {
      y: '-100%',
      scale: 0.92,
    },
    animate: {
      y: '0%',
      scale: 1,
    },
    exit: {
      y: '-100%',
      scale: 0.92,
      transition: {
        delay: 0.15,
        ...defaultTransition,
      },
    },
  };

  const modalWrapperV = {
    initial: {
      y: '100%',
    },
    animate: {
      y: '0%',
    },
    exit: {
      y: '100%',
      transition: {
        delay: 0.15,
        ...defaultTransition,
      },
    },
  };

  return (
    <>
      <S.Wrapper variants={wrapperV} {...rest}>
        <S.ModalContainer>
          <S.CloseButtonWrapper onClick={() => setShowModal(false)}>
            <S.CloseButtonBackground />
          </S.CloseButtonWrapper>
          <S.TranslateWrapper
            transition={defaultTransition}
            variants={translateWrapperV}
          >
            <S.ModalWrapper
              transition={defaultTransition}
              variants={modalWrapperV}
            >
              <S.ModalBackground />
              <S.Top></S.Top>
              <S.Bottom>
                <S.Description>{modalItem?.description}</S.Description>
              </S.Bottom>
            </S.ModalWrapper>
          </S.TranslateWrapper>
        </S.ModalContainer>
      </S.Wrapper>
    </>
  );
};
