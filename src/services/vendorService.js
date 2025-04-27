/**
 * Vendor Service - Handles API calls for vendor functionality
 */

// Base API URL
const API_BASE_URL = '/api';

/**
 * Get vendor profile information
 */
export const getVendorProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/profile`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch vendor profile');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching vendor profile:', error);
    throw error;
  }
};

/**
 * Update vendor profile
 * @param {Object} profileData - Updated vendor profile data
 */
export const updateVendorProfile = async (profileData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(profileData)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update vendor profile');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error updating vendor profile:', error);
    throw error;
  }
};

/**
 * Upload vendor profile image
 * @param {File} imageFile - Image file to upload
 */
export const uploadVendorImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    
    const res = await fetch(`${API_BASE_URL}/vendor/upload-image`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to upload image');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error uploading vendor image:', error);
    throw error;
  }
};

/**
 * Fetch vendor products
 */
export const getVendorProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/products`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch vendor products');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching vendor products:', error);
    throw error;
  }
};

/**
 * Add new product
 * @param {Object} productData - New product data
 */
export const addProduct = async (productData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(productData)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to add product');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

/**
 * Update existing product
 * @param {string} productId - ID of product to update
 * @param {Object} productData - Updated product data
 */
export const updateProduct = async (productId, productData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(productData)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update product');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete product
 * @param {string} productId - ID of product to delete
 */
export const deleteProduct = async (productId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/products/${productId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Fetch vendor orders
 */
export const getVendorOrders = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/orders`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch vendor orders');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching vendor orders:', error);
    throw error;
  }
};

/**
 * Update order status
 * @param {string} orderId - ID of order to update
 * @param {string} status - New status
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status })
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update order status');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

/**
 * Fetch vendor dashboard stats
 */
export const getVendorStats = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/vendor/dashboard-stats`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch vendor stats');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching vendor stats:', error);
    throw error;
  }
};