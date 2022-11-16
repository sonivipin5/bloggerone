import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Div from '@/components/Div'
import { API_URL, PAGE_LIMIT } from '@/config/env';
import { useRouter } from 'next/router';
import NewLoader from '@/components/NewLoader';

const Home = () => {
  const router = useRouter()
  let {page} = router.query
  page = parseInt(page)

  page = router.asPath ==='/' || page === 1 ? 0 : ((page - 1) * PAGE_LIMIT)
 
  let pre = page - 1

  let next = page===0?  page + 1:page + 1

 
  const [json, setJson] = useState(null);
  const [totalPage, setTotalPage] = useState();
  const getLyrics = async () => {

    const totalPageRes = await fetch(`${API_URL}/api/blogposts`)
    let totalPageNumber = await totalPageRes.json()
    totalPageNumber = totalPageNumber.meta && totalPageNumber.meta.pagination.total
    totalPageNumber = Math.ceil(totalPageNumber / PAGE_LIMIT)
    setTotalPage(totalPageNumber)

    const res = await fetch(`${API_URL}/api/blogposts?populate=*&sort=createdAt:desc&pagination[start]=${page}&pagination[limit]=${PAGE_LIMIT}`)
    const json = await res.json()
    setJson(json)
  }

  useEffect(() => {
    getLyrics()
  }, [+page])

  let pageNumber = []
  for (let i = 1; i < totalPage + 1; i++) {
    let a = i;
    pageNumber.push(a)

  }


  return (
    <Div>
      {/* {json && json.data === null && <NewLoader />} */}
      <div className={`min-h-screen flex flex-col  md:grid md:grid-cols-3 m-1 mx-1 sm:m-10 `}>
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

          : <NewLoader />}
      </div>
       
      {/* pagination */}
      {json && json.data ?(
      <div className='flex items-center  space-x-2 w-2/4 m-auto'>

        {/* <button className={`${page < 1 && "invisible"}`} onClick={() => router.push(`?page=${pre}`)}>Previous</button> */}

        <p>Pages - </p>

        {pageNumber && pageNumber.map((i, key) => {
          if (key <= 2) {
            return <div key={key}>
              <Link href={`?page=${i}`}>
                <p className={` border cursor-pointer border-black w-5 h-5 flex justify-center items-center`}>{i}</p>
              </Link>

            </div>
          }
          else if (key > 1) {
            return <div key={key} className='flex  space-x-2'>
              <p className='border w-5 h-5 center border-black'>...</p>
              <Link href={`?page=${i}`}><p className='border cursor-pointer border-black w-5 h-5 flex justify-center items-center'>{i}</p></Link>

            </div>
          }
        })}
        {/* <button className={`${page > totalPage && "invisible"}`} onClick={() => router.push(`?page=${next}`)}>Next</button> */}
      </div>):""}
    </Div>
  )
}

export default Home

// export const getServerSideProps = async ({ query: { page = 1 } }) => {

//   const start = +page === 1 ? 0 : (+page - 1) * PAGE_LIMIT


//   const totalPageRes = await fetch(`${API_URL}/api/blogposts`)
//   let totalPageNumber = await totalPageRes.json()
//   totalPageNumber = totalPageNumber.meta.pagination.total
//   const totalPage = Math.ceil(totalPageNumber / PAGE_LIMIT)


//   const res = await fetch(`${API_URL}/api/blogposts?populate=*&sort=createdAt:desc&pagination[start]=${start}&pagination[limit]=${PAGE_LIMIT}`)
//   const json = await res.json()


//   return {
//     props: { json, totalPage },
//   };
// };

