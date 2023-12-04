import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAddTransactionMutation } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';

const ProductCheckout = ({ product }) => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const token = getToken()
  const [addTransaction] = useAddTransactionMutation()
  const handleCheckout = async () => {
    try {
      setLoading(true);

      const response = await addTransaction({ amount:product.price, token, productId: product._id })
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
      <button className='bg-[#2f85ff] mb-3 hover:bg-[#809ee2] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full' onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : `Buy: ${product.price} USD`}
      </button>
    </div>
  );
};

export default ProductCheckout;
