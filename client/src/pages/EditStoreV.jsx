import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import EditStore from '../Components/EditStore';
import HeaderSignin from '../Components/HeaderSignin';


const EditStoreV = () => {
    return (
        <div>
            <HeaderSignin></HeaderSignin>
            <NavBar></NavBar>
            <EditStore></EditStore>
            <Footer></Footer>
        </div>
    );
};

export default EditStoreV;