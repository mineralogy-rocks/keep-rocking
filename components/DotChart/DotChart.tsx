import { useRef, useEffect } from 'react';

import { select } from 'd3-selection';
import * as Plot from "@observablehq/plot";


interface Props {
  items?: Array<{
    key: string,
    value: number,
  }>,
};

const defaultProps = {
  className: "",
  colorScheme: "BuRd",
  labelX: null,
  labelY: null,
};

const legendRadius = (data, options) =>
  Plot.dot(data, {
    ...options,
    frameAnchor: "right",
    strokeWidth: 0.8,
    dx: 40,
    dy: -3,
    render: (i, s, v, d, c, next) => {
      const g = next(i, s, v, d, c);
      select(g)
        .selectAll("circle")
        .each(function (i) {
          const r = +this.getAttribute("r");
          const x = +this.getAttribute("cx");
          const y = +this.getAttribute("cy");
          this.setAttribute("transform", `translate(0,${-r})`);
          const title = select(this).select("title");
          select(g)
            .append("text")
            // .attr("transform", `translate(0,${-r})`)
            .attr("font-size", 10)
            .attr("x", x + 30)
            .attr("y", y - 3 * r)
            .attr("stroke", "none")
            .attr("fill", "currentColor")
            .text(title.text());
          title.remove();
        });
      return g;
    }
  })


const DotChart = ({ items, labelX, labelY }: Props & typeof defaultProps) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!items) return;

    const plot = Plot.plot({
      marginRight: 100,
      x: { label: labelX, grid: true },
      y: { label: labelY },
      r: { range: [0, 10] },
      style: {
        backgroundColor: "transparent",
      },
      marks: [
        Plot.dot(
          items,
          Plot.group({
            r: "count",
          },
          {
            x: "value",
            y: "key",
            fill: "black",
          }),
        ),
        legendRadius([5, 20, 60], {r: (d) => d, title: (d) => `${d} items`, stroke: "black"})
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


DotChart.defaultProps = defaultProps;
export default DotChart;
