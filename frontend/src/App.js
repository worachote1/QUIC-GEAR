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
import CheckAuctions from "./pages/admin/AuctionsAdmin/CheckAuctions";
import DetailAuction from "./pages/admin/AuctionsAdmin/DetailAuction";
import CheckOrders from "./pages/admin/OrdersAdmin/CheckOrders";
import DetailOrder from "./pages/admin/OrdersAdmin/DetailOrder";
import CheckTransactions from "./pages/admin/TransactionsAdmin/CheckTransactions";
import DetailTransaction from "./pages/admin/TransactionsAdmin/DetailTransaction";
import CheckProducts from "./pages/admin/ProductsAdmin/CheckProducts";
import CheckUsers from "./pages/admin/UsersAdmin/CheckUsers";
import CreateProducts from "./pages/admin/ProductsAdmin/CreateProducts";

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
          <Route path='/admin/check_transactions/:id' element={<DetailTransaction />} />
          <Route path='/admin/check_products' element={<CheckProducts />} />
          <Route path='/admin/create_products' element={<CreateProducts />} />
          <Route path='/admin/check_users' element={<CheckUsers />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
