import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import * as React from "react"
import { Button, Card, Flex, Text } from "theme-ui";
import { client } from "../utils/client"
import { useCart } from "medusa-react";
import useCartStore from "../../store/userCart";
import Header from "../components/header/Header";

const IndexPage = ({ product }) => {
  const router = useRouter()
  const { cart, createCart } = useCart();
  const { cartId, setCartId } = useCartStore();

  React.useEffect(() => {
    if (!localStorage.getItem("cart_id")) {
      handleCreateCart();
    }
    setCartId(localStorage.getItem("cart_id"));
  }, []);

  const handleCreateCart = () => {
    createCart.mutate(
      {},
      {
        onSuccess: ({ cart }) => {
          localStorage.setItem("cart_id", cart.id);
        },
      }
    );
  }




  return (
    <main className="mainContainer">
      <Head>
        <title>Commerce Starter</title>
        <meta name="description" content="One-page checkout" />
      </Head>

      <Header />


      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Welcome to Store</h1>
          <p className="hero__subtitle">The best place to buy stuff</p>
          <Button onClick={() => router.push("/products")}>View Products</Button>
        </div>
      </div>



    </main>
  )
}

export async function getStaticProps({ params }) {
  const response = await client.products.list({ limit: 1 })

  const [product, ...rest] = response.products

  return { props: { product } }
}

export default IndexPage
