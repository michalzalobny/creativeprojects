import React, { memo, useRef, useEffect, useState } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { SlideWithKey } from 'components/Animations/SlideWithKey/SlideWithKey';

import { application } from './functions/application';
import { StatWrapper } from './styled/StatWrapper';
import { Counter } from './styled/Counter';
import { NewGameComp } from './styled/NewGameComp';
import { ContinueGameComp } from './styled/ContinueGameComp';

interface StackTowerProps {}

export type GameState = 'playing' | 'animating' | 'readyToStart';

const StackTower = memo<StackTowerProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const initGameRef = useRef(null);

  const [gameState, setGameState] = useState<GameState>('readyToStart');
  const [isReady, setIsReady] = useState(false);
  const [point, setPoint] = useState<number | null>(null);

  useEffect(() => {
    const { initGame, destroy } = application({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
      gameState,
      setGameState,
      isReady,
      setIsReady,
      point,
      setPoint,
    });

    initGameRef.current = initGame;

    return () => {
      initGameRef.current = null;
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Wrapper>
        <Cover animate={isReady ? 'animate' : 'initial'} />
        <NewGameComp
          onClick={() => initGameRef.current()}
          animate={point === null && isReady ? 'animate' : 'initial'}
        />
        <ContinueGameComp
          onClick={() => initGameRef.current()}
          animate={
            gameState === 'readyToStart' && point !== null
              ? 'animate'
              : 'initial'
          }
        />
        <StatWrapper
          animate={
            gameState === 'readyToStart' && point !== null
              ? 'animate'
              : 'initial'
          }
        >
          <SlideWithKey itemKey={point}>
            <Counter>{point}</Counter>
          </SlideWithKey>
        </StatWrapper>
        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

export default StackTower;

StackTower.displayName = 'StackTower';
