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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
        </Routes>
        <Footer />
        <Mobilebar />
      </BrowserRouter>
    </div>
  );
}

export default App;
