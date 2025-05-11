import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import DashboardOrders from '../components/DashboardOrders';

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