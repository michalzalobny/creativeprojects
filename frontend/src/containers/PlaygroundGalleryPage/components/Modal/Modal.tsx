import React from 'react';

import * as S from './Modal.styles';

export interface ModalProps {}

export const Modal = props => {
  const { ...rest } = props;
  return (
    <>
      <S.Wrapper {...rest}>
        <S.ModalWrapper>
          <S.ModalBackground />
          <S.Top></S.Top>
          <S.Bottom>
            <h1>Test</h1>
          </S.Bottom>
        </S.ModalWrapper>
      </S.Wrapper>
    </>
  );
};
