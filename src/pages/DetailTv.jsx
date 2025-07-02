import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import MainItem from '../component/MainItem';
import Loading from '../component/Loading';
import '../styles/detail.scss';

function DetailTv() {
  const pathName = window.location.pathname;
  const num = pathName.lastIndexOf('/') + 1;
  const id = pathName.substr(num);

  const navigate = useNavigate();

  const [ loading, setLoading ] = useState(true);
  const [detailData, setDetailData] = useState([]);   // 해당 컨텐츠 상세 내용
  const [similarContents, setSimilarContents] = useState([]);  // 같은 장르의 다른 컨텐츠

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);
  
  // 페이지 최상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  
  // 경로 내 id 값 이용하여 해당 데이터 상세 내용 불러오기
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f89a6c1f22aca3858a4ae7aef10de967&append_to_response=videos,images,credits&language=ko-kr`)
    .then((res) => {
      setDetailData(res.data);
    })
  }, [id])

  // 데이터 내 장르 id 이용하여 같은 장르의 다른 컨텐츠 불러오기
  useEffect(() => {
    if(!detailData.genres) return;

    const genreIds = detailData?.genres?.map(g => g.id).join(',');

    axios.get(`https://api.themoviedb.org/3/discover/tv`, {
      params: {
        api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
        language: 'ko-KR',
        region: 'KR',
        sort_by: 'popularity.desc',
        with_genres: genreIds,
        page: Math.floor(Math.random() * 5) + 1  // 1~5페이지 중 랜덤
      }
    }).then(res => {
      const shuffled = res.data.results.sort(() => 0.5 - Math.random());
      const picked = shuffled.slice(0, 10);
      setSimilarContents(picked);
    });
  }, [detailData.genres])
  
  if (loading) return <Loading/>;

  return (
    detailData && (
      <div className='detail'>
        {/* background */}
        <div className="detailBackground" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://image.tmdb.org/t/p/original${detailData.backdrop_path}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '70vh',
          position: 'relative'
          }}>
        </div>

        <p className='detailBackBtn' onClick={() => navigate(-1)}>
          <img src="/imgs/icon-back.svg" alt="backIcon" /> 
          <span>뒤로가기</span>
        </p>

        {/* detail 내용 */}
        <div className='detailContents'>
          {/* 이미지 */}
          <p className='detailContents-left'>
            <img src={`https://image.tmdb.org/t/p/w400${detailData.poster_path}`} alt="poster" />
          </p>

          {/* 내용 텍스트 */}
          <div className='detailContents-right'>
            {/* 제목 */}
            <h3>{detailData.title || detailData.name}</h3>

            {/* 개봉일 및 런타임 */}
            <div className='detailDateNTime'>
              <p>{detailData.first_air_date}</p>
              <span>{`${detailData.number_of_seasons} 시즌 | ${detailData.number_of_episodes} 회차`}</span>
            </div>

            {/* 장르 */}
            <div className='detailGenres'>
              {detailData.genres?.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
            </div>

            {/* overview */}
            <span className='detailOverview'>
              {detailData.overview}
            </span>

            {/* 별점 */}
            {detailData.vote_average && 
              <p className='detailVote'>
                ★ {detailData.vote_average}
              </p>
            }

            {/* 주요배우 */}
            <div className='detailCastBox'>
              <p>출연</p>
              <ul className='detailCastList'>
                {
                  detailData?.credits?.cast?.slice(0, 4).map((cast)=>(
                    <li key={cast.id}>
                      <p>
                        <img src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`} alt="cast_img" />
                      </p>
                      <span>{cast.name}</span>
                    </li>
                  ))
                }
              </ul>
            </div>

            {/* 제작사 */}
            {detailData?.production_companies?.length > 0 && (
              <div className='detailCompanyBox'>
                <p>제작사</p>
                <ul className='detailCompanyList'>
                  {
                    detailData?.production_companies?.slice(0, 3).map((prod) => (
                      <li key={prod.id}>
                        <p>
                          {
                            prod.logo_path
                            ? <img src={`https://image.tmdb.org/t/p/w200/${prod.logo_path}`} alt="company" />
                            : <span className='noLogoPath'>ZFLIX</span>
                          }
                        </p>
                        <span>{prod.name}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 비디오 */}
        {detailData?.videos?.results && (
          <div className='detailVideoBox'> 
            <span className='detailVideoBoxTitle'>📹 관련 영상 보기</span>
            <ul className='detailVideoList'>
              {
                detailData?.videos?.results?.filter(video => video.site === 'YouTube').slice(0,3).map((item) => (
                  <li key={item.id}>
                    <a
                      href={`https://www.youtube.com/watch?v=${item.key}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <p className='videoThumb'>
                        <img src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`} alt={item.name} />
                      </p>
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        )}

        <hr />

        {/* 비슷한 컨텐츠 */}
        {similarContents.length > 0 && (
          <div className='detailSliderBox'>
            <span>비슷한 컨텐츠</span>
            <Swiper
              modules={[Autoplay]}
              slidesPerView={'auto'}
              autoplay={false}
              loop={true}
              spaceBetween={15}
              grabCursor={true}
              className="detailSlider">
              {
                similarContents?.map((item)=>{
                return (
                  <SwiperSlide key={item.id}>
                    <MainItem item={item} type={'tv'}/>
                  </SwiperSlide>
                );
                })
              }
            </Swiper>
          </div>
        )}

      </div>
    )
  )
}

export default DetailTv