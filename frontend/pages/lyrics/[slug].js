import { API_URL } from "@/config/env";
import ProgressBar from "react-scroll-progress-bar";
import React, { useEffect, useState } from "react";
import Div from "../../components/Div";


import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Slug = ({ slugData, json }) => {
  const [ogUrl, setOgUrl] = useState(null);
  const allData = json.data
  const id = slugData !== null && slugData.data[0].id
  const title = slugData !== null && slugData.data[0].attributes.title;
  const content =
    slugData &&
    slugData.data[0].attributes.content.slice(0, 158).replace(/<[^>]*>/g, "");
  const ogImg =
    slugData && slugData.data[0].attributes.img.data[0].attributes.url;
  let next, previous;

  for (const i in allData) {
    if (allData[i].id === id) {
      if (i <= allData.length) {
        next = allData[parseInt(i) + 1]
        previous = allData[parseInt(i) - 1]
        break
      }
    }
  }
  

  useEffect(() => {
    let url = location.href;
    setOgUrl(url);
  }, []);

  return (
    <Div title={title} description={content} ogImg={ogImg} ogUrl={ogUrl}>
      <ProgressBar />

      <div className="flex justify-center">
        <div className="mx-5 lg:w-3/4  xl:w-3/5 flex flex-col items-center justify-center">
          {/* Article Title section */}

          <div className="w-full text-3xl  font-bold mt-14 "><h1>{title}</h1></div>
          
          <div className="w-full flex flex-col sm:flex-row justify-between font-bold text-cyan-900 border-b-2 py-5 ">
            <p>Published Date - {slugData.data[0].attributes.publishedAt.split('T')[0].split('-').reverse().join('/')}</p>

            {/* Social shear Button section */}

            <div className="space-x-3 flex ">
              <p>Share this post on -</p>
              <FacebookShareButton url={`${ogUrl}`}>
                <FacebookIcon size={22} round />
              </FacebookShareButton>

              <WhatsappShareButton url={`${ogUrl}`}>
                <WhatsappIcon size={22} round />
              </WhatsappShareButton>

              <TwitterShareButton url={`${ogUrl}`}>
                <TwitterIcon size={22} round />
              </TwitterShareButton>

              <LinkedinShareButton url={`${ogUrl}`}>
                <LinkedinIcon size={22} round />
              </LinkedinShareButton>

            </div>

          </div>

          {/* Article Image section */}
          <img src={ogImg} alt={title} className='mt-5 w-full' />

          {/* Article Content section */}
          <div className="text-black  my-5 border-y-2 py-5" dangerouslySetInnerHTML={{ __html: slugData && slugData.data[0].attributes.content }} />

          {/* next Preview Section */}

          <div className={`w-full text-xl flex justify-between my-6`}>
            <div className={`${previous == undefined ? "invisible" : 'visible cursor-pointer'}`}>
              <Link href={`/lyrics/${previous && previous.attributes.slug}`}>
                <p><BsArrowLeft className="inline" /> Previous Post </p>
              </Link>

            </div>
            <div className={`${next == undefined ? "invisible" : 'visible'} cursor-pointer`}>
              <Link href={`/lyrics/${next && next.attributes.slug}`} >
                <p>Next Post<BsArrowRight className="inline" /></p>
              </Link>

            </div>
          </div>

          {/* Latest Posts section */}

          <div className="w-full text-3xl font-extrabold ">
            <p>Latest Post </p>
          </div>
          <div className=" space-y-5 md:space-y-0 flex flex-col md:flex-row my-10 md:mx-5 relative ">

            {allData && allData.map(({ attributes }, key) => {
              if(key <=3)
              return <div key={key} className=" mr-5 space-y-5 md:space-y-0">
                <Link href={`/lyrics/${attributes.slug}`}>
                  <img className="w-full md:h-24 cursor-pointer" src={attributes.img.data[0].attributes.formats.thumbnail.url} alt={attributes.title} />
                </Link>
                <Link href={`/lyrics/${attributes.slug}`}>
                  <p className="cursor-pointer">{attributes.title}</p>
                </Link>
              </div>
            })}
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Slug;

export const getServerSideProps = async (ctx) => {
  const { slug } = ctx.query;
  const res = await fetch(
    `${API_URL}/api/blogposts?filters[slug]=${slug}&populate=*`
  );
  const slugData = !res.ok ? null : await res.json();
  const allData = await fetch(
    `${API_URL}/api/blogposts?populate=*&sort=createdAt:desc`
  );
  const json = !res.ok ? null : await allData.json();

  return {
    props: { slugData, json },
  };
};
