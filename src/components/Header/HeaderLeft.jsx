import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CompanyLogo from '../Common/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../redux/slices/filtersSlice'

const HeaderLeft = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isExploreDropDownOpen, setIsExploreDropDownOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleExploreDropDownHandler = () => {
    setIsExploreDropDownOpen(!isExploreDropDownOpen)
  }

  const categoryHandler = (category) => {
    navigate(`/Category/${category}`)
    toggleExploreDropDownHandler()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExploreDropDownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  const categoryFilter = ["Animals", "Arts & Entertainment", "Autos & Vehicles", "Business & Industrial", "Devices", "Food & Drink", "Gridfinity", "Health & Fitness", "Hobbies & Games", "Home & Garden", "People", "Pop Culture", "mask"]
  return (
    <>
      <div className='flex gap-[30px]'>
        <CompanyLogo />
        <div className='flex gap-[18px] items-center'>
          <div className='relative' ref={dropdownRef}>
            <button className='flex gap-1 items-center' onClick={toggleExploreDropDownHandler}>Explore   <svg
              className={`w-2.5 h-2.5 ms-3 ${isExploreDropDownOpen ? 'transform rotate-180' : ''}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg></button>
            {isExploreDropDownOpen && <div className="absolute z-50 h-[250px] overflow-auto w-[400px] right-0 left-0 mt-2 origin-top-right bg-white border border-gray-300 divide-y divide-gray-200 rounded-md shadow-lg">
              <div className="py-1 px-2 flex flex-wrap gap-x-10 gap-y-6">
                {categoryFilter.map((item, index) => {
                  return (
                    <div key={`drop-down-explore${Math.random() * Date.now()}`}>
                      <button className='hover:text-[#424040]' onClick={(e) => { e.preventDefault(); categoryHandler(item) }}>{index + 1}- {item}</button>
                    </div>
                  )
                })}
              </div>
            </div>}
          </div>
          <div>
            <div className="relative">
              <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="focus:outline-none flex items-center"
                type="button"
              >
                Contact Us
                <svg
                  className={`w-2.5 h-2.5 ms-3 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="z-10 absolute top-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeDpzchs43LksP8LMtUYQYnwH8HCAKpGS_xjTh2T5yQqaJ0iA/viewform" target='_blank' onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Custom designs
                      </a>
                    </li>
                    <li>
                      <a href="https://forms.gle/wf3GKqYE5VDuWVGs9" target='_blank' onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Other printing services
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeciR5hznseDBhkWU-9FoSO-uHNGI-PQFNfr8f_vB0veidoDA/viewform" target='_blank' onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Got a suggestion?
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <a href="https://medium.com/@kalyke3d" target='_blank'>Blog</a>
          </div>
          <div className='flex gap-[6px] items-center'>
            <Link to={'/coming-soon'}>Membership</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderLeft