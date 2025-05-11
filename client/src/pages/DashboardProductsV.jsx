import React from 'react';
import HeaderSignin from '../components/HeaderSignin';
import NavBar from '../components/NavBar';
import DashboardProducts from '../components/DashboardProducts';
import Footer from '../components/Footer';

const DashboardProductsV = () => {
    return (
        <div>
            <HeaderSignin></HeaderSignin>
            <NavBar></NavBar>
            <DashboardProducts></DashboardProducts>
            <Footer></Footer>
        </div>
    );
};

export default DashboardProductsV;