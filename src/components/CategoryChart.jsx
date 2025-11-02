import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CategoryChart = ({ questions }) => {
  // Process data for category distribution
  const processCategoryData = () => {
    const categoryCounts = {};
    
    questions.forEach(question => {
      const category = question.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    
    return Object.entries(categoryCounts).map(([name, count]) => ({
      name: name.replace('Entertainment: ', '').replace('Science: ', ''),
      count
    })).sort((a, b) => b.count - a.count);
  };

  const data = processCategoryData();

  return (
    <div className="chart-container">
      <h3>Questions by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            fontSize={12}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="count" 
            fill="#8884d8" 
            name="Number of Questions"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;