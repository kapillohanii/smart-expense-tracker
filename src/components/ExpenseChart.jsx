import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import '../styles.css'

const ExpenseChart = ({ expenses }) => {
  const [predictedCategories, setPredictedCategories] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const predictCategories = async () => {
      try {
        const response = await axios.post("http://localhost:5000/predict", {
          descriptions: expenses.map((expense) => expense.description),
        });
        console.log(response.data['predictions'])
        const { categories } = response.data;
        setPredictedCategories(categories);
      } catch (error) {
        console.error("Failed to fetch predicted categories:", error);
      }
    };

    predictCategories();
  }, [expenses]);

  useEffect(() => {
    if (chartRef.current && predictedCategories && predictedCategories.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      const categories = {};

      expenses.forEach((expense, index) => {
        const category = predictedCategories[index] || "Miscellaneous";

        if (categories[category]) {
          categories[category] += expense.amount;
        } else {
          categories[category] = expense.amount;
        }
      });

      const chartData = {
        labels: Object.keys(categories),
        datasets: [
          {
            label: "Expenses",
            data: Object.values(categories),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderWidth: 1,
          },
        ],
      };

      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            x: {
              type: "category",
              labels: Object.keys(categories),
            },
          },
        },
      });
    }
  }, [predictedCategories, expenses]);

  return (
    <div className="chart-container">
      {<canvas ref={chartRef} />}
    </div>
  );
};

export default ExpenseChart;
