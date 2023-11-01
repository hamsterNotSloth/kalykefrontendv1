import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    title: '',
    description: '',
    category: null,
    modalSetting: '',
    modalRawData: null,
    modal: {},
    images: [],
  },
  reducers: {
    updateProductDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetProductDetails: (state) => {
      return {
        title: '',
        description: '',
        category: null,
        modalSetting: '',
        modalRawData: null,
        modal: null,
        images: [],
      };
    },
  },
});

export const { updateProductDetails, resetProductDetails } = productSlice.actions;
export default productSlice.reducer;
