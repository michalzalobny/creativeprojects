import { sliceSlash } from 'utils/functions/sliceSlash';

import { isDev } from './isDev';

const prodHost = sliceSlash(process.env.NEXT_PUBLIC_FRONTEND_PROD);
const localHost = sliceSlash(process.env.NEXT_PUBLIC_FRONTEND_LOCAL);

export const getFrontHost = () => {
  return isDev() ? localHost : prodHost;
};
