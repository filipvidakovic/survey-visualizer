import React from 'react';

const CategoryList = ({ categories, selectedCategory, onCategorySelect, loading }) => {
  const uniqueCategories = [...new Set(categories.map(cat => cat.name))].sort();

  if (loading) {
    return (
      <div className="category-list">
        <h3>Categories</h3>
        <div className="loading-categories">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="category-list">
      <h3>Categories</h3>
      <p className="category-instruction">
        Select a category to view question distribution
      </p>
      <div className="category-buttons">
        <button
          className={`category-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          Clear Selection
        </button>
        {uniqueCategories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategorySelect(category)}
            disabled={loading}
          >
            {category.replace('Entertainment: ', '').replace('Science: ', '')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;