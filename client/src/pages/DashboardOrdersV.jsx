import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import DashboardOrders from '../Components/DashboardOrders';

const DashboardOrdersV = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <DashboardOrders></DashboardOrders>
            <Footer></Footer>
        </div>
    );
};

export default DashboardOrdersV;