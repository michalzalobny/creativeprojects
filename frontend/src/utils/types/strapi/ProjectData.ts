import { LocalizedTextProps } from 'utils/types/LocalizedText';
import { LocalizedHead } from 'utils/types/LocalizedHead';

export interface ProjectData {
  urlSlug: string;
  localizedName: LocalizedTextProps[];
  localizedHead: LocalizedHead;
}
