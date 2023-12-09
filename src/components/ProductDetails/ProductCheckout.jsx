import React, { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAddTransactionMutation } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const ProductCheckout = ({ product }) => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const token = getToken()
  const [countryCode, setCountryCode] = useState("")
  const [addTransaction, { error }] = useAddTransactionMutation()

  const convertToLocalPrice = async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/490182da2536bbc83d22b4e8/pair/usd/${countryCode}`);
      return response?.data?.conversion_rate
    } catch (error) {
      console.error('Error fetching exchange rate:', error.message);
      return 1;
    }
  };


  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=3199df66be6d4fc1af1468430ae55f63&q=${latitude}+${longitude}&pretty=1`);
            const country = response.data.results[0].annotations.currency.iso_code            ;
            setCountryCode(country)
          } catch (error) {
            console.error('Error getting country code:', error.message);
          }
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    getLocation()
  }, [])
  const handleCheckout = async () => {
    try {
      // const IPAddress = await getIPAddress()
      // console.log(IPAddress,'IPAddress')
      setLoading(true);
      const exchangeRate = await convertToLocalPrice()
      const response = await addTransaction({ amount: product.price, token, productId: product._id, countryCode, exchangeRate })
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
      <button onClick={convertToLocalPrice}>test</button>
    </div>
  );
};

export default ProductCheckout;
