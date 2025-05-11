import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import CheckoutHero from '../components/CheckoutHero'
import Footer from '../components/Footer';

const CheckoutPage = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <CheckoutHero></CheckoutHero>
            <Footer></Footer>
        </div>
    );
};

export default CheckoutPage;