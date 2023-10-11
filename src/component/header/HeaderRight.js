import { faBullhorn, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const HeaderRight = ({setSignUpModalStatus}) => {
  return (
    <>
      <div className='flex justify-between items-center gap-[20px]'>
        <div className='w-[40px] h-[40px] bg-[#8d8d91] justify-center rounded-[90px] flex items-center'>
          <button onClick={()=> setSignUpModalStatus(true)}>
            <FontAwesomeIcon icon={faUpLong} className='text-[#ffff] text-[21px]' />
          </button>
        </div>
        <div className='w-[40px] h-[40px] bg-[#8d8d91] justify-center rounded-[90px] flex items-center'>
          <FontAwesomeIcon icon={faBullhorn} className='text-[#ffff] text-[21px]' />
        </div>
      </div>
    </>
  )
}

export default HeaderRight