import React from 'react';
import { useProducts } from "medusa-react";
import ProductBox from '../components/products/productBox';

function products() {
  const { products, isLoading } = useProducts({

  });

  console.log(products);

  return (
    <main className="mainContainer">

      <nav className="header">
        <div className='header__logo'>
          <h1 className='text-mb'>Store</h1>
        </div>
        <div className='header__links'>
          <a href='#' style={{ fontWeight: 600 }}>Products</a>
          <a href='#'>Categories</a>
          <a href='#'>Profile</a>
        </div>

      </nav>


      <div className='product-container'>
        {products?.map((product) => (
          <ProductBox key={product.id} title={product.title} variants={product.variants} product={product} />
        ))}

      </div>



    </main>
  );
}

export default products;