import { LocalizedTextProps } from 'utils/types/LocalizedText';
import { LocalizedHead } from 'utils/types/LocalizedHead';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';

export interface ProjectData {
  isExternal: boolean;
  urlSlug: string;
  localizedName: LocalizedTextProps[];
  localizedHead: LocalizedHead;
  creativeItems: CreativeItem[];
}
