import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vendorProducts: [],
  vendorOrders: [],
  vendorStats: {
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    ratings: {
      average: 0,
      count: 0
    }
  },
  vendorStoreInfo: {
    storeName: '',
    storeDescription: '',
    isActive: true,
    storeImage: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      website: ''
    }
  },
  loading: false,
  error: null
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    // Product management
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.vendorProducts = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.vendorProducts.push(action.payload);
      state.loading = false;
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      const index = state.vendorProducts.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.vendorProducts[index] = action.payload;
      }
      state.loading = false;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.vendorProducts = state.vendorProducts.filter(
        (product) => product._id !== action.payload
      );
      state.loading = false;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Order management
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.vendorOrders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOrderStatusSuccess: (state, action) => {
      const index = state.vendorOrders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state.vendorOrders[index] = action.payload;
      }
      state.loading = false;
    },
    updateOrderStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Dashboard stats
    fetchStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action) => {
      state.vendorStats = action.payload;
      state.loading = false;
    },
    fetchStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Store info management
    fetchStoreInfoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStoreInfoSuccess: (state, action) => {
      state.vendorStoreInfo = action.payload;
      state.loading = false;
    },
    fetchStoreInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStoreInfoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateStoreInfoSuccess: (state, action) => {
      state.vendorStoreInfo = action.payload;
      state.loading = false;
    },
    updateStoreInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset vendor state (e.g., on logout)
    resetVendorState: () => initialState
  }
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  updateOrderStatusStart,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
  fetchStoreInfoStart,
  fetchStoreInfoSuccess,
  fetchStoreInfoFailure,
  updateStoreInfoStart,
  updateStoreInfoSuccess,
  updateStoreInfoFailure,
  resetVendorState
} = vendorSlice.actions;

export default vendorSlice.reducer;