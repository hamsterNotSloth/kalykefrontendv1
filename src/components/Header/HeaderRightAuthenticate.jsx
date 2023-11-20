import React, { useState } from 'react'
import Signup from '../Authentication/signup/Signup'

function HeaderRightAuthenticate() {
    const [signUpModalStatus, setSignUpModalStatus] = useState(false)
  return (
    <>
      {signUpModalStatus && <Signup setSignUpModalStatus={setSignUpModalStatus} />}
      <button onClick={() => setSignUpModalStatus(true)}>SignUp</button>
    </>
  )
}

export default HeaderRightAuthenticate
