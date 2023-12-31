import React, {  useEffect, useState } from 'react';
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
  const [toggleLocation, setToggleLocation] = useState(false)
  const convertToLocalPrice = async () => {
    try {
      const countryCode = localStorage.getItem('currencyCode')
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${exchangeRateApi}/pair/usd/${countryCode}`);
      setAllowLocation(false)
      return response?.data?.conversion_rate
    } catch (error) {
      console.error('Error fetching exchange rate:', error.message);
      toast.error("Error while fetching exchange rate. Please unable your location.")
      setAllowLocation(true)
      return null;
    }
  };

  const getLocation = async () => {
    try {
      setLoading(true);
      if ('geolocation' in navigator) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${locationApi}&q=${latitude}+${longitude}&pretty=1`);
        const country = response.data.results[0].annotations.currency.iso_code;
        setCountryCode(country);
        localStorage.setItem('currencyCode', country);
      setLoading(false);
      setAllowLocation(false)
        return country;
      }
    } catch (error) {
      console.error('Error getting user location:', error.message);
      setLoading(false);
      setAllowLocation(true)
      return null; 
    }
    setLoading(false);
  };
  useEffect(() => {
    getLocation()
  }, [toggleLocation])
  const handleCheckout = async () => {
    try {
      const location = localStorage.getItem('currencyCode');
      setToggleLocation(true)
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
        setLoading(false);
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
      setLoading(false);
    } catch (error) {
        toast.error(error.message || 'Please allow location access to proceed with the purchase.');
        setLoading(false);
    }
  };

  return (
    <div className='mb-3'>
      <button className='bg-[#2f85ff] hover:bg-[#809ee2] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full' onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : `Buy: $${product.price}`}
      </button>
      {allowLocation && <span className='text-[#ff0000]'>Your location might be turned off. Please turn on location by following this <a href='https://www.wikihow.com/Enable-Location-Services-on-Google-Chrome' className='text-[#384bf7]' target='_blank' rel='noopener noreferrer'>tutorial</a> or head over to the FAQ page</span>}
    </div>
  );
};

export default ProductCheckout;
