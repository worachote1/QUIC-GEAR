import React from "react";
import { useLocation } from "react-router-dom";
import { productData } from "../constant/productData.js"; 

const Product = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  console.log(searchQuery);

  let filteredProducts = productData;

if (searchQuery !== null) {
  filteredProducts = productData.filter(item =>
    item.product.name.toLowerCase().includes(searchQuery.toLowerCase())||
    item.product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

  return (
    <div>
      <p>Found {filteredProducts.length} matching products</p>
      {filteredProducts.map((item) => (
        <div key={item.id}>
          <img src={item.product.imgPath} alt={item.product.name} />
        </div>
      ))}
    </div>
  );
};

export default Product;