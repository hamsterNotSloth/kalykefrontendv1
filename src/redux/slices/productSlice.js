import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    title: '',
    description: '',
    price: 0,
    tags: [],
    category: null,
    modalSetting: '',
    modal: [],
    images: []
  },
  reducers: {
    updateProductDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetProductDetails: (state) => {
      return {
        title: '',
        description: '',
        price: 0,
        tags: [],
        category: null,
        modalSetting: '',
        modal: [],
        images: []
      };
    },
  },
});

export const { updateProductDetails, resetProductDetails } = productSlice.actions;
export default productSlice.reducer;
