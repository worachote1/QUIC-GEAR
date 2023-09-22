import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Topup from "./pages/Topup";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Auction from "./pages/Auction";
import Cart from "./pages/Cart";
import Mobilebar from "./components/Mobilebar";
import Product from "./pages/Product";
import ProductView from "./pages/ProductView";
import { CartProvider } from "./components/CartContext";
import AuctionView from "./pages/AuctionView";
import AuctionViews from "./pages/AuctionViews";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/topup' element={<Topup />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/auction' element={<Auction />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product' element={<Product />} />
            <Route path='/productview' element={<ProductView />} />
            <Route path='/auctionview' element={<AuctionView />} />
            <Route path='/auctionviews' element={<AuctionViews />} />
          </Routes>
          <Footer />
          <Mobilebar />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
