import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import WishlistHero from '../Components/WishlistHero';
import HeaderSignin from '../Components/HeaderSignin';

const Wishlist = () => {
    return (
        <div>
            <HeaderSignin></HeaderSignin>
            <NavBar></NavBar>
            <WishlistHero></WishlistHero>
            <Footer></Footer>
        </div>
    );
};

export default Wishlist;