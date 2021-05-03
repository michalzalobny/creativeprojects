interface MediaFormatProps {
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface VideoMediaProps {
  url: MediaFormatProps['url'];
}

// Getting the image source:

// const imageSrc = image.formats
//   ? image.formats.large?.url ||
//     image.formats.medium?.url ||
//     image.formats.small?.url ||
//     image.formats.thumbnail.url
//   : image.url;

export interface ImageMediaProps {
  formats: {
    thumbnail?: MediaFormatProps;
    small?: MediaFormatProps;
    medium?: MediaFormatProps;
    large?: MediaFormatProps;
  };
  url: MediaFormatProps['url'];
}
