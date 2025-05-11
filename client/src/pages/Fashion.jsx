import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import FashionHero from '../components/FashionHero';
import Footer from '../components/Footer';

const Fashion = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <FashionHero></FashionHero>
            <Footer></Footer>
        </div>
    );
};

export default Fashion;