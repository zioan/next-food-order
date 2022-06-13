import { useContext } from 'react';
import Image from 'next/image';
import CategoryContext from '../../../context/CategoryContext';
import axios from 'axios';

function DeleteCategory() {
  const { categories, getCategories } = useContext(CategoryContext);

  const deleteHandler = async (name) => {
    if (window.confirm(`Are you sure you want to delete selected category?`)) {
      await axios.delete(`/api/category/${name}`).then(() => getCategories());
    }
  };

  return (
    <>
      <h2 className=' mb-6 underline text-xl'>Click a category to delete</h2>
      <ul className='flex gap-4'>
        {categories.map((category) => {
          return (
            <li
              key={category._id}
              onClick={() => deleteHandler(category.name)}
              className='flex flex-col items-center cursor-pointer border-2'
            >
              {category.name}
              <div className=' max-w-[200px]'>
                <Image
                  src={`/uploads/${category.image}`}
                  alt={category.name}
                  width='150'
                  height='100'
                  // layout='responsive'
                  // objectFit='contain'
                />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default DeleteCategory;
