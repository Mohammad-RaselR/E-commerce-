import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Account from "./components/Account"; 

import About from "./pages/About"
import Signin from "./pages/SignIn"
import Signup from "./pages/SignUp"
import PrivateRouter from "./components/PrivateRouter"
import CreateListing from "./pages/CreateListing"
// import UpdateListing from "./pages/UpdateListing"
import Listing from "./pages/Listing"
import EditAccountPage from "./pages/EditAccountPage";
import AccountHeroSectionV from "./components/AccountHeroSectionV";
import ProductHero from "./components/ProductHero";



export default function App(){
  return <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Vendor/edit" element={<EditAccountPage />} />
      <Route path="/vendor/Store" element={<AccountHeroSectionV/>} />
      <Route path="/dashboard/products" element={<ProductHero/>} />
      <Route path="/account" element={<Account />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/listing/:listingId" element={<Listing />} />
      <Route element={<PrivateRouter />} >
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-listing" element={<CreateListing/>}/>
      {/* <Route path="/update-listing/:listingId" element={<UpdateListing/>}/> */}
      </Route>
     
    </Routes>
  
  </BrowserRouter>
  
    
  
  
}