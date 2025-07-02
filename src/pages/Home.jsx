import React, { useEffect, useState } from 'react';
import { useStore } from '../storeMovie';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainList from '../component/MainList';
import Loading from '../component/Loading';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// import required modules
import { Autoplay, Scrollbar } from 'swiper/modules';


function Home() {
  const [ loading, setLoading ] = useState(true);
  const { data, fetchAllData } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(()=>{
    fetchAllData();
  }, [])

  if (loading) return <Loading/>;

  return (
    <>
      <Swiper
        scrollbar={{hide: true}}
        autoplay={{delay:3000, disableOnInteraction: false}}
        modules={[Scrollbar, Autoplay]}
        className="mySwiper">
        {
          data.mPop.map((item)=>{
            if (!item.backdrop_path || !item.poster_path || !item.overview) {
              return null; // backdrop_path나 poster_path가 없으면 렌더링 안 함
            }
            return (
              <SwiperSlide key={item.id}>
                <div className='mainBox'
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://image.tmdb.org/t/p/original${item.backdrop_path}')`,
                    backgroundSize: 'cover',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent)',
                    maskImage: 'linear-gradient(to bottom, black 95%, transparent)',
                  }}>
                  <p><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} /></p>
                  <div className='text'>
                    <h3>{item.title}</h3>
                    <p>{item.overview}</p>
                    <div>
                      <button onClick={() => navigate(`/movie/${item.id}`)}>
                        Watch now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>

      <MainList mTop={data.mTop} mPop={data.mPop}
                sTop={data.sTop} sPop={data.sPop}
      />

    </>
  )
}

export default Home