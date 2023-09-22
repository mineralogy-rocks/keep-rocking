import { useRef, useEffect } from 'react';

import * as Plot from "@observablehq/plot";



interface Props {
  items?: Array<{
    key: string,
    value: number,
  }>,
  domainX?: any[],
};

const defaultProps = {
  className: "",
  colorScheme: "BuRd",
  labelX: null,
  labelY: null,
};


const BarcodeChart = ({ items, labelX, labelY, domainX, className, colorScheme }: Props & typeof defaultProps) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!items) return;

    const plot = Plot.plot({
      width: 600,
      marginLeft: 100,
      color: {
        legend: true,
      },
      x: { label: labelX, grid: true },
      y: { label: labelY, domain: domainX, paddingInner: 0.1, paddingOuter: 0.1 },
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
    if (containerRef.current) {
      containerRef.current.appendChild(plot);
    }
    return () => plot.remove();
  }, [items]);

  return (
    <div ref={containerRef}>
    </div>
  )
}


BarcodeChart.defaultProps = defaultProps;
export default BarcodeChart;
