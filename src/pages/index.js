import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import * as React from "react"
import { Button, Card, Flex, Text } from "theme-ui"
import CodeSnippet from "../components/code-snippet"
import Layout from "../components/layout/layout"
import { client } from "../utils/client"

const IndexPage = ({ product }) => {
  const router = useRouter()

  return (
    <main className="mainContainer">
      <Head>
        <title>Commerce Starter</title>
        <meta name="description" content="One-page checkout" />
      </Head>

      <nav className="header">
        <div className='header__logo'>
          <h1 className='text-mb'>Store</h1>
        </div>

        <div className='header__links'>
          <a href='#'>Products</a>
          <a href='#'>Categories</a>
          <a href='#'>Profile</a>
        </div>
      </nav>


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
