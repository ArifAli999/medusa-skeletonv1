import Head from "next/head"
import React, { useState, useEffect } from "react";
import Layout from "../components/layout"
import Steps from "../components/steps"
import { client } from "../utils/client"
import Header from "../components/header/Header";
import { useGetCart } from "medusa-react";
import useCartStore from "../../store/userCart";

const ProductPage = ({ product, regions }) => {
  const [region, setRegion] = useState(regions?.[0] || null)
  const [country, setCountry] = useState(region?.countries?.[0].iso_2 || "")
  const [size, setSize] = useState([]);
  const [color, setColor] = useState();
  const [type, setSelectedType] = useState();
  const [userSize, setUserSize] = useState();
  const { cartId } = useCartStore();
  const { cart, isLoading } = useGetCart(cartId);
  console.log(cart);
  // console.log(cart);


  useEffect(() => {
    generateSizes();
  }, [])


  const handleRegionChange = (regId, countryCode) => {
    const selected = regions.find(r => r.id === regId)
    setCountry(countryCode)
    setRegion(selected)
  }

  const generateSizes = () => {
    const sizes = product.variants.map(variant => variant.options[0].value);
    const colors = product.variants.map(variant => variant.options[1]?.value);
    const uniqueColors = [...new Set(colors)];
    const uniqueSizes = [...new Set(sizes)];
    console.log(uniqueColors);
    setSize(uniqueSizes);
    setColor(uniqueColors);
  }

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
    console.log(variant);
  }

  return (
    <main className="mainContainer">
      <Header />

      <div className='productpage'>
        <div className="product-image-container">
          <img className='product-img-large'
            src={product.images[0].url} />
        </div>


        <div className="product-details">
          <div className='flex row items-center justify-between'>
            <h2 className="product-title">{product.title}</h2>
            <p className="prooduct-price"> ${product.variants[0].prices[0].amount}</p>
          </div>


          <div className="product-desc">
            <p>{product.description}</p>
          </div>





          <div className="product-options">
            {product.options.map((option, index) => (
              index === 0 ?
                <div className='option-pill' key={index}>


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
                    {color && color.length > 1 && color.map((size, index) => (
                      <div className='size-box' key={index}>
                        <p className='size-text'>{size}</p>
                      </div>
                    ))}
                  </div>




                </div> : null
            ))}

          </div>


          <div className='product-btns'>
            <div className="add-to-cart-btn">
              <p className='text-mb'>Add to Cart</p>
            </div>
            <div className="buy-now-btn">
              <p className='text-mb'>Buy Now</p>
            </div>
          </div>
        </div>


      </div>

    </main>
  )
}

export async function getStaticPaths() {
  const { products } = await client.products.list()

  const paths = products
    .map(product => ({
      params: { handle: product.handle },
    }))
    .filter(p => !!p.params.handle)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const response = await client.products.list({ handle: params.handle })
  const { regions } = await client.regions.list()

  // handles are unique, so we'll always only be fetching a single product
  const [product] = response.products

  // Pass post data to the page via props
  return { props: { product, regions } }
}

export default ProductPage
