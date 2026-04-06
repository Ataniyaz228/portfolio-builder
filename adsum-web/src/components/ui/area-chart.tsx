"use client";

import React, { useMemo } from "react";

type DataPoint = Record<string, string | number>;

interface AreaChartRootProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: DataPoint[];
  categories?: string[];
  index?: string;
  stacked?: boolean;
  className?: string;
  colors?: string[];
  dark?: boolean;
}

const defaultIndex = "Year";
const defaultCategories = ["Psychology", "Business", "Biology"];
const defaultData: DataPoint[] = [
  { Year: "2018", Psychology: 125, Business: 120, Biology: 90 },
  { Year: "2019", Psychology: 110, Business: 130, Biology: 85 },
  { Year: "2020", Psychology: 135, Business: 100, Biology: 95 },
  { Year: "2021", Psychology: 105, Business: 115, Biology: 120 },
  { Year: "2022", Psychology: 140, Business: 125, Biology: 130 },
];

const fallbackColors = ["#0c6d62", "#12a594", "#10b3a3", "#0b544a"];

const AreaChartRoot = React.forwardRef<HTMLDivElement, AreaChartRootProps>(function AreaChartRoot(
  {
    data = defaultData,
    categories = defaultCategories,
    index = defaultIndex,
    className,
    colors = fallbackColors,
    stacked: _stacked,
    dark: _dark,
    ...otherProps
  },
  ref,
) {
  const { lines, areas, labels } = useMemo(() => {
    if (!data.length || !categories.length) {
      return { lines: [] as string[], areas: [] as string[], labels: [] as string[] };
    }

    const width = 100;
    const height = 100;
    const xPad = 2;
    const yPad = 8;

    const maxY = Math.max(
      1,
      ...data.flatMap((row) =>
        categories.map((key) => {
          const value = row[key];
          return typeof value === "number" ? value : Number(value) || 0;
        }),
      ),
    );

    const allLines: string[] = [];
    const allAreas: string[] = [];

    categories.forEach((category) => {
      const points = data.map((row, i) => {
        const value = row[category];
        const yVal = typeof value === "number" ? value : Number(value) || 0;
        const x = xPad + (i / Math.max(1, data.length - 1)) * (width - xPad * 2);
        const y = yPad + (1 - yVal / maxY) * (height - yPad * 2);
        return { x, y };
      });

      const line = points
        .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
        .join(" ");

      const area = `${line} L ${points[points.length - 1].x} ${height - yPad / 2} L ${points[0].x} ${height - yPad / 2} Z`;

      allLines.push(line);
      allAreas.push(area);
    });

    const xLabels = [
      String(data[0]?.[index] ?? ""),
      String(data[Math.floor((data.length - 1) / 2)]?.[index] ?? ""),
      String(data[data.length - 1]?.[index] ?? ""),
    ];

    return { lines: allLines, areas: allAreas, labels: xLabels };
  }, [data, categories, index]);

  return (
    <div ref={ref} className={`h-80 w-full ${className ?? ""}`} {...otherProps}>
      <div className="relative h-full w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            {categories.map((_, i) => (
              <linearGradient key={i} id={`area-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors[i % colors.length]} stopOpacity="0.24" />
                <stop offset="100%" stopColor={colors[i % colors.length]} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {[10, 30, 50, 70, 90].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeWidth="0.25"
            />
          ))}

          {areas.map((area, i) => (
            <path key={`area-${i}`} d={area} fill={`url(#area-grad-${i})`} />
          ))}
          {lines.map((line, i) => (
            <path
              key={`line-${i}`}
              d={line}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-1 text-[10px] text-muted">
          <span>{labels[0]}</span>
          <span>{labels[1]}</span>
          <span>{labels[2]}</span>
        </div>
      </div>
    </div>
  );
});

export const AreaChart = AreaChartRoot;
export default AreaChart;
