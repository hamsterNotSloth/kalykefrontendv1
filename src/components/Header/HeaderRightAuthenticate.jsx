import React, { useState } from 'react'
import Signup from '../Authentication/signup/Signup'

function HeaderRightAuthenticate() {
    const [signUpModalStatus, setSignUpModalStatus] = useState(false)
  return (
    <>
      {signUpModalStatus && <Signup setSignUpModalStatus={setSignUpModalStatus} />}
      <button className='px-4 font-semibold py-2 bg-white rounded-sm hover:bg-[#d5d5d5] hover:text-dark border-dark border' onClick={() => setSignUpModalStatus(true)}>Sign up</button>
    </>
  )
}

export default HeaderRightAuthenticate
