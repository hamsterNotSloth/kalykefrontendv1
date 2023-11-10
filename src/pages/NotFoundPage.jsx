import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetproductQuery } from '../redux/apiCalls/apiSlice';

const NotFoundPage = () => {
  const {state} = useLocation();
  const errorStatus = state ? state.errorStatus : null;
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">{errorStatus ? errorStatus.status: "404"}</h1>
        <p className="text-xl text-gray-700 mt-4">{errorStatus  && errorStatus.status? errorStatus.data?.message : "The resource you are looking for does not exist, it may have been deleted."}</p>
        <Link to="/user-profile" className="text-blue-500 mt-4 block hover:underline">Go back to the home page</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
