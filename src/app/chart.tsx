"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartProps {
  labels: string[];
  data: number[];
  title: string;
}

const ChartComponent: React.FC<ChartProps> = ({ labels, data, title }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart>();

  useEffect(() => {
    let chartInstance: Chart;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        // Destroy existing chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create new chart instance
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: title,
                data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    weight: 'bold', // Make y-axis ticks bold
                  },
                },
              },
              x: {
                ticks: {
                  font: {
                    weight: 'bold', // Make x-axis ticks bold
                  },
                },
              },
            },
          },
        });

        // Store the chart instance reference
        chartInstanceRef.current = chartInstance;
      }
    }

    return () => {
      // Cleanup: Destroy chart instance when component unmounts
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [labels, data, title]);

  return (
    <div id='bar-chart'>
      <h2>{title}</h2>
      <canvas ref={chartRef} style={{ width: '100%' }} />
    </div>
  );
};

export default ChartComponent;
