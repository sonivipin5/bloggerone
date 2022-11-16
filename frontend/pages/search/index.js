import Div from '@/components/Div'
import { API_URL } from '@/config/env'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'


const Index = ({json}) => {
    const router = useRouter()
    const {q} = router.query

  return (
    <Div>
    <div className='w-full lg:w-3/4 m-auto sm:p-10'>
    <p className='text-xl center m-5 font-bold'>{`Your Search  :  ${q}  ${ json.data.length >0? '- Search Keyword Match In : '+ json.data.length + ' Articles':''} `}</p>
      {json.data.length >= 1  ? json.data.map(({ id, attributes }) => {

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
      }) : <p className='text-xl center font-bold'>{`Result  :  Query Not Found`}</p>}
    </div>
  </Div>
  )
}

export default Index

export const getServerSideProps = async ({query:{q}}) => {

    const res = await fetch(`${API_URL}/api/blogposts?filters[*][$containsi]=${q}&populate=*&sort=createdAt:desc`)
    const json = await res.json()
    
    console.log(json)
  
    return {
      props: { json },
    };
  };
  


