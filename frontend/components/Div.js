import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Div = ({ title, description, keywords, ogImg, ogUrl, children }) => {



  return (
    <>
      <Head>

        <title>{title}</title>
        <meta name="google-site-verification" content="K6S1PJPSBhgAInEeOvW1faH5FII6czC76CwrdlOXmVg" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Vipin Soni" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImg} />

      </Head>

      <Navbar />

      <div>{children}</div>

      <Footer />



    </>
  )
}

export default Div

Div.defaultProps = {
  title: 'Bloggerone',
  description: 'Welcome to Bloggerone.com this website provides different types of blog like - Entertainment blog, songs Lyrics and movies blogs',
  keywords: 'Bloggerone, entertainment, blog',
  ogImg: 'https://source.unsplash.com/random/900×700/?blog',
  ogUrl: 'http://bloggerone.ga'
}
