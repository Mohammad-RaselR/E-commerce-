import React from 'react';
import CartSuccess from '../components/CartSuccess';
import RecommendedProducts from '../components/RecommendedProducts';
import RecommendedC from '../components/RecommendedC';

const CartConfirmation = () => {
    return (
        <div>
            <CartSuccess></CartSuccess>
            <RecommendedC></RecommendedC>
        </div>
    );
};

export default CartConfirmation;