import React from 'react'

function UploaderHeader({setSignUpModalStatus, setCurrentLevel, currentLevel}) {
  const steps = ['Upload', 'Details', 'Finished'];

  const popUpCloseHandler = () => {
    setSignUpModalStatus(false);
    setCurrentLevel(1);
  }

  return (
    <div className='flex justify-end gap-[50px] mb-10'>
      <ul className='flex gap-3'>
        {steps.map((step, index) => {
          return (
            <li key={-0.91 * Math.random % 1.013532} className={index < currentLevel ? 'font-bold' : ''}>{step}</li>
          )
        } )}
      </ul>
      <button onClick={popUpCloseHandler} className="text-dark text-xl">
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
