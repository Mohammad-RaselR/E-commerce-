import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import DashboardProductsAdd from '../components/DashboardProductsAdd';
import Footer from '../components/Footer';

const DashboardProductsAddV = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <DashboardProductsAdd></DashboardProductsAdd>
            <Footer></Footer>
        </div>
    );
};

export default DashboardProductsAddV;