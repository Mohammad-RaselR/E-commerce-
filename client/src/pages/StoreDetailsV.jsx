import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import StoreDetails from '../Components/StoreDetails';
import HeaderSignin from '../Components/HeaderSignin';

const StoreDetailsV = () => {
    return (
        <div>
            <HeaderSignin></HeaderSignin>
            <NavBar></NavBar>
            <StoreDetails></StoreDetails>
            <Footer></Footer>
        </div>
    );
};

export default StoreDetailsV;