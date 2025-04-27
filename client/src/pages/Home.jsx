import React from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import DailyDeals from '../Components/DailyDeals';
import TopSellers from '../Components/TopSellers';
import CountdownBox from '../Components/CountdownBox';
import Banner from '../Components/Banner';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Navbar></Navbar>
            <Banner></Banner>
            <DailyDeals></DailyDeals>
            <TopSellers></TopSellers>
            <Footer></Footer>
        </div>
    );
};

export default Home;