import React, { useState } from 'react'
import HeaderLeft from './HeaderLeft'
import HeaderInputField from './HeaderInputField'
import HeaderRight from './HeaderRight'
import Signup from '../Authentication/signup/Signup'

const Header = () => {
  const [signUpModalStatus, setSignUpModalStatus] = useState(false)

  return (
    <>
      <div className='flex py-4 px-6 justify-between items-center'>
        <HeaderLeft />
        {signUpModalStatus ? <Signup setSignUpModalStatus={setSignUpModalStatus} /> : null}
        <HeaderInputField />
        <HeaderRight setSignUpModalStatus={setSignUpModalStatus} />
      </div>
    </>
  )
}

export default Header