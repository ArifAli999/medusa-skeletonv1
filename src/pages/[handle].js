import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Steps from "../components/steps";
import { client } from "../utils/client";
import { useGetCart } from "medusa-react";
import useCartStore from "../../store/userCart";
import { useCreateLineItem } from "medusa-react";
import { useQueryClient } from 'react-query';
import addItem from "../utils/add-item";
import AppHeader from "../components/header/AppHeader";
import { AiOutlinePlus } from "react-icons/ai";
import ListComponent from "../components/ui/ListBox";

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

  // function handleButtonClick(sz) {
  //   let variant = '';
  //   switch (sz) {
  //     case 'S':
  //       variant = product.variants[0];
  //       break;
  //     case 'M':
  //       variant = product.variants[1];
  //       break;
  //     case 'L':
  //       variant = product.variants[2];
  //       break;
  //     case 'XL':
  //       variant = product.variants[3];
  //       break;
  //     default:
  //       break;

  //   }
  //   setSelectedType(variant);
  //   setUserSize(sz);
  //   setError(false);
  //   console.log('variant', variant);

  // }

  function handleButtonClick(sz) {
    if (!sz) throw new Error('No size selected');
    setUserSize(sz);
    console.log('sz', sz);
  }

  function handleColorPick(c) {
    setUserColor(c);
    console.log('c', c)
  }


  async function addToCart() {
    if (size.length > 0 && !userSize) {
      console.log('please select size')
      setError(true);
    }

    if (color && color.length > 1 && !userColor) {
      alert('Please select a color');
    }


    if (userSize && userColor) {
      const userSelection = `${userSize} / ${userColor}`;
      const variant = product.variants.find(variant => variant.title.trim() === userSelection.trim());

      console.log(variant)
      try {
       // await addItem(createLineItem, cartId, variant, 1, cart);
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
    <main className="w-full h-full bg-white p-6">
      <AppHeader />

      <div className='flex flex-col  xl:flex-row xl:gap-6 mx-auto  min-h-[550px] mt-6  mb-4'>

        <div className="bg-red-500 xl:min-w-[550px] xl:max-h-[600px]">
          <img className='w-full  h-full object-cover'
            src={product.images[0].url} />
        </div>

        <div className="flex flex-col gap-4 relative ">
          <div className="mt-4 ml-2 xl:ml-0 flex flex-col gap-2">
            <h1 className="text-2xl xl:text-4xl font-light font-sans  tracking-wide">{product.title}</h1>
            <h2 className="text-xl xl:text-2xl font-light font-sans lowercase tracking-wide">
              ${product.variants[0].prices[0].amount}
            </h2>
          </div>


          <div className="mt-4">
            <p className="text-sm xl:text-base font-thin font-sans tracking-wide text-gray-900">
              standard audio cable in slimline design. for audio between TX–6 and synthesizers or speakers. sync your pocket operators to OP–1 or use it for trs midi.

              stereo mini jack audio cable
              shielded, narrow profile, specially designed for teenage engineering devices
              length: 1200 mms

              <br /><br />
              stereo mini jack audio cable
              shielded, narrow profile, specially designed for teenage engineering devices
              length: 1200 mms
            </p>
          </div>


          <div className="flex flex-col justify-between w-full h-full">
            <div className='flex items-center justify-between mt-4 xl:mb-0 mb-6'>
              {color && color.length > 1 ? <ListComponent list={color} handleButtonClick={handleColorPick} /> : null}
              {size && <ListComponent list={size} handleButtonClick={handleButtonClick} />}
          </div>



            <div className="">
              <div
                onClick={addToCart}
                className="w-full p-2.5 mt-4 bg-black text-white font-extralight font-sans text-2xl rounded cursor-pointer hover:opacity-90 transition-all ease-linear duration-150 lowercase flex items-center  justify-between">
                <span> /Add</span>
                <AiOutlinePlus size={28} color='#FF5722' />
              </div>
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
