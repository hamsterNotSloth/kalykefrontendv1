import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    title: '',
    description: '',
    tags: [],
    category: null,
    modalSetting: '',
    modal: [],
    images: [],
    price: 0
  },
  reducers: {
    updateProductDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetProductDetails: (state) => {
      return {
        title: '',
        description: '',
        tags: [],
        category: null,
        modalSetting: '',
        modal: [],
        images: [],
        price: 0
      };
    },
  },
});

export const { updateProductDetails, resetProductDetails } = productSlice.actions;
export default productSlice.reducer;
