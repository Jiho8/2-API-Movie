import React from 'react'
import { NavLink } from 'react-router-dom'

function MediaItem({ data, type }) {
  return (
    <NavLink to={`/${type}/${data.id}`} key={data.id}>                    
        <div className='imgTv'
            style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/w200${data.poster_path}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className='btn'><span>▶</span></div>
        </div>

        <div className='textTv'>
            <h3>{type === 'movie' ? data.title : data.name}</h3>
            {data.vote_average && <span><b>★</b> {data.vote_average}</span>}
        </div>
    </NavLink>
  )
}

export default MediaItem