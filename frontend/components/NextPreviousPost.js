import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


const style = {
  nextPreButton: `flex justify-between my-6`,
};

const NextPreviousPost = ({ allBlogs }) => {
  var next, preview;
  const router = useRouter();
  const { slug } = router.query;

// console.log(allBlogs)

    for (const key in allBlogs) {
      if (allBlogs[key].attributes.Slug === slug) {
           if (key <= allBlogs.length) {
        next = allBlogs[parseInt(key) + 1];
        preview = allBlogs[parseInt(key) - 1];
     
          break;
        }
      }
    }

  return (
    <div className={  `flex justify-between my-6`}>
      <div className={`${preview == undefined?"invisible":'visible'}`}>
      <Link href={`/blog/${preview&& preview.attributes.Slug}`}>
        <p><BsArrowLeft className="inline" /> Previous</p>
      </Link>
      
      </div>
      <div className={`${next == undefined?"invisible":'visible'}`}>
      <Link href={`/blog/${next&& next.attributes.Slug}`} >
        <p>Next <BsArrowRight className="inline" /></p>
      </Link>
  
      </div>
    </div>
  );
};

export default NextPreviousPost;
