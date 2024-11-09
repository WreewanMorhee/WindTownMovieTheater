// app/components/DonutChart.tsx
import React from 'react';

interface DonutChartProps {
  value: number; // Value between 0 and 10
}

const DonutChart: React.FC<DonutChartProps> = ({ value }) => {
  const max = 10;
  const strokeWidth = 10; // Updated stroke width to 30
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;

  // Set the color based on the value
  let color = '';
  if (value > 9) color = 'yellow';
  else if (value > 7) color = 'green';
  else if (value > 5) color = 'gold';
  else if (value > 3) color = 'orange';
  else color = 'red';

  return (
    <div className="flex items-start">
      <svg
        className="w-[60px] h-[60px]"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          className="text-gray-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Foreground Circle (Progress) */}
        <circle
          className="transition-all"
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx="50"
          cy="50"
          style={{ transition: 'stroke-dashoffset 0.5s, stroke 0.5s' }}
        />
        {/* Text in the middle */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dy=".3em"
          fontSize="28px"
          fontWeight="bold"
          fill="white"
        >
          {value.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

export default DonutChart
