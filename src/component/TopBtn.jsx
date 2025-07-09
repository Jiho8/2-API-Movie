import React from 'react'

function TopBtn({ className }) {
  const upScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={className} onClick={upScroll}>
      <img src="/imgs/img-topBtn.svg" alt="top"/>
    </div>
  )
}

export default TopBtn