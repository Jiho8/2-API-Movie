import React from 'react'
import '../styles/_common.scss';

function NoData({ message = '검색 결과가 없습니다.' }) {
  return (
    <div className='noDataBox'>
      {/* 아이콘 이미지 */}
      <p><img src="/imgs/icon-nodata.svg" alt="iconimg" /></p>

      {/* 메세지 */}
      <span>{message}</span>
    </div>
  )
}

export default NoData