import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Topup from "./pages/Topup";
import Login from "./pages/Login";
import Mobilebar from "./components/Mobilebar";
import Product from "./pages/product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/topup' element={<Topup />} />
        </Routes>
        <Mobilebar/> 
      </BrowserRouter>
    </div>
  );
}

export default App;
