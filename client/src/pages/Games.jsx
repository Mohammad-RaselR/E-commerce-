import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import GamesHero from '../Components/GamesHero';
import Footer from '../Components/Footer';

const Games = () => {
    return (
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <GamesHero></GamesHero>
            <Footer></Footer>
        </div>
    );
};

export default Games;