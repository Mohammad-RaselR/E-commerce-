import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import CartItemsHero from '../components/CartItemsHero'
import RecommendedProducts from '../components/RecommendedProducts';
import Footer from '../components/Footer';
import HeaderSignin from '../components/HeaderSignin';

const CartItems = () => {
    return (
        <div>
            <HeaderSignin></HeaderSignin>
            <NavBar></NavBar>
            <CartItemsHero></CartItemsHero>
            <Footer></Footer>
        </div>
    );
};

export default CartItems;