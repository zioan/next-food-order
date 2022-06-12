import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const productsData = await axios.get('/api/category');
      // console.log(productsData.data.categories);
      setCategories(productsData.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/category/${id}`).then(() => getCategories());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
