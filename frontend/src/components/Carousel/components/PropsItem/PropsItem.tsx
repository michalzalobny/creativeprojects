import React, { memo } from 'react';

interface PropsItemProps {
  currentItem: JSX.Element;
  direction: number;
}

export const PropsItem = memo(
  React.forwardRef((props: PropsItemProps, ref: React.Ref<HTMLDivElement>) => {
    const { currentItem, direction } = props;
    return (
      <div ref={ref}>
        {React.cloneElement(currentItem, { direction: direction })}
      </div>
    );
  }),
);

PropsItem.displayName = 'PropsItem';
