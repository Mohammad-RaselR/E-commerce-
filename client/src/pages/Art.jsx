import React from 'react';
import Header from '../components/Header';
// import Header from '../components/Header';
import NavBar from '../components/NavBar';
import ArtHero from '../components/ArtHero';
import Footer from '../components/Footer';

const Art = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <ArtHero></ArtHero>
            <Footer></Footer>
        </div>
    );
};

export default Art;