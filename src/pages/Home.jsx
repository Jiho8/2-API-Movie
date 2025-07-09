import React, { useEffect, useState } from 'react';
import { useStore } from '../storeMovie';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainList from '../component/MainList';
import Loading from '../component/Loading';
import TopBtn from '../component/TopBtn';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// import required modules
import { Autoplay, Scrollbar } from 'swiper/modules';

function Home() {
  const { data, fetchAllData } = useStore();       // zustand를 이용하여 데이터 불러오기
  const [ loading, setLoading ] = useState(true);  // 로딩 상태 관리

  const navigate = useNavigate();
  
  // 데이터 불러오기
  useEffect(()=>{
    window.scrollTo(0, 0); // 최상단으로 이동
    setLoading(true); // 로딩 시작

    const loadInitialData = async () => {
      try {
        await fetchAllData();
      } catch (err) {
        console.error('Home.jsx 데이터 fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();    

  }, [fetchAllData])

  // true 시 로딩 화면 표시
  if (loading) return <Loading/>;

  return (
    <>
      {/* 메인 슬라이드. Popular Movie만 표시. */}
      {data.mPop.length > 0 && (
        <Swiper
          scrollbar={{ hide: true }}
          autoplay={{ delay:3000, disableOnInteraction: false }}
          modules={[ Scrollbar, Autoplay ]}
          className="mySwiper">
          {
            data.mPop.map((item)=>{
              if (!item.backdrop_path || !item.poster_path || !item.overview) {
                return null; // backdrop_path나 poster_path, overview가 없으면 렌더링 안 함
              }
              return (
                <SwiperSlide key={item.id}>
                  {/* 각 슬라이드 전체 박스에 배경 이미지 추가 */}
                  <div className='mainBox'
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://image.tmdb.org/t/p/original${item.backdrop_path}')`,
                      backgroundSize: 'cover',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent)',
                      maskImage: 'linear-gradient(to bottom, black 95%, transparent)',
                    }}>
                    {/* 포스터 이미지 */}
                    <p><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} /></p>

                    {/* 내용 */}
                    <div className='text'>
                      <h3>{item.title}</h3>
                      <p>{item.overview}</p>

                      {/* 상세페이지로 이동하는 버튼 */}
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
      )}

      {/* popular, top movie/tv 스와이퍼 */}
      { 
        data.mTop.length > 0 && data.mPop.length > 0 && data.sTop.length > 0 && data.sPop.length > 0 && (
          <>
            <MainList mTop={data.mTop} mPop={data.mPop}
                      sTop={data.sTop} sPop={data.sPop}
            />
          </>
        )
      }

      <TopBtn className={'topBtn'}/>
    </>
  )
}

export default Home