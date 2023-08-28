import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Admin from "./pages/admin/Admin";
import Topup from "./pages/Topup";
import Cart from "./pages/Cart";
import Auction from "./pages/Auction";
import Product from "./pages/Product";

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
          <Route path='/admin' element={<Admin />} />
          <Route path='/auction' element={<Auction />} />
          <Route path='/topup' element={<Topup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
