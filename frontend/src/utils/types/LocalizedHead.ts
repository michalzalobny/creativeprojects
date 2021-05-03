import { LocalizedTextProps } from './LocalizedText';
import { ImageMediaProps } from './Media';

export interface LocalizedHead {
  localizedTitle: LocalizedTextProps[];
  localizedDescription: LocalizedTextProps[];
  ogType: string;
  ogImage: ImageMediaProps;
}
