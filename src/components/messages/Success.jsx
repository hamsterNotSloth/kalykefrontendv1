import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';

function Success() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const productId = queryParams.get('productId');

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 bg-white rounded shadow-md">
                <svg
                    className="w-16 h-16 mx-auto mb-4 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <p className="text-xl font-semibold text-gray-800">Payment Successful!</p>
                <p className="text-gray-600">Thank you for your purchase.</p>
                <Link to={`/products/${productId}`} className="mt-4 px-4 flex justify-center py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-700">
                    Go to model
                </Link>
            </div>
        </div>
    )
}

export default Success
