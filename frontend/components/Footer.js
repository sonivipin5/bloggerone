import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-10  min-w-[320px] w-full  flex flex-col sm:flex-row justify-between items-center px-[5vw] bg-black -z-[10]'>
      <div className='logo cursor-pointer flex items-start py-5  '>
        <Link href={'/'}><p>BloggerOne</p></Link>
      </div>
      <div>
        <p></p>
      </div>
      <div className='my-10'>
        <ul className='flex  justify-center flex-col lg:flex-row text-white space-y-5 lg:space-y-0 lg:space-x-5'>
          <Link href={'/privacypolicy'}>Privacy Policy</Link> 
          <p className='hidden lg:block'>|</p>
          <Link href={'/privacypolicy'}>Term & Conditions</Link>
          <p className='hidden lg:block'>|</p>
          <Link href={'/privacypolicy'}>Disclaimer</Link>
          <p className='hidden lg:block'>|</p>
          <Link href={'/privacypolicy'}>Contact Us</Link>

        </ul>
      </div>
    </footer>
  )
}

export default Footer
