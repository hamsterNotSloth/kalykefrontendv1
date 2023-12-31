import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetproductQuery } from "../redux/apiCalls/apiSlice";
import ProductDetailsPage from "../pages/ProductDetailsPage";

const ProductNotFoundProtectedRoute = () => {
  const { id } = useParams()
  const { data: productDetails, error: productDetailsError } = useGetproductQuery(id)
const navigate = useNavigate();
  useEffect(() => {
    if (!productDetails && productDetailsError) {
      return navigate("/not-found", { state: { errorStatus: productDetailsError } });
    }
  }, [productDetails, id, productDetailsError]);

  return <ProductDetailsPage />;
  
}

export default ProductNotFoundProtectedRoute