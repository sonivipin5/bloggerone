import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Div from '@/components/Div'
import { API_URL } from '@/config/env';
import NewLoader from '@/components/NewLoader';

const Index = () => {

  const [json, setJson] = useState(null);

  const getLyrics = async () => {
    const res = await fetch(`${API_URL}/api/blogposts?populate=*`)
    const json = await res.json()
    setJson(json)
  }

  useEffect(() => {
    getLyrics()
  }, [])

  return (
    <Div>
      <div className='w-full lg:w-3/4 m-auto sm:p-10 min-h-screen'>
        {json &&  json.data !== null ? json.data.map(({ id, attributes }) => {

          return <div key={id} className=" m-2 sm:my-2 flex flex-col shadow-lg p-4 justify-center md:grid md:grid-cols-2 ">
            <div className=" md:mr-10 ">
              <Link href={`/lyrics/${attributes.slug}`}>
                <img src={attributes.img.data[0].attributes.formats.thumbnail.url} alt={attributes.title} className={`w-full h-fit min-h-[250px]`} />
              </Link>

            </div>
            <div className='flex flex-col justify-evenly mx-3 space-y-2 md:space-y-0'>
              <div className='text-3xl flex font-bold'>
                <h1>{attributes.title}</h1>
              </div>

              <div className="">
                <div dangerouslySetInnerHTML={{ __html: attributes.content.slice(0, 120)+"..." }} />
              </div>
              <Link href={`/lyrics/${attributes.slug}`}>
              <p className='border-2 border-black px-3 py-1 font-bold w-fit cursor-pointer'>Read More</p>
              </Link>
            </div>


          </div>
        }) : <NewLoader />}
      </div>
    </Div>
  )
}

export default Index

// export const getServerSideProps = async(ctx) => {
  
//   const res = await fetch(`${API_URL}/api/blogposts?populate=*&sort=createdAt:desc`)
//   const json = res.timeout>0 ? null : await res.json()
//   return{
//     props:{json}
//   }
// }
