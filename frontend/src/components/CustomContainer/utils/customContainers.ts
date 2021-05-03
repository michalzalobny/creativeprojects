export interface ContainerSettingsType {
  maxWidth: number;
  mobilePadding: number;
  referenceWidth: number;
  breakpoint: number;
}

export interface ContainerValuesType {
  maxWidth: number;
  breakpoint: number;
  mobilePadding: number;
  negativeSpaceResponsive: number;
  negativeSpace: number;
}

export const getContainerValues = (obj: ContainerSettingsType) => {
  return {
    maxWidth: obj.maxWidth,
    breakpoint: obj.breakpoint,
    mobilePadding: obj.mobilePadding,
    negativeSpaceResponsive:
      (((obj.referenceWidth - obj.maxWidth) / 2) * 100) / obj.referenceWidth,
    negativeSpace: (obj.referenceWidth - obj.maxWidth) / 2,
  };
};
