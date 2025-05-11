import React from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import ProductHero from '../Components/ProductHero';
import Footer from '../Components/Footer';
import RecommendedProducts from '../Components/RecommendedProducts';
import Review from '../Components/Review';
import { Outlet,useMatches } from 'react-router';

const ProductsDetails = () => {
    const matches = useMatches();

    // Checks if there's a child route rendered in Outlet
    const isOutletActive = matches.length > 1;

    return (
        <div>
            <Header />
            <NavBar />
            <ProductHero />
            <Outlet />
            {!isOutletActive && (
                <>
                    <Review />
                </>
            )}
            <RecommendedProducts />
            <Footer />
        </div>
    );
};

export default ProductsDetails;
