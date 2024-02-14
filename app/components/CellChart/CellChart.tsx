import { useRef, useEffect } from 'react';

import * as Plot from "@observablehq/plot";


interface Props {
  items?: Array<{
    key: string,
    value: number,
  }>,
  colorScheme?: string,
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


const CellChart = ({ colorScheme, items, labelX, labelY, domainX, domainY }: Props & typeof defaultProps) => {
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

    containerRef.current.appendChild(plot);
    return () => plot.remove();
  }, [items]);

  return (
    <div ref={containerRef}>
    </div>
  )
}


CellChart.defaultProps = defaultProps;
export default CellChart;
