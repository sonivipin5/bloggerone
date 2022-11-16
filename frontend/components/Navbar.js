import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { GoArrowRight } from 'react-icons/go';

const css = {
  header: 'header relative flex justify-start sm:justify-between items-center h-20 overflow-hidden bg-black flex-col sm:flex-row py-5 shadow-md shadow-current transition-all',
  ul: 'flex items-center justify-center my-8 flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 text-gray-400 font-bold',
  li: ` border-b-2 border-transparent w-fit `,
  searchSection: "search flex flex-col justify-center items-center relative sm:mx-5",
  BsSearch: 'inline text-white text-xl font-bold cursor-pointer',
  searchDiv: 'absolute md:bg-white top-5 flex sm:top-14 sm:border-2 px-2 my-1 sm:shadow-current sm:shadow-sm transition-all sm:invisible',
  searchButton: 'border-2 border-white sm:border-black my-2 mx-1 rounded-full',
  searchInput: 'my-2  rounded-full px-1 border-black border-2 outline-none',
  goArrowRight: 'inline text-2xl mx-1 font-bold text-white sm:text-black',
  login: "login mx-[5vw] border-2 border-cyan-400 bg-cyan-400 px-8 font-bold rounded-full hidden sm:block",
  loginLi: "login border-2 border-cyan-400 bg-cyan-400 px-8 font-bold rounded-full sm:hidden text-black",
  hamBurger: "cursor-pointer mr-0 w-8 h-8 my-2 absolute top-5 right-5  sm:hidden ",
}



const Navbar = () => {
  
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter()
  const headerRef = useRef()
  const searchRef = useRef()
  const hamRef = useRef()


  const home = router.pathname == '/' ? ' border-white text-white' : ''
  const blog = router.pathname == '/blog' ? ' border-white text-white' : ''
  const lyrics = router.pathname == '/lyrics' ? ' border-white text-white' : ''
  const about = router.pathname == '/about' ? ' border-white text-white' : ''

  const search = () => {
    if (searchRef.current.classList.contains('absolute')) {
      searchRef.current.classList.toggle('sm:invisible')
      headerRef.current.classList.toggle('overflow-hidden')
    }
  }

 

  const hamOnClick = () => {
    if (hamRef.current.classList.contains('ham')) {
      hamRef.current.classList.toggle('ham-active')
    }

    if (headerRef.current.classList.contains('h-20')) {
      headerRef.current.classList.replace('h-20', 'h-screen')
    } else {
      headerRef.current.classList.remove('h-screen')
      headerRef.current.classList.add('h-20')
    }
  }

  const submitSearchQuery = (e) => {
    e.preventDefault()
    router.push(`/search?q=${searchValue.replace(/\s+/g,'+')}`)
    hamRef.current.classList.remove('ham-active')
    headerRef.current.classList.remove('h-screen')
    headerRef.current.classList.add('h-20')
    
  }

  const closeNav = ( ) => {
    hamRef.current.classList.remove('ham-active')
    headerRef.current.classList.remove('h-screen')
    headerRef.current.classList.add('h-20')
    
  }

  return (
    <div>
      <header ref={headerRef} className={css.header}>
        <div className={`logo cursor-pointer`}> <Link href={'/'}><h1>BloggerOne</h1></Link> </div>
        <nav>
          <ul className={css.ul}>
            <li onClick={closeNav} className={css.li + home}><Link href={'/'}>Home</Link></li>
            {/* <li onClick={closeNav} className={css.li + blog}><Link href={'/blog'}>blog</Link></li> */}
            <li onClick={closeNav} className={css.li + lyrics}><Link href={'/lyrics'}>Lyrics</Link></li>
            <li onClick={closeNav} className={css.li + about} ><Link href={'/contact'}>Contact Us</Link></li>
            <li onClick={closeNav} className={css.loginLi} ><Link href={'/login'}>Login</Link></li>
          </ul>
        </nav>

        <div className={css.searchSection}>
          <span onClick={search}><BsSearch className={css.BsSearch} /></span>
            <div ref={searchRef} className={`${css.searchDiv} `}>
         <form onSubmit={submitSearchQuery} className={`flex`} >
              <input type="search" name="search" id="search" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} className={css.searchInput} />
              <button onClick={search} className={css.searchButton}><GoArrowRight className={css.goArrowRight} /></button>
          </form>
            </div>
        </div>
        <div className={css.login}>
          <Link href={'/login'}>Login</Link>
        </div>
        <div onClick={hamOnClick} className={css.hamBurger}>
          <span ref={hamRef} className='ham'></span>
        </div>
      </header>
    </div>
  )
}

export default Navbar
