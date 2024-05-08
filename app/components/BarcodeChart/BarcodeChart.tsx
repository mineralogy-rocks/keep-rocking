import { useRef, useEffect } from 'react';

import * as Plot from "@observablehq/plot";

import { KeyVal } from "@/lib/interfaces";



interface Props {
  items?: KeyVal[],
  labelX?: string | null;
  labelY?: string | null;
  domainY?: string[] | undefined;
};

const defaultProps = {
  items: [],
  labelX: null,
  labelY: null,
  domainY: undefined,
};


const BarcodeChart: React.FC<Props> = (props) => {
  const { items, labelX, labelY, domainY } = { ...defaultProps, ...props};
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
            y: "key",
            strokeOpacity: 0.7
          },
        ),
      ],
    });

    if (containerRef.current) containerRef.current.appendChild(plot);
    return () => plot.remove();
  }, [items]);

  return (
    <div className='text-font-secondary' ref={containerRef}></div>
  )
}

export default BarcodeChart;
