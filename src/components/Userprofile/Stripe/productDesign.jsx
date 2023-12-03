import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements, Elements, EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProductCheckout from './ProductCheckout';
import { useAddTransactionMutation } from '../../../redux/apiCalls/apiSlice';
import { getToken } from '../../../Token/token';
const stripePromise = loadStripe('pk_test_51OI4miLzxkeRIY0ykMbc3SB2QOIfGz3yKGjqIueZTNAYmXrm98wSrnheGbeHoNn66RsxjXL6m3NAfbEozKh74XSf00iHPej8HN');

const DesignUpload = () => {
    const [amount, setAmount] = useState(0);
    const [secret, setSecret] = useState("")
    const token = getToken()

    const [addTransaction] = useAddTransactionMutation()
    const handleOrder = async () => {
        try {
            const response = addTransaction({ amount, token })
            const clientSecret = response.data.clientSecret;
            setSecret(clientSecret)
            const stripe = window.Stripe('pk_test_51OI4miLzxkeRIY0ykMbc3SB2QOIfGz3yKGjqIueZTNAYmXrm98wSrnheGbeHoNn66RsxjXL6m3NAfbEozKh74XSf00iHPej8HN');
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: stripe.elements.getElement('card'),
                    billing_details: {
                        name: 'Customer Name',
                    },
                },
            });

            if (error) {
                console.error('Payment failed:', error);
            } else {
                console.log('Payment succeeded!');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <h2>Order Design</h2>
            {/* <label htmlFor="amount">Amount:</label>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            /> */}
            <Elements stripe={stripePromise}>
                <ProductCheckout />
            </Elements>
            {/* <button onClick={handleOrder}>Order Now</button> */}
        </div>
    );
};

export default DesignUpload;
