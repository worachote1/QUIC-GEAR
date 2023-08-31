import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Topup from "./pages/topup/Topup";
import Cart from "./pages/Cart";
import Auction from "./pages/Auction";
import Product from "./pages/Product";

import Admin from "./pages/admin/Admin";
import CheckAuctions from "./pages/admin/auctionsAdmin/CheckAuctions";
import DetailAuction from "./pages/admin/auctionsAdmin/DetailAuction";
import CheckOrders from "./pages/admin/ordersAdmin/CheckOrders";
import DetailOrder from "./pages/admin/ordersAdmin/DetailOrder";
import CheckTransactions from "./pages/admin/transactionsAdmin/CheckTransactions";
import CheckProducts from "./pages/admin/productsAdmin/CheckProducts";
import CheckUsers from "./pages/admin/usersAdmin/CheckUsers";
import CreateProducts from "./pages/admin/productsAdmin/CreateProducts";
import UpdateProducts from "./pages/admin/productsAdmin/UpdateProducts";

import NotFound from "./util/not_found/NotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/auction' element={<Auction />} />
          <Route path='/auction/:id' element={<Auction />} />
          <Route path='/topup' element={<Topup />} />

          {/* Admin Routes */}
          {/* these routes are protected */}
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/check_auctions' element={<CheckAuctions />} />
          <Route path='/admin/check_auctions/:id' element={<DetailAuction />} />
          <Route path='/admin/check_orders' element={<CheckOrders />} />
          <Route path='/admin/check_orders/:id' element={<DetailOrder />} />
          <Route path='/admin/check_transactions' element={<CheckTransactions />} />
          <Route path='/admin/check_products' element={<CheckProducts />} />
          <Route path='/admin/create_products' element={<CreateProducts />} />
          <Route path='/admin/update_products/:id' element={<UpdateProducts/>} />
          <Route path='/admin/check_users' element={<CheckUsers />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
