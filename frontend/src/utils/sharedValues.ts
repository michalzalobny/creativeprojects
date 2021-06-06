// :lang(en-US) {
//   background: red;
// }
// :lang(pl) {
//   background: yellow;
// }

export const sharedValues = {
  skew: {
    normal: 10,
  },

  boxShadow: {
    normal: '0px 0px 50px rgba(9, 16, 31, 0.25)',
  },

  fontPresets: {
    bold: `
      font-weight: 700;
    `,
    boldItalic: `
      font-style: italic;
      font-weight: 700;
    `,
    normal: `
      font-weight: 500;
    `,
    normalItalic: `
      font-style: italic;
      font-weight: 500;
    `,
  },
  colors: {
    primary: '#bf4860',
    black: '#131313',
    white: '#f5f5f5',
    gray: '#bababa',
    trueWhite: '#FFFFFF',
    trueBlack: '#000000',
  },
  transitionTimes: {
    normal: '0.45s',
    blobButton: '0.8s',
  },
  borderRadius: {
    round: '15rem',
    normal: '5px',
  },
  containers: {
    normal: {
      maxWidth: 1420,
      referenceWidth: 1920,
      mobilePadding: 0,
      get breakpoint() {
        return this.referenceWidth;
      },
    },
  },
};
