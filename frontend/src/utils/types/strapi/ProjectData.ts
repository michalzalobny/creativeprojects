import { LocalizedTextProps } from 'utils/types/LocalizedText';
import { LocalizedHead } from 'utils/types/LocalizedHead';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';

export interface ProjectData {
  urlSlug: string;
  localizedName: LocalizedTextProps[];
  localizedHead: LocalizedHead;
  creativeItems: CreativeItem[];
}
