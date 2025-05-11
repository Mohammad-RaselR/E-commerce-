import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import AutoMobilesHero from '../components/AutoMobilesHero';
import Footer from '../components/Footer';

const AutoMobiles = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <AutoMobilesHero></AutoMobilesHero>
            <Footer></Footer>
        </div>
    );
};

export default AutoMobiles;