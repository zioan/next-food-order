import { useContext } from 'react';
import CategoryContext from '../../../context/CategoryContext';
import axios from 'axios';

function DeleteCategory() {
  const { categories, getCategories } = useContext(CategoryContext);

  const deleteHandler = async (name) => {
    if (window.confirm(`Are you sure you want to delete "${categories.id}"?`)) {
      await axios.delete(`/api/category/${name}`).then(() => getCategories());
    }
  };

  return (
    <>
      <h2 className=' mb-4 underline'>DeleteCategory</h2>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category._id} onClick={() => deleteHandler(category.name)}>
              {category.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default DeleteCategory;
