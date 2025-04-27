import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import EditAccount from '../components/EditAccount'

const EditAccountPage = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <EditAccount></EditAccount>
            <Footer></Footer>
        </div>
    );
};

export default EditAccountPage;