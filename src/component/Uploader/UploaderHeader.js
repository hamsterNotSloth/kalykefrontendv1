import React from 'react'

function UploaderHeader({setSignUpModalStatus}) {
  return (
    <div className='flex justify-between mb-10'>
      <ul className='flex gap-3'>
        <li>
            Upload
        </li>
        <li>
            Details
        </li>
        <li>
            Finished
        </li>
      </ul>
      <button onClick={() => setSignUpModalStatus(false)} className="text-dark text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default UploaderHeader
