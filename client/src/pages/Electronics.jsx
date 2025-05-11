import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Filter from '../Components/Filter';
import NavBar from '../Components/NavBar';
import ElectronicsHero from '../Components/ElectronicsHero';



const Electronics = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <ElectronicsHero></ElectronicsHero>
            <Footer></Footer>
        </div>
    );
};

export default Electronics;