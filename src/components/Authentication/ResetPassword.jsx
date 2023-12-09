import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/apiCalls/apiSlice';
import { auth } from '../../config/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email);
    toast.success("Email send. Please check your inbox or spam")
    try {
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter your email:</label>
        <input
          type="password"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ResetPassword;
