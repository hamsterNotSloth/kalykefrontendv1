import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilter } from '../../../redux/slices/filtersSlice';
import { filterList, filtersOfFreeStatus, printerFileTypes } from './filterData';
import { MultiSelect } from "react-multi-select-component";

function Filter() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isFree, setIsFree] = useState(null);
  const currentFilter = useSelector((state) => state.filtersSlice);
  const dispatch = useDispatch();

  const handleClick = (index) => {
    setActiveIndex(index);
    querySelectorHandler(index);
  };

  const querySelectorHandler = (index = 1) => {
    let valueAtIndex;
    if (index >= 0 && index < filterList.length) {
      valueAtIndex = filterList[index];
      dispatch(setFilter({ ...currentFilter, filter: valueAtIndex }));
    } else {
      console.log("Index is out of bounds");
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    dispatch(setFilter({ ...currentFilter, category: category }));
  };

  const handleToggleChange = (val) => {
    setIsFree(val);
  };
  useEffect(() => {
    dispatch(setFilter({ ...currentFilter, isFree: isFree }))
  }, [isFree])

  const [selected, setSelected] = useState([])
  useEffect(() => {
    const fileTypeParams = selected.map((type) => type.value).join(',');
    dispatch(setFilter({ ...currentFilter, fileType: fileTypeParams }))
  }, [selected])
  return (
    <div className='p-4 max-w-[1500px] mx-auto'>
      <div className='mb-2'>
      </div>
      <div className='w-full bg-white h-[50px] justify-between border flex '>
        <div className='flex'>
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
        <div className='flex items-center'>
          <div>
            {filtersOfFreeStatus.map(item => {
              return (
                <button className={`border rounded-full px-4 py-2 ${isFree == item.value && "bg-black text-white"}`} onClick={() => handleToggleChange(item.value)}>{item.text}</button>
              )
            })}
          </div>
          <div className='w-[229px] ml-3'>
            <MultiSelect
              options={printerFileTypes}
              value={selected}
              onChange={setSelected}
              labelledBy="All File Types"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
