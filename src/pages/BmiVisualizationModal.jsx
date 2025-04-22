import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function BmiVisualizationModal({ profile, allProfiles, onClose }) {
  const bmiValues = allProfiles.map(p => parseFloat(p.BMI)).filter(Boolean).sort((a, b) => a - b);
  const currentBMI = parseFloat(profile.BMI);
  const bins = Array(20).fill(0);
  const min = Math.min(...bmiValues);
  const max = Math.max(...bmiValues);
  const step = (max - min) / bins.length;

  bmiValues.forEach(bmi => {
    const idx = Math.min(Math.floor((bmi - min) / step), bins.length - 1);
    bins[idx]++;
  });

  const labels = bins.map((_, i) => `${(min + i * step).toFixed(1)}–${(min + (i + 1) * step).toFixed(1)}`);
  const highlightIdx = Math.min(Math.floor((currentBMI - min) / step), bins.length - 1);

  const barColors = bins.map((_, i) => i === highlightIdx ? 'rgba(255, 99, 132, 0.8)' : 'rgba(54, 162, 235, 0.7)');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">BMI Distribution</h2>
        <p className="mb-2 text-sm text-gray-600">This profile’s BMI: <strong>{currentBMI}</strong></p>
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: 'BMI Distribution',
                data: bins,
                backgroundColor: barColors,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: { ticks: { maxRotation: 90, minRotation: 45 } },
              y: { beginAtZero: true },
            },
          }}
        />
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
