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
<<<<<<< HEAD
import DashboardV from "./pages/DashboardV";
// import DashboardOrderV from "./pages/DashboardOrdersV"
import DashboardOrdersV from "./pages/DashboardOrdersV";
import DashboardWithdrawV from "./pages/DashboardWithdrawV";
import CartConfirmation from "./pages/CartConfirmation";
import HomeGarden from "./pages/HomeGarden";
import Fashion from "./pages/Fashion";
import Sports from "./pages/Sports";
import MotherKids from './pages/MotherKids'
import Electronics from './pages/Electronics'
import CheckoutPage from "./pages/CheckoutPage";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import OrderTrack from "./pages/OrderTrack"
import HelpCenter from "./pages/HelpCenter"
import ProductsDetails from "./pages/ProductsDetails";
import Review from "./Components/Review";
=======
>>>>>>> ef858a76aba191f940ce8c5cc734b2341b060e56

// import StoreDetailsV from "./pages/StoreDetailsV";
// import StoreSetup from "./pages/StoreSetup";
// import StoreDetails from "./pages/StoreDetailsV/";
// import StoreSetup from "./pages/StoreSetup";

// import MarketplaceWelcome from "./pages/MarketplaceWelcome";
// import Electronics from './pages/Electronics'
import MarketplaceWelcome from './Components/MarketplaceWelcome'
// import StoreSetup from './Components/StoreSetup'
import StoreReady from './components/StoreReady'
// import Review from './components/Review'
import ShippingReturns from './components/ShippingReturns'
import AdditionalInformation from './components/AdditionalInformation'
// import CartSuccess from './components/CartSuccess'
// import CartConfirmation from './pages/CartConfirmation'
// import CartItemsHero from './Components/CartItemsHero'
// import CheckoutHero from './Components/CheckoutHero'
import CartItems from './pages/CartItems'
// import CheckoutPage from './pages/CheckoutPage'
// import Compare from './Components/Compare'
import ComparePage from './pages/ComparePage'
// import WishlistHero from './Components/WishlistHero'
// import GardenHero from './Components/GardenHero'
// import HomeGarden from './pages/HomeGarden'
// import Fashion from './pages/Fashion'
// import Jewelary from './pages/Jewelary'
// import Sports from "./pages/Sports"
// import MotherKids from './pages/MotherKids'
// import Beauty from './pages/Beauty'
// import Games from './pages/Games'
// import AutoMobiles from './pages/AutoMobiles'
// import Art from './pages/Art'
// import Tools from './pages/Tools'
// import AboutUs from './pages/AboutUs'
// import ContactUs from './pages/Contact'
// import SideBarSignin from './components/SideBarSignin'
// import DashboardProductsV from './pages/DashboardProductsV'
// import DashboardProductsAdd from './components/DashboardProductsAdd'
// import DashboardProductsAddV from './pages/DashboardProductsAddV'
// import PrivacyPolicy from './Components/PrivacyPolicy'
// import Privacy from './pages/Privacy'
// import Contact from './pages/Contact'
import Wishlist from './pages/Wishlist'
// import Jewelary from "./pages/Jewelry";
export default function App(){
  return <BrowserRouter>

    <Routes>
     
     {/* <Route path="/dashboard/order" element={<DashboardOrdersV/>} />
     <Route path="/dashboard/withdraw" element={<DashboardWithdrawV/>} />

      <Route path="/dashboard" element={<DashboardV/>} />
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
      <Route path='/cart-alert' element={<CartConfirmation/>}
      />
      <Route path='/home-garden' element={<HomeGarden/>} />
      <Route path="/fashion/" element={<Fashion/>} /> 
     
      <Route path="/sports" element={<Sports/>} />  
      <Route path="/motherKids" element={<MotherKids/>} />
      
   
      </Route> */}
     
     {/* import { Route } from "react-router-dom"; */}


<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/sign-in" element={<Signin />} />
<Route path="/sign-up" element={<Signup />} />
<Route path="/listing/:listingId" element={<Listing />} />
<Route path="/cart-alert" element={<CartConfirmation />} />
<Route path="/home-garden" element={<HomeGarden />} />
<Route path="/fashion" element={<Fashion />} />
<Route path="/sports" element={<Sports />} />
<Route path="/motherKids" element={<MotherKids />} />
<Route path="/electronics" element={<Electronics />} />
<Route path="/checkout" element={<CheckoutPage />} />
<Route path="/shop" element={<Shop />} />
<Route path="/contact-us" element={<Contact />} />
<Route path="/privacy-policy" element={<Privacy />} />


<Route path="/account" element={<Account />} />
<Route path="/Vendor/edit" element={<EditAccountPage />} />
<Route path="/vendor/Store" element={<AccountHeroSectionV />} />


<Route path="/dashboard" element={<DashboardV />} />
<Route path="/dashboard/order" element={<DashboardOrdersV />} />
<Route path="/dashboard/withdraw" element={<DashboardWithdrawV />} />
<Route path="/dashboard/products" element={<ProductHero />} />
{/* <Route path="/dashboard/products/add" element={<DashboardProductsAddV />} /> */}
{/* <Route path="/dashboard/store-details" element={<StoreDetailsV />} /> */}
{/* <Route path="/dashboard/store-list" element={<StoreList />} />
<Route path="/dashboard/store-edit" element={<EditStoreV />} /> */}


{/* <Route path="/setup" element={<StoreSetup />} /> */}
<Route path="/ready" element={<StoreReady />} />
<Route path="/welcome" element={<MarketplaceWelcome />} />


<Route path="/track-order" element={<OrderTrack />} />
<Route path="/help-center" element={<HelpCenter />} />


<Route path="/wishlist" element={<Wishlist />} />
<Route path="/cart" element={<CartItems />} />
<Route path="/compare" element={<ComparePage />} />


<Route path="/" element={<ProductsDetails />}>
  <Route path="product-review" element={<Review />} />
  <Route path="product-return" element={<ShippingReturns />} />
  <Route path="product-info" element={<AdditionalInformation />} />
</Route>


<Route element={<PrivateRouter />}>
  <Route path="/profile" element={<Profile />} />
  <Route path="/create-listing" element={<CreateListing />} />
</Route>

    </Routes>
  
  </BrowserRouter>
  
    // This si pag
  
  
}