import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const HeaderInputField = () => {
  return (
   <>
   <form className='flex'>
    <input className='bg-[#e5e5ea] w-[600px] rounded-lg focus:outline-none px-3 ' placeholder='Search By Text,"Exact Phrases" ,or Upload'/>
    <button>
    <FontAwesomeIcon icon={faMagnifyingGlass} className='ml-[-40px] p-2' />
    </button>
   </form>
   </>
  )
}

export default HeaderInputField