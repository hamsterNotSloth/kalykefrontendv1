import React from 'react'

function UnAuthorized() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 flex flex-col items-center justify-center bg-white rounded shadow-md">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <p className="text-xl font-semibold text-red-500">Unauthorized Access</p>
            <p className="text-gray-600">Please sign in to view this content.</p>
      </div>
    </div>
  )
}

export default UnAuthorized
