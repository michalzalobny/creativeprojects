import React from 'react';

import { ModalItem } from '../../classes/types';
import {
  defaultTransition,
  translateWrapperV,
  modalBackgroundV,
  modalWrapperV,
  wrapperV,
} from './Modal.motion';
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
              <S.ModalBackground
                transition={defaultTransition}
                variants={modalBackgroundV}
              />
              <S.Top>
                <S.MediaRendererWrapper>
                  <S.MediaRendererComp
                    mediaSrc={modalItem?.mediaSrc || ''}
                    mediaType={modalItem?.mediaType || ''}
                  />
                </S.MediaRendererWrapper>
              </S.Top>
              <S.Bottom>
                <S.Description>{modalItem?.description}</S.Description>
                <S.ButtonWrapper>{modalItem?.buttonLabel}</S.ButtonWrapper>
              </S.Bottom>
            </S.ModalWrapper>
          </S.TranslateWrapper>
        </S.ModalContainer>
      </S.Wrapper>
    </>
  );
};
