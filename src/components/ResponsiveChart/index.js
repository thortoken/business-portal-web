import React from 'react';
import { ParentSize } from '@vx/responsive';

export default class ResponsiveChart extends React.Component {
  render() {
    const { component: ChartComponent, ...chartProps } = this.props;

    return <ChartComponent {...chartProps} />;

    // return (
    //   <ParentSize>
    //     {parent => (
    //   <ChartComponent
    //   width={parent.width}
    //   height={parent.height}
    //   top={parent.top}
    //   left={parent.left}
    //   // this is the referer to the wrapper component
    //   parentRef={parent.ref}
    //   // this function can be called inside MySuperCoolVxChart to cause a resize of the wrapper component
    //   resizeParent={parent.resize}
    //   {...chartProps}
    // />
    //     )}
    //   </ParentSize>
    // );
  }
}
