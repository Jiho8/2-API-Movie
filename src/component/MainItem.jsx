import React from 'react'
import { NavLink } from 'react-router-dom'

function MainItem({ item, type }) {
    
  return (
    <NavLink to={`/${type}/${item.id}`} className='mainListLink'>
      <div className='mainListCon'
        style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${item.poster_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        borderRadius: '20px',
        paddingTop: '160%'
        }}
      >
        <div className='btn'><span>▶</span></div>
      </div>
      <p>{item.title || item.name}</p>
    </NavLink>
  )
}

export default MainItem