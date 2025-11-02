import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DifficultyChart = ({ questions }) => {
  // Process data for difficulty distribution
  const processDifficultyData = () => {
    const difficultyCounts = {
      easy: 0,
      medium: 0,
      hard: 0
    };
    
    questions.forEach(question => {
      if (difficultyCounts.hasOwnProperty(question.difficulty)) {
        difficultyCounts[question.difficulty]++;
      }
    });
    
    return Object.entries(difficultyCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  };

  const data = processDifficultyData();
  
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="chart-container">
      <h3>Questions by Difficulty</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyChart;