import React from 'react'
import Header from '../../../components/user/header/Header'
import Navbar from '../../../components/user/navbar/Navbar'
import Slide from '../../../components/user/slide/Slide'
import Featured from '../../../components/user/featured/Featured'
import Footer from '../../../components/user/footer/Footer';
import "./homePage.css";
import Categories from './Categories'
import Offer from './Offer'
import TrendyProducts from './TrendyProducts'
import StayUpdate from './StayUpdate'
import Brands from './Brands'
import NewProducts from './NewProducts'
import BackToTop from '../../../components/base/backToTop/BackToTop'
import NavbarTop0 from '../../../components/user/navbar/NavbarTop0'
import HeaderCopy from '../../../components/user/header/HeaderCopy'
import HeaderWithNavbar from '../../../components/user/header/HeaderWithNavbar'

export default function Index({ cartLength, setIsLoadCartLength }) {
    return (
        <>
            {/* <Header /> */}
            {/* <NavbarTop0 /> */}
            {/* <Navbar /> */}
            <HeaderCopy cartLength={cartLength} setIsLoadCartLength={setIsLoadCartLength} />
            {/* <HeaderWithNavbar /> */}
            <Slide />
            <Featured />
            <Categories />
            <Offer />
            <TrendyProducts />
            <StayUpdate />
            {/* <NewProducts /> */}
            <Brands />
            <BackToTop />
            <Footer />
        </>
    )
}
