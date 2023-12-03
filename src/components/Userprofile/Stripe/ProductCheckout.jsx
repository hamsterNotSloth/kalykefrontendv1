import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAddTransactionMutation } from '../../../redux/apiCalls/apiSlice';
import { getToken } from '../../../Token/token';

const ProductCheckout = ({ amount, email, product, sellerAccountId }) => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const token = getToken()
  const [addTransaction] = useAddTransactionMutation()
  const handleCheckout = async () => {
    try {
      setLoading(true);

      const response = addTransaction({ amount, token })

      const sessionId = response.data.sessionId;

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error redirecting to Checkout:', error.message);
      }
    } catch (error) {
      console.error('Error creating Checkout Session:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>3d modal</h2>
      <p>50</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default ProductCheckout;
