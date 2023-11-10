import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const HeaderLeft = () => {
  return (
    <>
      <div className='flex gap-[30px]'>
        <h1 className='text-[30px] font-semibold'><Link to="/" className='flex gap-[12px] items-center'>
          Kalyke</Link></h1>
        <div className='flex gap-[6px] items-center'>
          <button>Explore</button>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
    </>
  )
}

export default HeaderLeft