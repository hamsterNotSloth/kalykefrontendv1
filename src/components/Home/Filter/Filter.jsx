import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilter } from '../../../redux/slices/filtersSlice';

function Filter() {
  const [activeIndex, setActiveIndex] = useState(1);
  const currentFilter = useSelector((state) => state.filtersSlice);
  const dispatch = useDispatch();

  const filterList = ["Trending", "New Uploads", "From top users"];
  const categoryFilter = ["Animals", "Arts & Entertainment", "Autos & Vehicles", "Business & Industrial", "Devices", "Food & Drink", "Gridfinity", "Health & Fitness", "Hobbies & Games", "Home & Garden", "People", "Pop Culture", "mask"]

  const handleClick = (index) => {
    setActiveIndex(index);
    querySelectorHandler(index);
  };

  const querySelectorHandler =  (index) => {
    let valueAtIndex;
    if (index >= 0 && index < filterList.length) {
      valueAtIndex = filterList[index];
       dispatch(setFilter({...currentFilter, filter: valueAtIndex}));
    } else {
      console.log("Index is out of bounds");
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    dispatch(setFilter({...currentFilter, category: category}));
  };

  return (
    <div className='p-4 max-w-[1700px] mx-auto'>
      <div className='w-full bg-white h-[50px] overflow-x-auto border flex '>
        {filterList.map((item, index) => (
          <button
            key={`FilterList at Homepage ${Math.random() * Date.now() * 0.21354}`}
            onClick={() => handleClick(index)}
            className={`border-x flex justify-center items-center w-[180px] ${activeIndex === index ? 'bg-[#000] text-white' : 'text-black'}`}
          >
            {item}
          </button>
        ))}
      <select className='px-7'
        id="category"
        onChange={handleCategoryChange}
        value={currentFilter.category}
      >
        <option value="null">Select Category</option>
        {categoryFilter.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
}

export default Filter;
