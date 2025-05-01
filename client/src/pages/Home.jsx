import React from 'react';
import { useState } from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import DailyDeals from '../Components/DailyDeals';
import TopSellers from '../Components/TopSellers';
import CountdownBox from '../Components/CountdownBox';
import Banner from '../Components/Banner';
import SideBar from '../Components/SideBar';
const Home = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleAccountClick = () => {
      setShowSidebar(true);
    };
  
    const handleSidebarClose = () => {
      setShowSidebar(false);
    };
    return (
        <div>
            <Header onAccountClick={handleAccountClick} />
      {showSidebar && <SideBar onClose={handleSidebarClose} />}
      {/* Your main content goes here */}
            <Navbar></Navbar>
            <Banner></Banner>
            <DailyDeals></DailyDeals>
            <TopSellers></TopSellers>
            <Footer></Footer>
        </div>
    );
};

export default Home;