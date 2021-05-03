import NextDocument, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  Html,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href={'/fonts/opensans400latin.woff2'}
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href={'/fonts/opensans400latinext.woff2'}
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href={'/fonts/opensans800latin.woff2'}
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href={'/fonts/opensans800latinext.woff2'}
            crossOrigin="anonymous"
          />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
