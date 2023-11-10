import React, { useState } from 'react';
import { useGetAllProductsQuery } from '../../../redux/apiCalls/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilter } from '../../../redux/slices/filtersSlice';

function Filter() {
  const [activeIndex, setActiveIndex] = useState(null);
  const currentFilter = useSelector((state) => state.filtersSlice);
  const { refetch: refetchAllProducts } = useGetAllProductsQuery(currentFilter);
  const dispatch = useDispatch();

  const filterList = ["Trending", "New Uploads", "From top designers", "Default"];

  const handleClick = (index) => {
    setActiveIndex(index);
    querySelectorHandler(index);
  };

  const querySelectorHandler = async (index) => {
    let valueAtIndex;
    if (index >= 0 && index < filterList.length) {
      valueAtIndex = filterList[index];
      await dispatch(setFilter(valueAtIndex));
    } else {
      console.log("Index is out of bounds");
    }
    if(valueAtIndex == "Default") {
     return dispatch(clearFilter())
    }
    refetchAllProducts(valueAtIndex);
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
      </div>
    </div>
  );
}

export default Filter;
