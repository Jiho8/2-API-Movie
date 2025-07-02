import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  useEffect(()=>{
    const scrollHeader = () => {
      const header = document.querySelector('header')
      if(window.scrollY > 120){
        header.classList.add('scrolled');
      }else{
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', scrollHeader);

    return () => {
      window.removeEventListener('scroll', scrollHeader);
    };
  }, []);

  return (
    <header>
      <h2>
        <NavLink to='/'>ZFLIX</NavLink>
      </h2>

      <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/movie' state={{ title: 'Movies',  t2:'popular' }}>Movies</NavLink>
        <NavLink to='/tv' state={{ title: 'TV series', t2:'popular' }}>TV series</NavLink>
      </div>
    </header>
  )
}

export default Header