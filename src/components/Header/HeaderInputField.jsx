import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../redux/slices/filtersSlice'

const HeaderInputField = () => {
  const [search, setSearch] = useState('')
  const currentFilter = useSelector((state) => state.filtersSlice);
  const dispatch = useDispatch();
  
    const getSearchProductsHandler = () => {
      dispatch(setFilter({...currentFilter, searchBar: search}));
  }

  return (
   <>
   <form className='flex'>
     <input onChange={e => setSearch(e.target.value)} className='bg-[#e5e5ea] w-[600px] rounded-lg focus:outline-none px-3 ' placeholder='Search By specifc words or full sentence of the title,'/>
       <Link onClick={getSearchProductsHandler} to={'/search-results'}>
       <FontAwesomeIcon icon={faMagnifyingGlass} className='ml-[-40px] p-2' />
    </Link>
   </form>
   </>
  )
}

export default HeaderInputField