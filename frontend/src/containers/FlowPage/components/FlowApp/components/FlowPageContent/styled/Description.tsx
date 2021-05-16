import styled from 'styled-components';

import { RichParagraph } from 'utils/styled/shared/RichParagraph';

interface Props {}

export const Description = styled(RichParagraph)<Props>`
  text-align: justify;
  padding: 0 50px;
  padding-bottom: 50px;

  a {
    color: currentColor;
  }
`;
