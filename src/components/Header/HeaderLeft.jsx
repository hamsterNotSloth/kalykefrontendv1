import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../Common/Logo'

const HeaderLeft = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className='flex gap-[30px]'>
          <CompanyLogo />
        <div className='flex gap-[18px] items-center'>
          <button>Explore</button>
          <div className='flex gap-[6px] items-center'>
            <Link to={'/coming-soon'}>Membership</Link>
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
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Custom designs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Other printing services
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Got a suggestion
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderLeft
