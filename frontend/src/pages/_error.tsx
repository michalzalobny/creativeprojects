import React from 'react';

import ErrorPage from 'containers/ErrorPage/ErrorPage';

export default function Error({ statusCode }) {
  return <ErrorPage statusCode={statusCode}></ErrorPage>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
