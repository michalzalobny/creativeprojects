import React, { memo, useState } from 'react';

import { Wrapper } from './styled/Wrapper';
import { ToggleSwitch } from './styled/ToggleSwitch';
import { Ball } from './styled/Ball';
import { Glow } from './styled/Glow';
import { BallCircle } from './styled/BallCircle';
import { BallCircleWrapper } from './styled/BallCircleWrapper';
import { BackgroundWrapper } from './styled/BackgroundWrapper';
import { Star } from './components/Star/Star';
import { StarsWrapper } from './styled/StarsWrapper';
import { NightWrapper } from './styled/NightWrapper';
import { ShootingStarsWrapper } from './styled/ShootingStarsWrapper';
import { ShootingStar } from './components/ShootingStar/ShootingStar';
import { Cloud } from './components/Cloud/Cloud';
import { CloudsWrapper } from './styled/CloudsWrapper';
import { DayWrapper } from './styled/DayWrapper';
import { BALL_VARIANTS, GLOW_VARIANTS } from './framerPresets';
import {
  BALL_SIZE,
  BUTTON_WIDTH,
  BUTTON_HEIGHT,
  pixelRatio,
} from './constants';

type Theme = 'primary' | 'secondary';

interface ThemeSelectorProps {}

export const ThemeSelector = memo<ThemeSelectorProps>(props => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('primary');

  const toggleTheme = () => {
    if (currentTheme === 'primary') {
      setCurrentTheme('secondary');
      return;
    }
    setCurrentTheme('primary');
  };

  const isPrimaryTheme = currentTheme === 'primary' ? 'animate' : 'initial';

  const isSecondaryTheme = currentTheme !== 'primary' ? 'animate' : 'initial';

  const renderBallCircles = () => {
    return (
      <BallCircleWrapper animate={isPrimaryTheme}>
        <BallCircle
          size={pixelRatio * 8}
          posX={pixelRatio * 4}
          posY={pixelRatio * 18}
        />
        <BallCircle
          size={pixelRatio * 5}
          posX={pixelRatio * 12}
          posY={pixelRatio * 13}
        />
        <BallCircle
          size={pixelRatio * 3}
          posX={pixelRatio * 5}
          posY={pixelRatio * 12}
        />
        <BallCircle
          size={pixelRatio * 4}
          posX={pixelRatio * 12}
          posY={pixelRatio * 4}
        />
      </BallCircleWrapper>
    );
  };

  const renderClouds = () => {
    return (
      <CloudsWrapper animate={isPrimaryTheme}>
        <Cloud
          posX={pixelRatio * 10}
          posY={pixelRatio * 15}
          size={pixelRatio * 25}
        />
        <Cloud
          posX={pixelRatio * 8}
          posY={pixelRatio * 8}
          size={pixelRatio * 13}
        />
      </CloudsWrapper>
    );
  };

  const renderStars = () => {
    return (
      <StarsWrapper animate={isSecondaryTheme}>
        <Star
          size={pixelRatio * 2}
          posX={pixelRatio * 31}
          posY={pixelRatio * 16}
        />
        <Star
          size={pixelRatio * 3}
          posX={pixelRatio * 36}
          posY={pixelRatio * 5}
        />
        <Star
          size={pixelRatio * 1}
          posX={pixelRatio * 51}
          posY={pixelRatio * 16}
        />
        <Star
          size={pixelRatio * 2}
          posX={pixelRatio * 43}
          posY={pixelRatio * 23}
        />
        <Star
          size={pixelRatio * 2}
          posX={pixelRatio * 50}
          posY={pixelRatio * 5}
        />
        <Star
          size={pixelRatio * 1}
          posX={pixelRatio * 41}
          posY={pixelRatio * 15}
        />
      </StarsWrapper>
    );
  };

  const renderShootingStars = () => {
    return (
      <ShootingStarsWrapper animate={isSecondaryTheme}>
        <ShootingStar
          delay={0.6}
          size={pixelRatio * 30}
          height={pixelRatio * 1}
          posX={pixelRatio * 0}
          posY={pixelRatio * 0}
        />
        <ShootingStar
          delay={1.6}
          size={pixelRatio * 20}
          height={pixelRatio * 1}
          posX={pixelRatio * 50}
          posY={pixelRatio * 0}
        />
        <ShootingStar
          delay={1.2}
          size={pixelRatio * 40}
          height={pixelRatio * 1}
          posX={pixelRatio * 15}
          posY={pixelRatio * 0}
        />
        <ShootingStar
          delay={2.1}
          size={pixelRatio * 15}
          height={pixelRatio * 1}
          posX={pixelRatio * 45}
          posY={pixelRatio * 0}
        />
      </ShootingStarsWrapper>
    );
  };

  return (
    <>
      <Wrapper>
        <ToggleSwitch
          buttonWidth={BUTTON_WIDTH}
          buttonHeight={BUTTON_HEIGHT}
          onClick={toggleTheme}
        >
          <Ball
            variants={BALL_VARIANTS}
            size={BALL_SIZE}
            animate={isPrimaryTheme}
          >
            {renderBallCircles()}
          </Ball>
          <Glow
            size={BALL_SIZE}
            variants={GLOW_VARIANTS}
            animate={isPrimaryTheme}
          />
          <BackgroundWrapper>
            <DayWrapper animate={isPrimaryTheme}>{renderClouds()}</DayWrapper>
            <NightWrapper animate={isSecondaryTheme}>
              {renderStars()}
              {renderShootingStars()}
            </NightWrapper>
          </BackgroundWrapper>
        </ToggleSwitch>
      </Wrapper>
    </>
  );
});

ThemeSelector.displayName = 'ThemeSelector';
