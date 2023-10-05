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
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/product' element={<Product />} />
            <Route path='/auction' element={<Auction />} />
            <Route path='/auction/:id' element={<AuctionDetail />} />

            {/* Protected User Routes */}
            <Route path='/' element={<ProtectedRoute />}>
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/auction_create' element={<AuctionCreate />} />
              <Route path='/topup' element={<Topup />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route path='/admin' element={<ProtectedRoute />}>
              <Route index element={<Admin />} />
              <Route path='check_auctions' element={<CheckAuctions />} />
              <Route path='check_auctions/:id' element={<CheckAuctionDetail />} />
              <Route path='check_orders' element={<CheckOrders />} />
              <Route path='check_orders/:id' element={<DetailOrder />} />
              <Route path='check_transactions' element={<CheckTransactions />} />
              <Route path='check_products' element={<CheckProducts />} />
              <Route path='create_products' element={<CreateProducts />} />
              <Route path='update_products/:id' element={<UpdateProducts />} />
              <Route path='check_users' element={<CheckUsers />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Mobilebar />
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;