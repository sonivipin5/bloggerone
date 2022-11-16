import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Div from '@/components/Div'
import { API_URL, PAGE_LIMIT } from '@/config/env';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';

const Blog = () => {
  const router = useRouter()
  const {page} = router.query 
 console.log(page)

  const [json, setJson] = useState(null);

  const getLyrics = async () => {
    const pageNumber = router.asPath== '/' ? 1: await router.query.page 
    console.log(pageNumber)
    const res = await fetch(`${API_URL}/api/blogposts?populate=*&sort=createdAt:desc&pagination[start]=${pageNumber}&pagination[limit]=${PAGE_LIMIT}`)
    const json = await res.json()
    setJson(json)
  }

  useEffect(() => {
    getLyrics()
  }, [])
console.log(json)

  return (
    <Div>
      {json && json.data === null && <Loader />}
      <div className=' flex flex-col md:grid md:grid-cols-3 m-1 mx-1 sm:m-10 '>
        {json && json.data ? json.data.map(({ id, attributes }) => {

          return <div key={id} className={`p-3 border m-2 space-y-3 flex flex-col justify-between`}>
            <Link href={`/lyrics/${attributes.slug}`}>
              <img src={attributes.img.data[0].attributes.formats.thumbnail.url} alt={attributes.title} className={`w-[100%]`} />
            </Link>

            <div className='text-2xl font-bold '>
              <h1>{attributes.title}</h1>
            </div>
            <div dangerouslySetInnerHTML={{ __html: attributes.content.slice(0, 100) + '...' }} />
            <Link href={`/lyrics/${attributes.slug}`}>
              <p className={`text-xl font-bold border-2 border-black w-fit px-3 py-1 cursor-pointer`}>Read More</p>
            </Link>



          </div>
        })

          : "No Data" }
      </div>
    </Div>
  )
}

export default Blog
