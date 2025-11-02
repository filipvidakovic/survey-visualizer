import React from 'react';
import { useTriviaData } from './hooks/useTriviaData';
import CategoryList from './components/CategoryList';
import CategoryChart from './components/CategoryChart';
import DifficultyChart from './components/DifficultyChart';
import FilterControls from './components/FilterControls';
import QuestionsList from './components/QuestionsList'; // Add this import
import './App.css';

function App() {
  const {
    questions,
    categories,
    loading,
    categoryLoading,
    error,
    selectedCategory,
    setSelectedCategory
  } = useTriviaData();

  const handleClearFilter = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>Loading Trivia Visualizer...</h2>
          <p>Fetching available categories</p>
        </div>
      </div>
    );
  }

  if (error && !selectedCategory) {
    return (
      <div className="app">
        <div className="error">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Trivia Data Visualizer</h1>
        <p>Select a category to explore question distribution from Open Trivia DB</p>
      </header>

      <main className="app-main">
        <section className="controls-section">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            loading={loading}
          />
          
          <FilterControls
            selectedCategory={selectedCategory}
            onClearFilter={handleClearFilter}
            questionCount={questions.length}
            categoryLoading={categoryLoading}
          />
        </section>

        {error && selectedCategory && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {categoryLoading && (
          <div className="chart-loading">
            <p>Loading questions for {selectedCategory}...</p>
          </div>
        )}

        {!categoryLoading && questions.length > 0 && (
          <>
            <section className="charts-section">
              <div className="chart-row">
                <CategoryChart questions={questions} />
              </div>
              
              <div className="chart-row">
                <DifficultyChart questions={questions} />
              </div>
            </section>

            {/* Add the QuestionsList component here */}
            <section className="questions-section-wrapper">
              <QuestionsList questions={questions} />
            </section>

            <section className="data-info">
              <h3>Category Summary</h3>
              <div className="summary-cards">
                <div className="summary-card">
                  <h4>Total Questions</h4>
                  <p>{questions.length}</p>
                </div>
                <div className="summary-card">
                  <h4>Difficulty Spread</h4>
                  <p>
                    {(() => {
                      const difficulties = questions.map(q => q.difficulty);
                      const easy = difficulties.filter(d => d === 'easy').length;
                      const medium = difficulties.filter(d => d === 'medium').length;
                      const hard = difficulties.filter(d => d === 'hard').length;
                      
                      if (easy > medium && easy > hard) return 'Mostly Easy';
                      if (medium > easy && medium > hard) return 'Mostly Medium';
                      if (hard > easy && hard > medium) return 'Mostly Hard';
                      return 'Balanced';
                    })()}
                  </p>
                </div>
                <div className="summary-card">
                  <h4>Question Types</h4>
                  <p>
                    {(() => {
                      const types = questions.map(q => q.type);
                      const multiple = types.filter(t => t === 'multiple').length;
                      const boolean = types.filter(t => t === 'boolean').length;
                      return `${multiple} Multiple, ${boolean} True/False`;
                    })()}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {!selectedCategory && !loading && (
          <section className="welcome-section">
            <div className="welcome-message">
              <h3>Welcome to Trivia Visualizer</h3>
              <p>Select a category from the list above to view:</p>
              <ul>
                <li>Question distribution by category (for subcategories)</li>
                <li>Difficulty level breakdown</li>
                <li>Detailed category statistics</li>
                <li>Actual trivia questions with answers</li> {/* Updated */}
              </ul>
              <div className="feature-highlights">
                <div className="feature">
                  <h4>📊 Interactive Charts</h4>
                  <p>Visualize data with beautiful Recharts components</p>
                </div>
                <div className="feature">
                  <h4>🎯 Category Focus</h4>
                  <p>Deep dive into specific trivia categories</p>
                </div>
                <div className="feature">
                  <h4>❓ Actual Questions</h4>
                  <p>View real questions and test your knowledge</p> {/* Updated */}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;