import React from 'react'
import { NavLink } from 'react-router-dom'

function MediaItem({ data, type }) {
  return (
    // 클릭 시 상세 페이지로 이동.
    <NavLink to={`/${type}/${data.id}`} key={data.id}>     
      {/* 이미지 */}
      <div
        className='imgTv'
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w200${data.poster_path}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>

        {/* hover 시 나타날 아이콘 */}
        <div className='btn'><span>▶</span></div>
      </div>

      {/* 내용 */}
      <div className='textTv'>
        {/* 제목 */}
        <h3>{type === 'movie' ? data.title : data.name}</h3>

        {/* 별점. 0이상 일 때만 표시 */}
        {data.vote_average > 0 && <span><b>★</b> {data.vote_average}</span>}
      </div>
    </NavLink>
  )
}

export default MediaItem