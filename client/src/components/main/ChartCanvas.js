import React from "react";

const ChartCanvas = React.forwardRef((props, ref) => {
  const { width, height } = props;
  return (
    <canvas className="chart" width={width} height={height} ref={ref}></canvas>
  );
});

export default ChartCanvas;
