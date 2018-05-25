import React from 'react';
import { ParentSize } from '@vx/responsive';

const withResponsiveness = ChartComponent => {
  const HOC = props => {
    const { height, ...chartProps } = props;

    // return <ChartComponent {...chartProps} />;

    return (
      <ParentSize>
        {parent => (
          <ChartComponent
            height={height}
            width={parent.width}
            top={parent.top}
            left={parent.left}
            // this is the referer to the wrapper component
            parentRef={parent.ref}
            // this function can be called inside MySuperCoolVxChart to cause a resize of the wrapper component
            resizeParent={parent.resize}
            {...chartProps}
          />
        )}
      </ParentSize>
    );
  };

  HOC.displayName = `withResponsiveness(${ChartComponent.displayName || 'ChartComponent'})`;

  return HOC;
};

export default withResponsiveness;
