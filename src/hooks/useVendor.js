import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
  fetchStoreInfoStart,
  fetchStoreInfoSuccess,
  fetchStoreInfoFailure
} from '../redux/vendor/vendorSlice';
import {
  getVendorProducts,
  getVendorOrders,
  getVendorStats,
  getVendorProfile
} from '../services/vendorService';

/**
 * Hook to fetch and manage vendor products
 * @returns {Object} Products and loading state
 */
export const useVendorProducts = () => {
  const dispatch = useDispatch();
  const { vendorProducts, loading, error } = useSelector((state) => state.vendor);
  
  const fetchProducts = async () => {
    try {
      dispatch(fetchProductsStart());
      const products = await getVendorProducts();
      dispatch(fetchProductsSuccess(products));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return { 
    products: vendorProducts, 
    loading, 
    error, 
    refetchProducts: fetchProducts 
  };
};

/**
 * Hook to fetch and manage vendor orders
 * @returns {Object} Orders and loading state
 */
export const useVendorOrders = () => {
  const dispatch = useDispatch();
  const { vendorOrders, loading, error } = useSelector((state) => state.vendor);
  
  const fetchOrders = async () => {
    try {
      dispatch(fetchOrdersStart());
      const orders = await getVendorOrders();
      dispatch(fetchOrdersSuccess(orders));
    } catch (error) {
      dispatch(fetchOrdersFailure(error.message));
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  return { 
    orders: vendorOrders, 
    loading, 
    error, 
    refetchOrders: fetchOrders 
  };
};

/**
 * Hook to fetch and manage vendor dashboard stats
 * @returns {Object} Stats and loading state
 */
export const useVendorStats = () => {
  const dispatch = useDispatch();
  const { vendorStats, loading, error } = useSelector((state) => state.vendor);
  
  const fetchStats = async () => {
    try {
      dispatch(fetchStatsStart());
      const stats = await getVendorStats();
      dispatch(fetchStatsSuccess(stats));
    } catch (error) {
      dispatch(fetchStatsFailure(error.message));
    }
  };
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  return { 
    stats: vendorStats, 
    loading, 
    error, 
    refetchStats: fetchStats 
  };
};

/**
 * Hook to fetch and manage vendor store information
 * @returns {Object} Store info and loading state
 */
export const useVendorStoreInfo = () => {
  const dispatch = useDispatch();
  const { vendorStoreInfo, loading, error } = useSelector((state) => state.vendor);
  
  const fetchStoreInfo = async () => {
    try {
      dispatch(fetchStoreInfoStart());
      const storeInfo = await getVendorProfile();
      dispatch(fetchStoreInfoSuccess({
        storeName: storeInfo.storeName || '',
        storeDescription: storeInfo.storeDescription || '',
        isActive: storeInfo.isActive || true,
        storeImage: storeInfo.profileImage || '',
        socialMedia: storeInfo.socialMedia || {
          facebook: '',
          instagram: '',
          twitter: '',
          website: ''
        }
      }));
    } catch (error) {
      dispatch(fetchStoreInfoFailure(error.message));
    }
  };
  
  useEffect(() => {
    fetchStoreInfo();
  }, []);
  
  return { 
    storeInfo: vendorStoreInfo, 
    loading, 
    error, 
    refetchStoreInfo: fetchStoreInfo 
  };
};