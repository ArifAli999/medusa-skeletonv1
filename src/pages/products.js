import React from 'react';
import { useProducts } from "medusa-react";
import ProductBox from '../components/products/productBox';
import Header from '../components/header/AppHeader';

function products() {
  const { products, isLoading } = useProducts({});

  console.log(products);

  return (
    <main className="mainContainer">

      <Header />


      <div className='product-container'>
        {products?.map((product) => (
          <ProductBox key={product.id} title={product.title} variants={product.variants} product={product} />
        ))}

      </div>



    </main>
  );
}

export default products;