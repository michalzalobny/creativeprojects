import React from 'react';

import { ErrorCode } from './styled/ErrorCode';
import { CodeWrapper } from './styled/CodeWrapper';

interface ErrorPageProps {
  statusCode: number;
}

export default function ErrorPage(props: ErrorPageProps) {
  const { statusCode } = props;
  return (
    <>
      <CodeWrapper>
        <ErrorCode>Error | {statusCode || '404'}</ErrorCode>
      </CodeWrapper>
    </>
  );
}
