import React from 'react';
import Header from '../Components/Header';
import NabBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import Dashboard from '../Components/Dashboard';

const DashboardV = () => {
    return (
        <div>
            <Header></Header>
            <NabBar></NabBar>
            <Dashboard></Dashboard>
            <Footer></Footer>
        </div>
    );
};

export default DashboardV;