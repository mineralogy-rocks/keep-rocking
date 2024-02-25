import { useRef, useEffect } from 'react';

import * as Plot from "@observablehq/plot";



interface Props {
  items?: Array<{
    key: string,
    value: number,
  }>,
  domainY?: any[],
};

const defaultProps = {
  items: [],
  labelX: null,
  labelY: null,
  domainY: null,
};


const BarcodeChart = (props: Props & typeof defaultProps) => {
  const { items, labelX, labelY, domainY} = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!items) return;

    const plot = Plot.plot({
      width: 600,
      marginLeft: 100,
      color: {
        legend: true,
      },
      x: { label: labelX, grid: true },
      y: { label: labelY, domain: domainY, paddingInner: 0.1, paddingOuter: 0.1 },
      style: {
        backgroundColor: "transparent",
      },
      marks: [
        Plot.axisY({
          tickFormat: (d) => {
            return d;
          },
        }),
        Plot.tickX(
          items,
          {
            x: "value",
            y: "key", strokeOpacity: 0.7
          },
        ),
      ],
    });
    containerRef.current.appendChild(plot);
    return () => plot.remove();
  }, [items]);

  return (
    <div ref={containerRef}></div>
  )
}


export default BarcodeChart;
