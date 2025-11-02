import React from 'react';

const FilterControls = ({ 
  selectedCategory, 
  onClearFilter, 
  questionCount,
  categoryLoading 
}) => {
  return (
    <div className="filter-controls">
      <div className="filter-info">
        <h3>
          {selectedCategory 
            ? `Showing questions for: ${selectedCategory.replace('Entertainment: ', '').replace('Science: ', '')}`
            : 'Select a category to view questions'
          }
        </h3>
        {selectedCategory && (
          <p>
            {categoryLoading 
              ? 'Loading questions...' 
              : `Displaying ${questionCount} questions`
            }
          </p>
        )}
      </div>
      {selectedCategory && (
        <button 
          className="clear-filter-btn" 
          onClick={onClearFilter}
          disabled={categoryLoading}
        >
          {categoryLoading ? 'Loading...' : 'View All Categories'}
        </button>
      )}
    </div>
  );
};

export default FilterControls;