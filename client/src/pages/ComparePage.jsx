import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Compare from '../components/Compare';
import Footer from '../components/Footer';
import HeaderSignin from '../components/HeaderSignin';
const ComparePage = () => {
    return (
        <div>
            <HeaderSignin></HeaderSignin>
            <NavBar></NavBar>
            <Compare></Compare>
            <Footer></Footer>
        </div>
    );
};

export default ComparePage;