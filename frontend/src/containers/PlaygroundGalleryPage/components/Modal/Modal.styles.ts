import styled from 'styled-components';
import { motion } from 'framer-motion';

import { MediaRenderer } from '../MediaRenderer/MediaRenderer';

export const Wrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: saturate(180%) blur(8px);
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 638px;
`;

export const ModalWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

export const TranslateWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
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
  background-color: #f7f7f7;
  opacity: 0.1;
  backdrop-filter: blur(10px);
`;

export const Top = styled.div`
  position: relative;
  margin: 30px;
`;

export const Bottom = styled.div`
  background-color: #262626;
  padding: 20px;
  color: white;
  font-weight: 300;
`;

export const CloseButtonWrapper = styled.button`
  position: absolute;
  pointer-events: initial;
  cursor: pointer;
  z-index: 2;
  bottom: calc(100% + 20px);
  right: 0;
  width: 50px;
  height: 50px;

  &:before,
  &:after {
    content: '';
    width: 18px;
    height: 1px;
    opacity: 1;
    background-color: white;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  @media (min-width: 768px) {
    left: calc(100% + 20px);
    top: 0;
  }
`;

export const CloseButtonBackground = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #f7f7f7;
  opacity: 0.1;
  border-radius: 50%;
`;

export const Description = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 30px;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 50px;
  padding: 14px 30px;
  border: 1px solid white;
  display: inline-block;
`;

export const MediaRendererWrapper = styled.div`
  position: relative;

  &:before {
    content: '';
    width: 100%;
    display: block;
    padding-bottom: 56.25%;
  }
`;

export const MediaRendererComp = styled(MediaRenderer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
