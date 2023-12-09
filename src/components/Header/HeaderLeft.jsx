import { faBriefcase, faCar, faCaretDown, faDice, faFireFlameCurved, faGear, faHouse, faLayerGroup, faMasksTheater, faMobile, faPaintBrush, faPaw, faPerson, faPersonSkiing, faUtensils } from '@fortawesome/free-solid-svg-icons'
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
  const dropExploredownRef = useRef(null);
  const dropdownRef = useRef(null)
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
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropExploredownRef.current && !dropExploredownRef.current.contains(event.target)) {
        setIsExploreDropDownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropExploredownRef]);

  const categoryFilter = [{ categoryName: "Animals", icon: faPaw }, { categoryName: "Arts & Entertainment", icon: faPaintBrush }, { categoryName: "Autos & Vehicles", icon: faCar }, { categoryName: "Business & Industrial", icon: faBriefcase }, { categoryName: "Devices", icon: faMobile }, { categoryName: "Food & Drink", icon: faUtensils }, { categoryName: "Gridfinity", icon: faGear }, { categoryName: "Health & Fitness", icon: faPersonSkiing }, { categoryName: "Hobbies & Games", icon: faDice }, { categoryName: "Home & Garden", icon: faHouse }, { categoryName: "People", icon: faPerson }, { categoryName: "Pop Culture", icon: faFireFlameCurved }, { categoryName: "mask", icon: faMasksTheater }]
  return (
    <>
      <div className='flex gap-[30px]'>
        <CompanyLogo />
        <div className='flex gap-[18px] items-center'>
          <div className='relative' ref={dropExploredownRef}>
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
            {isExploreDropDownOpen && <div className="absolute z-50  overflow-auto w-[650px] right-0 left-0 mt-2 origin-top-right bg-white border border-gray-300 divide-y divide-gray-200 rounded-md shadow-lg">
              <div className="px-5 py-4">
                <span className='mb-4 flex items-center font-medium'><FontAwesomeIcon icon={faLayerGroup} /> Categories:</span>
                <div className='flex flex-wrap gap-x-6 gap-y-6'>
                  {categoryFilter.map((item, index) => {
                    return (
                      <div className='w-[180px]' key={`drop-down-explore${Math.random() * Date.now()}`}>
                        <button className='hover:text-[#424040]' onClick={(e) => { e.preventDefault(); categoryHandler(item.categoryName) }}> <FontAwesomeIcon icon={item.icon} /> {item.categoryName}</button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>}
          </div>
          <div>
            <div className="relative" ref={dropdownRef}>
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
                    <li>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeciR5hznseDBhkWU-9FoSO-uHNGI-PQFNfr8f_vB0veidoDA/viewform" target='_blank' onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Promotion
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