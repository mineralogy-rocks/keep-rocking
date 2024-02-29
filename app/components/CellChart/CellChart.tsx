import { useRef, useEffect } from 'react';

import * as Plot from "@observablehq/plot";

import { KeyVal } from "@/lib/interfaces";


interface Props {
  items?: KeyVal[],
  colorScheme?: string,

  labelX?: string | null;
  labelY?: string | null;

  domainX: string|number[] | undefined;
  domainY: string[] | undefined;
};

const defaultProps = {
  className: "",
  colorScheme: "Blues",

  labelX: null,
  labelY: null,

  domainX: [],
  domainY: [],
};

const makeTransparent = (svg: SVGElement) => {
  svg.style.background = "transparent";
}


const CellChart:  React.FC<Props> = (props) => {
  const { colorScheme, items, labelX, labelY, domainX, domainY } = { ...defaultProps, ...props};

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!items) return;

    const plot = Plot.plot({
      x: { label: labelX, grid: true, domain: domainX ? domainX : undefined },
      y: { label: labelY, domain: domainY ? domainY : undefined },
      inset: 2,
      color: { label: "Number of minerals", legend: true, scheme: "Blues" },
      style: {
        backgroundColor: "transparent",
      },
      className: "cell-chart",
      marks: [
        Plot.cell(
          items,
          Plot.group(
            { fill: "count" },
            { fill: "value", x: "value", y: "key", stroke: "black", strokeWidth: 0.2 }
          ),
        ),
      ],
    });

    // A workaround to make the background of the SVG transparent
    for (const svg of plot.getElementsByTagName("svg")) {
      if (svg instanceof SVGElement) makeTransparent(svg);
    }

    if (containerRef.current) containerRef.current.appendChild(plot);
    return () => plot.remove();
  }, [items]);

  return (
    <div ref={containerRef}>
    </div>
  )
}


export default CellChart;
