import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import MainItem from './MainItem';


function MainList(props) {
    const movie1 = props.mPop;
    const movie2 = props.mTop;
    const tv1 = props.sPop;
    const tv2 = props.sTop;
    const navigate = useNavigate();

    const category = [movie1, movie2, tv1, tv2];
    const menuTitle = [ 'Trending Movies', 'Top Rated Movies', 'Trending TV', 'Top Rated TV' ];
    
    function linkChange(t1,t2,title) {
        navigate(`/${t1}`,{state:{t1,t2,title}})
    }

  return (
    <>
        {
            category.map((c, i)=>{
                const type = i < 2 ? 'movie' : 'tv'; // 앞 두 개는 영화, 뒤 두 개는 TV

                return(
                    <div className='mainList' key={c.id}> 
                        <div className='header'>
                            <h2>{menuTitle[i]}</h2>
                            <button className='moreBtn' style={{display: 'inline-block', margin: '0'}}
                                onClick={()=>{
                                    switch(menuTitle[i]){
                                        case "Trending Movies":
                                            linkChange('movie','popular', 'Trending Movies');
                                            break;
                                        case "Top Rated Movies":
                                            linkChange('movie','top_rated', 'Top Rated Movies');
                                            break;
                                        case "Trending TV":
                                            linkChange('tv','popular', 'Trending TV');
                                            break;
                                        case "Top Rated TV":
                                            linkChange('tv','top_rated', 'Top Rated TV');
                                            break;
                                    }                                        
                                }}
                            >View More</button>
                        </div>
                        <Swiper
                            slidesPerView={'auto'}
                            spaceBetween={15}
                            grabCursor={true}
                            loop={true}
                            className="mySwiper2">
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
        }
    </>
  )
}

export default MainList