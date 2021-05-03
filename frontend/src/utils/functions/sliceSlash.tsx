export const sliceSlash = (string: string) => {
  return string && string.endsWith('/') ? string.slice(0, -1) : string;
};
