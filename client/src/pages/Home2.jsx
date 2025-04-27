import React from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/NavBar';
import Electronics from '../Components/Electronics';
import Footer from '../Components/Footer';
import Filter from '../Components/Filter';

const Home2 = () => {
    return (
        <div>
            <Header></Header>
            <Navbar></Navbar>
            <Filter></Filter>
            <Electronics></Electronics>
            <Footer></Footer>
        </div>
    );
};

export default Home2;