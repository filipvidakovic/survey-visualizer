import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://opentdb.com/api.php';
const CATEGORY_URL = import.meta.env.VITE_CATEGORY_URL || 'https://opentdb.com/api_category.php';

export const useTriviaData = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(CATEGORY_URL);
      const data = await response.json();
      setCategories(data.trivia_categories);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch categories');
      setLoading(false);
    }
  }, []);

  // Fetch questions for a specific category
  const fetchQuestionsByCategory = useCallback(async (categoryId, categoryName) => {
    try {
      setCategoryLoading(true);
      setError(null);
      
      // Fetch 50 questions from the selected category
      const response = await fetch(
        `${API_BASE_URL}?amount=50&category=${categoryId}`
      );
      const data = await response.json();
      
      if (data.response_code === 1) {
        // If we don't get enough questions, try with a smaller amount
        const response2 = await fetch(
          `${API_BASE_URL}?amount=30&category=${categoryId}`
        );
        const data2 = await response2.json();
        
        if (data2.results) {
          const questionsWithCategory = data2.results.map(q => ({
            ...q,
            category: categoryName
          }));
          setQuestions(questionsWithCategory);
        }
      } else if (data.results) {
        const questionsWithCategory = data.results.map(q => ({
          ...q,
          category: categoryName
        }));
        setQuestions(questionsWithCategory);
      } else {
        setError('No questions found for this category');
        setQuestions([]);
      }
      
      setCategoryLoading(false);
    } catch (err) {
      setError('Failed to fetch questions for this category');
      setCategoryLoading(false);
    }
  }, []);

  // Handle category selection
  const handleCategorySelect = useCallback(async (category) => {
    if (!category) {
      setSelectedCategory(null);
      setQuestions([]);
      setError(null);
      return;
    }

    setSelectedCategory(category);
    const categoryObj = categories.find(cat => cat.name === category);
    
    if (categoryObj) {
      await fetchQuestionsByCategory(categoryObj.id, category);
    }
  }, [categories, fetchQuestionsByCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    questions,
    categories,
    loading,
    categoryLoading,
    error,
    selectedCategory,
    setSelectedCategory: handleCategorySelect
  };
};