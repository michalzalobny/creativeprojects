const customMediaQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth / 16}em)`;

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  tabletLand: 992,
  desktop: 1200,
  desktopLarge: 1921,
};

// Pass in pixels
export const media = {
  custom: customMediaQuery,
  mobile: customMediaQuery(breakpoints.mobile),
  tablet: customMediaQuery(breakpoints.tablet),
  tabletLand: customMediaQuery(breakpoints.tabletLand),
  desktop: customMediaQuery(breakpoints.desktop),
  desktopLarge: customMediaQuery(breakpoints.desktopLarge),
};

interface computeValueType {
  pixelValue: number;
  referenceWidth: number;
}

export const computeValue = ({
  pixelValue,
  referenceWidth,
}: computeValueType) => {
  return `${(100 * pixelValue) / referenceWidth}vw`;
};
