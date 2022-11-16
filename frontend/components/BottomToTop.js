import React, { useEffect, useRef } from 'react'
import { BsArrowUp } from 'react-icons/bs'

const BottomToTop = () => {
    const topArrowRef = useRef()

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    useEffect(() => {
     window.addEventListener('scroll', ()=>{
        if(topArrowRef.current.classList.contains('bottomToTop')) {
            topArrowRef.current.classList.toggle('invisible', window.scrollY <=100)
        }
     })
    }, [ topArrowRef])
  return (
    <div onClick={goToTop} ref={topArrowRef} className='cursor-pointer transition-all bottomToTop fixed w-8 h-8 right-3 bottom-10 flex justify-center items-center text-xl border-2  font-bold invisible text-cyan-900'>
      <BsArrowUp/>
    </div>
  )
}

export default BottomToTop
