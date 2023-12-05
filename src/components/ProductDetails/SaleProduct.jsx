import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements, Elements, EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getToken } from '../../Token/token';
import { useAddTransactionMutation } from '../../redux/apiCalls/apiSlice';
import ProductCheckout from './ProductCheckout';
const stripe_public = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe('pk_test_51OI4miLzxkeRIY0ykMbc3SB2QOIfGz3yKGjqIueZTNAYmXrm98wSrnheGbeHoNn66RsxjXL6m3NAfbEozKh74XSf00iHPej8HN');

const DesignUpload = ({product}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <ProductCheckout product={product}/>
            </Elements>
        </div>
    );
};

export default DesignUpload;
