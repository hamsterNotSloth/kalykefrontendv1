import React, {  useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAddTransactionMutation } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
const exchangeRateApi = process.env.REACT_APP_EXCHANGERATE_API;
const locationApi = process.env.REACT_APP_GEO_API;

const ProductCheckout = ({ product }) => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [asLocation, setAsLocation] = useState(false)
  const [allowLocation, setAllowLocation] = useState(false)
  const token = getToken()
  const [countryCode, setCountryCode] = useState("")
  const [addTransaction, { error }] = useAddTransactionMutation()

  const convertToLocalPrice = async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${exchangeRateApi}/pair/usd/${countryCode}`);
      return response?.data?.conversion_rate
    } catch (error) {
      console.error('Error fetching exchange rate:', error.message);
      toast.error("Error while fetching exchange rate. Please unable your location.")
      return null;
    }
  };

  const getLocation = async () => {
    try {
      if ('geolocation' in navigator) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${locationApi}&q=${latitude}+${longitude}&pretty=1`);
        const country = response.data.results[0].annotations.currency.iso_code;
  
        setCountryCode(country);
        return country;
      }
    } catch (error) {
      console.error('Error getting user location:', error.message);
      return null; 
    }
  };

  const handleCheckout = async () => {
    try {
      const location = await getLocation()
      setAsLocation(!asLocation)
      setLoading(true);
      if(!location) {
        setLoading(false);
        return;
      }
      const exchangeRate = await convertToLocalPrice()
      if(!exchangeRate) {
        setLoading(false);
        return;
      }
      const response = await addTransaction({ amount: product.price, token, productId: product._id, countryCode: location, exchangeRate })
      if(response?.error?.data?.message) {
        return toast.error(response?.error?.data?.message)
      }
      const sessionId = response.data.sessionId;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error redirecting to Checkout:', error.message);
      }
      setAllowLocation(false)
    } catch (error) {
      if (error.code === error.PERMISSION_DENIED) {
        console.error('User blocked location access');
        setAllowLocation(true)
        toast.error('Please allow location access to proceed with the purchase.');
      } else {
        console.error('Error getting user location:', error.message);
      }
      return null;
    }
  };

  return (
    <div className='mb-3'>
      <button className='bg-[#2f85ff] hover:bg-[#809ee2] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full' onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : `Buy: $${product.price}`}
      </button>
      {allowLocation && <span className='text-[#ff0000]'>Please allow location to download</span>}
    </div>
  );
};

export default ProductCheckout;
