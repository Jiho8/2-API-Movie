import React from 'react'
import { NavLink } from 'react-router-dom'

function MainItem({ item, type }) {
    
  return (
    // 클릭 시 상세 페이지로 이동
    <NavLink to={`/${type}/${item.id}`} className='mainListLink'>
      {/* 포스터 이미지 */}
      <div className='mainListCon'
        style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${item.poster_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        borderRadius: '20px',
        paddingTop: '160%'
        }}
      >
        {/* hover 시 보여줄 아이콘 */}
        <div className='btn'><span>▶</span></div>
      </div>

      {/* 제목 */}
      <p>{item.title || item.name}</p>
    </NavLink>
  )
}

export default MainItem