import styled from 'styled-components';

export const Wrapper = styled.div`
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
  background-color: #f7f7f7;
  opacity: 0.1;
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
  background-color: #262626;
  padding: 40px;
  color: white;
  font-weight: 300;
`;
