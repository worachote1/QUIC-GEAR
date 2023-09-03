import React from 'react';
import ProductView from './pages/ProductViews';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar></Navbar>
      <ProductView></ProductView>
    </div>
  );
}

export default App;
