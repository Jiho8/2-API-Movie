import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import MainItem from './MainItem';

function MainList(props) {
    const navigate = useNavigate();
    const movie1 = props.mPop;  // Popular Movie
    const movie2 = props.mTop;  // Top Rated Movie
    const tv1 = props.sPop;     // Popular Tv Series
    const tv2 = props.sTop;     // Top Rated Tv Series

    const category = [movie1, movie2, tv1, tv2];  // 데이터 배열
    // 각 데이터 타이틀 배열
    const menuTitle = [ 'Trending Movies', 'Top Rated Movies', 'Trending TV', 'Top Rated TV' ];
    
    // 더보기 버튼 클릭 시 실행할 함수
    function linkChange( t1, t2, title ) {
        // media.jsx로 이동 ('/movie' or '/tv')
        navigate(`/${t1}`, { state: { t1, t2, title } })
    }

  return (
    category.map((c, i)=>{
        const type = i < 2 ? 'movie' : 'tv'; // 앞 두 개는 영화, 뒤 두 개는 TV

        return(
            <div className='mainList' key={c.id}> 
                {/* 제목 및 버튼 */}
                <div className='header'>
                    {/* 제목 */}
                    <h2>{menuTitle[i]}</h2>

                    {/* 더보기 버튼 */}
                    <button className='moreBtn' style={{display: 'inline-block', margin: '0'}}
                        onClick={()=>{
                            // 제목 데이터에 따른 링크 및 state
                            switch(menuTitle[i]){
                                case "Trending Movies":
                                    linkChange('movie', 'popular', 'Trending Movies');
                                    break;
                                case "Top Rated Movies":
                                    linkChange('movie', 'top_rated', 'Top Rated Movies');
                                    break;
                                case "Trending TV":
                                    linkChange('tv', 'popular', 'Trending TV');
                                    break;
                                case "Top Rated TV":
                                    linkChange('tv', 'top_rated', 'Top Rated TV');
                                    break;
                            }                                        
                        }}
                    >View More</button>
                </div>

                {/* 미디어 스와이퍼 */}
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={15}
                    grabCursor={true}
                    loop={true}>
                    {
                        c.map((item)=>(
                            <SwiperSlide key={item.id}>
                                <MainItem item={item} type={type}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        )
    })
  )
}

export default MainList