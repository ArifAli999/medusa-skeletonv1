import React from 'react';
import { useProducts } from "medusa-react";
import ProductBox from '../components/products/productBox';
import Header from '../components/header/AppHeader';

function products() {
  const { products, isLoading } = useProducts({});




  return (
    <main className="mainContainer">

      <Header />


      <div className='flex gap-10 flex-wrap mx-auto items-center justify-center'>
        {products?.map((product) => (
          <ProductBox key={product.id} title={product.title} variants={product.variants} product={product} />
        ))}

      </div>



    </main>
  );
}

export default products;