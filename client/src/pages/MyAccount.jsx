import React from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/NavBar';
import AccountHeroSection from '../Components/AccountHeroSection';
import Footer from '../Components/Footer';

const MyAccount = () => {
    return (
        <div>
            <Header></Header>
            <Navbar></Navbar>
            <AccountHeroSection></AccountHeroSection>
            <Footer></Footer>
        </div>
    );
};

export default MyAccount;