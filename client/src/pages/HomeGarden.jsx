import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import GardenHero from '../Components/GardenHero';
import Footer from '../Components/Footer';

const HomeGarden = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <GardenHero></GardenHero>
            <Footer></Footer>
        </div>
    );
};

export default HomeGarden;