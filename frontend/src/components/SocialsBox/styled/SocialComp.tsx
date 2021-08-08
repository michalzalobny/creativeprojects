import styled from 'styled-components';

import { Social } from 'components/Social/Social';

interface Props {}

export const SocialComp = styled(Social)<Props>`
  &:not(:last-child) {
    margin-right: 12px;
  }
`;
