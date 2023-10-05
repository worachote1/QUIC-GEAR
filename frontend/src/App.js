import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Mobilebar from "./components/Mobilebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import EditProfile from './pages/auth/EditProfile';
import Topup from "./pages/topup/Topup";
import Cart from "./pages/Cart";
import Auction from "./pages/auction/Auction";
import AuctionDetail from "./pages/auction/AuctionDetail";
import AuctionCreate from "./pages/auction/AuctionCreate";
import Product from "./pages/product/Product";

import Admin from "./pages/admin/Admin";
import CheckAuctions from "./pages/admin/AuctionsAdmin/CheckAuctions";

import CheckOrders from "./pages/admin/OrdersAdmin/CheckOrders";
import DetailOrder from "./pages/admin/OrdersAdmin/DetailOrder";
import CheckTransactions from "./pages/admin/TransactionsAdmin/CheckTransactions";
import CheckProducts from "./pages/admin/ProductsAdmin/CheckProducts";
import CheckUsers from "./pages/admin/UsersAdmin/CheckUsers";
import CreateProducts from "./pages/admin/ProductsAdmin/CreateProducts";
import UpdateProducts from "./pages/admin/ProductsAdmin/UpdateProducts";

import AuctionViews from "./pages/auctionViews";
import ProductView from './pages/productView';

import NotFound from "./util/not_found/NotFound";
import CheckAuctionDetail from './pages/admin/AuctionsAdmin/CheckAutionDetail';
import MyFavProducts from './pages/product/MyFavProducts';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <BrowserRouter>
<<<<<<<<< Temporary merge branch 1
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/edit-profile/:id' element={<EditProfile />} /> 
              <Route path='/cart' element={<Cart />} />
              <Route path='/product' element={<Product />} />
              {/* <Route path='/product/:id' element={<ProductDetail />} /> */}
              <Route path='/auction' element={<Auction />} />
              <Route path='/auction/:id' element={<AuctionDetail />} />
              <Route path='/auction_create/' element={<AuctionCreate />} />
              <Route path='/topup' element={<Topup />} />
              <Route path='/auctionviews' element={<AuctionViews />} />
              <Route path='/productview' element={<ProductView />} />
=========
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/edit-profile' element={<EditProfile />} /> 
            <Route path='/cart' element={<Cart />} />
            <Route path='/product' element={<Product />} />
            {/* <Route path='/product/:id' element={<ProductDetail />} /> */}
            <Route path='/auction' element={<Auction />} />
            <Route path='/auction/:id' element={<AuctionDetail />} />
            <Route path='/auction_create' element={<AuctionCreate />} />
            <Route path='/topup' element={<Topup />} />
>>>>>>>>> Temporary merge branch 2

              {/* Admin Routes */}
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/check_auctions' element={<CheckAuctions />} />
              <Route path='/admin/check_auctions/:id' element={<CheckAuctionDetail/>} />
              <Route path='/admin/check_orders' element={<CheckOrders />} />
              <Route path='/admin/check_orders/:id' element={<DetailOrder />} />
              <Route path='/admin/check_transactions' element={<CheckTransactions />} />
              <Route path='/admin/check_products' element={<CheckProducts />} />
              <Route path='/admin/create_products' element={<CreateProducts />} />
              <Route path='/admin/update_products/:id' element={<UpdateProducts />} />
              <Route path='/admin/check_users' element={<CheckUsers />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Mobilebar />
>>>>>>>>> Temporary merge branch 2
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;