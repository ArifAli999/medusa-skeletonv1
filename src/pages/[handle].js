import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Steps from "../components/steps";
import { client } from "../utils/client";
import Header from "../components/header/Header";
import { useGetCart } from "medusa-react";
import useCartStore from "../../store/userCart";
import { useCreateLineItem } from "medusa-react";
import { useQueryClient } from 'react-query';
import addItem from "../utils/add-item";


const ProductPage = ({ product, regions }) => {
  const [size, setSize] = useState([]);
  const [color, setColor] = useState();
  const [type, setSelectedType] = useState();
  const [userSize, setUserSize] = useState();
  const [userColor, setUserColor] = useState();
  const [error, setError] = useState(false);
  const { cartId } = useCartStore();
  const { cart, isLoading } = useGetCart(cartId);
  const createLineItem = useCreateLineItem(cartId);

  const queryClient = useQueryClient();







  useEffect(() => {
    generateSizes();
  }, []);


  const generateSizes = () => {
    const sizes = product.variants.map(variant => variant.options[0].value);
    const colors = product.variants.map(variant => variant.options[1]?.value);
    const uniqueColors = [...new Set(colors)];
    const uniqueSizes = [...new Set(sizes)];
    setSize(uniqueSizes);
    setColor(uniqueColors);
  };

  function handleButtonClick(sz) {
    let variant = '';
    switch (sz) {
      case 'S':
        variant = product.variants[0];
        break;
      case 'M':
        variant = product.variants[1];
        break;
      case 'L':
        variant = product.variants[2];
        break;
      case 'XL':
        variant = product.variants[3];
        break;
      default:
        break;

    }
    setSelectedType(variant);
    setUserSize(sz);
    setError(false);

  }

  function handleColorPick(c) {
    setUserColor(c);
  }


  async function addToCart() {
    if (size.length > 0 && !userSize) {
      setError(true);
    }

    if (color && color.length > 1 && !userColor) {
      alert('Please select a color');
    }


    if (userSize && userColor) {
      const userSelection = `${userSize} / ${userColor}`;
      const variant = product.variants.find(variant => variant.title.trim() === userSelection.trim());
      try {
        await addItem(createLineItem, cartId, variant, 1, cart);
        queryClient.invalidateQueries();
      } catch (error) {
        console.log('Failed to add item to cart', error);
      }

    }

    if (userSize && !userColor) {
      const variant = product.variants.find(variant => variant.title.trim() === userSize.trim());
      try {
        await addItem(createLineItem, cartId, variant, 1, cart);
        queryClient.invalidateQueries();
      } catch (error) {
        console.log('Failed to add item to cart', error);
      }
    }
  }

  function testQuery() {
    queryClient.invalidateQueries();

  }


  if (isLoading) return <div>Loading...</div>;


  return (
    <main className="mainContainer">
      <Header />

      <div className='productpage'>
        <div className="product-image-container">
          <img className='product-img-large'
            src={product.images[0].url} />
        </div>


        <div className="product-details">
          <div className='product-title-top'>
            <div className="flex row items-center justify-between">
              <h2 className="product-title">{product.title}</h2>
              <p className="prooduct-price"> ${product.variants[0].prices[0].amount}</p>
            </div>
            <div className="product-desc">
              <p>{product.description}</p>
            </div>
          </div>








          <div className="product-options">
            {product.options.map((option, index) => (
              index === 0 ?
                <div className='option-pill' key={index}>
                  {error ? 'Please select a size' : null}


                  <div className='size-boxes'>
                    {size.map((size, index) => (
                      <div className={`${userSize === size ? 'size-box selected' : 'size-box'}`} key={index} onClick={() => handleButtonClick(size)}>

                        <div className={`${userSize === size ? 'size-text selected' : 'size-text'}`}
                          onClick={() => handleButtonClick(size)}
                        >{size}</div>
                      </div>
                    ))}
                  </div>

                  <div className='size-boxes'>
                    {color && color.length > 1 && color.map((c, index) => (
                      <div className={`${userColor === c ? 'size-box selected' : 'size-box'}`} key={index} onClick={() => handleColorPick(c)}>
                        <p className={`${userColor === c ? 'size-text selected' : 'size-text'}`}>{c}</p>
                      </div>
                    ))}
                  </div>




                </div> : null
            ))}
          </div>


          <div className='product-btns'>
            <div className="add-to-cart-btn" onClick={addToCart}>
              <p className='text-mb'>Add to Cart</p>
            </div>
            <div className="buy-now-btn">
              <p className='text-mb'>Buy Now</p>
            </div>

            <div className="buy-now-btn" onClick={testQuery}>
              <p className='text-mb'>Buy Now</p>
            </div>
          </div>

        </div>






      </div>

    </main>
  );
};

export async function getStaticPaths() {
  const { products } = await client.products.list();

  const paths = products
    .map(product => ({
      params: { handle: product.handle },
    }))
    .filter(p => !!p.params.handle);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await client.products.list({ handle: params.handle });
  const { regions } = await client.regions.list();

  // handles are unique, so we'll always only be fetching a single product
  const [product] = response.products;

  // Pass post data to the page via props
  return { props: { product, regions } };
}

export default ProductPage;
