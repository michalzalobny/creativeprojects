import React, { memo, useEffect, useState } from 'react';
import { VideoMediaProps } from 'utils/types/Media';

import { Wrapper } from './styled/Wrapper';
import { VideoContainer } from './styled/VideoContainer';
import { VideoWrapper } from './styled/VideoWrapper';
import { IFrame } from './styled/IFrame';
import { SourceVideo } from './styled/SourceVideo';
import { VideoCover } from './styled/VideoCover';

// graphql query example
// video{
//   videoSrc{
//     url,
//   },
//   videoURI,
// }

export interface VideoProps {
  videoURI: string;
  videoSrc: VideoMediaProps;
}

interface IFrameComponent {
  uri: string;
}

interface SourceVideoComponent {
  url: string;
}

const IFrameComponent = ({ uri }: IFrameComponent) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    //Rendering embeded video causes lags, so it is delayed to make the page transitions smooth
    const renderTimeout = setTimeout(() => {
      setShowVideo(true);
    }, 600);

    return () => {
      clearTimeout(renderTimeout);
    };
  }, []);

  if (showVideo) {
    return (
      <>
        <IFrame
          src={`https://www.youtube.com/embed/${uri}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        />
      </>
    );
  }
  return null;
};

const SourceVideoComponent = ({ url }: SourceVideoComponent) => {
  return (
    <>
      <SourceVideo controls>
        <source src={url} type="video/mp4" />
      </SourceVideo>
    </>
  );
};

export const Video = memo<VideoProps>(props => {
  const { videoSrc, videoURI, children, ...rest } = props;

  const [hideCover, setHideCover] = useState(false);

  return (
    <>
      <Wrapper {...rest}>
        <VideoWrapper>
          <VideoCover
            onClick={() => setHideCover(true)}
            animate={hideCover ? 'animate' : 'initial'}
          />
          <VideoContainer>
            {videoURI ? (
              <IFrameComponent uri={videoURI} />
            ) : (
              <SourceVideoComponent url={videoSrc.url} />
            )}
          </VideoContainer>
        </VideoWrapper>
      </Wrapper>
    </>
  );
});

Video.displayName = 'Video';
