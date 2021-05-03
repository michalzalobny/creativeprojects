import { css } from 'styled-components';

// :lang(en-US) {
//   background: red;
// }
// :lang(pl) {
//   background: yellow;
// }

export const sharedValues = {
  text: {
    normal: css`
      font-size: 1.5rem;
      line-height: 2.5rem;
    `,
    small: css`
      font-size: 1.2rem;
      line-height: 1.6rem;
    `,
  },
  transitionTimes: {
    normal: '0.45s',
    blobButton: '0.8s',
  },

  boxShadow: {
    normal: '0 0 20px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: {
    round: '15rem',
    normal: '5px',
  },
  containers: {
    normal: {
      maxWidth: 1420,
      referenceWidth: 1620,
      mobilePadding: 0,
      get breakpoint() {
        return this.referenceWidth;
      },
    },
  },
  modals: {
    small: {
      maxWidth: 450,
      padding: 40,
      margin: 15,
    },
  },
};
