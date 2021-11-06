import styled from 'styled-components';
import { UnderlineLink } from 'components/UnderlineLink/UnderlineLink';

interface Props {}

export const LinkComp = styled(UnderlineLink)<Props>`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
