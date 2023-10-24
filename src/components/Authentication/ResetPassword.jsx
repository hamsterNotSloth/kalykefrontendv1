import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/apiCalls/apiSlice';

function ResetPassword() {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [resetPassword] = useResetPasswordMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await resetPassword({token: resetToken, password})
    console.log(response, 'response')
    try {
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ResetPassword;
