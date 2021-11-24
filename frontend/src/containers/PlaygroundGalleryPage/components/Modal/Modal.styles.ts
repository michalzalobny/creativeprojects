import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); //sharedValues.colors.gray
  backdrop-filter: saturate(170%) blur(8px);
`;

export const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  border-radius: 10px;
  overflow: hidden;
`;

export const ModalBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(60, 60, 60, 0.4); //sharedValues.colors.gray
  backdrop-filter: blur(10px);
`;

export const Top = styled.div`
  width: 100%;
  &:before {
    content: '';
    width: 100%;
    display: block;
    padding-bottom: 56.25%;
  }
`;

export const Bottom = styled.div`
  background: rgba(45, 45, 45, 1);
  padding: 40px;
  color: white;
  font-weight: 300;
`;
