import NextHead from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import { ImageMediaProps } from 'utils/types/Media';
import { getFrontHost } from 'utils/functions/getFrontHost';

import { GoogleAnalytics } from './GoogleAnalytics';

export interface HeadProps {
  title: string;
  description: string;
  ogType: string;
  ogImage: ImageMediaProps;
}

export const Head = React.memo<HeadProps>(props => {
  const { title, description, ogType, ogImage } = props;
  const router = useRouter();
  const frontHost = getFrontHost();

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={`${frontHost}/favicon.ico`} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${frontHost}${router.pathname}`} />
      {ogImage && <meta property="og:image" content={`${ogImage.url}`} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <GoogleAnalytics />
    </NextHead>
  );
});

Head.displayName = 'Head';
