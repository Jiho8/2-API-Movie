import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  // 하단으로 스크롤 시 배경색 추가
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
      {/* 로고 */}
      <h2>
        <NavLink to='/'>ZFLIX</NavLink>
      </h2>

      {/* 메뉴 */}
      <div>
        <NavLink to='/'>Home</NavLink>
        
        {/* 기본 데이터: popular */}
        <NavLink to='/movie' state={{ title: 'Movies' }}>Movies</NavLink>
        <NavLink to='/tv' state={{ title: 'TV series' }}>TV series</NavLink>
      </div>
    </header>
  )
}

export default Header