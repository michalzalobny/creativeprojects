import React from 'react';

export const GoogleAnalytics = React.memo(() => {
  const googleAnalyticsTag = process.env.NEXT_PUBLIC_GA_KEY;
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTag}`}
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsTag}');
          `,
        }}
      />
    </>
  );
});

GoogleAnalytics.displayName = 'GoogleAnalytics';
