import React, { useState } from 'react';
import axios from 'axios';
import { useCreateStripeUserMutation } from '../../../redux/apiCalls/apiSlice';
import { getToken } from '../../../Token/token';
const CreateStripeUser = () => {
  const token = getToken()
  const [createStripeUser] = useCreateStripeUserMutation()

  const handleCreateStripeUser = async () => {
    try {
      const response = await createStripeUser({token})
      const { accountLinkUrl } = response.data;

      window.location.href = accountLinkUrl;
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className='px-8'>
      <h2>Create Stripe User</h2>
      <button className='bg-slate-600 text-white p-3 flex items-center justify-center' onClick={handleCreateStripeUser}>Create</button>
    </div>
  );
};

export default CreateStripeUser;
