import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainItem from '../component/MainItem';
import Loading from '../component/Loading';
import TopBtn from '../component/TopBtn';
import SeasonAccordion from '../component/SeasonAccordion';
import '../styles/detail.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function DetailTv() {
  // 현재 경로에서 id 추출
  const pathName = window.location.pathname;
  const num = pathName.lastIndexOf('/') + 1;
  const id = pathName.substr(num);  // 예: /tv/1234 → 1234

  const navigate = useNavigate();

  const [ loading, setLoading ] = useState(true);       // 로딩 상태 관리
  const [ detailData, setDetailData ] = useState([]);   // 해당 컨텐츠 상세 내용
  const [ similarContents, setSimilarContents ] = useState([]);  // 같은 장르의 다른 컨텐츠

  // 페이지 진입 시 최상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  
  // 데이터 요청 및 유효성 검사
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. 경로 내 id 값 이용하여 해당 데이터 상세 내용 요청
        const detailRes = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
          params: {
            api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
            append_to_response: 'videos,images,credits',
            language: 'ko-kr',
          }
        });

        // detailData 변수에 요청 결과 할당 
        const data = detailRes.data;
        setDetailData(data);
    
        // 2. 장르 기반 유사 컨텐츠 불러오기
        if (data.genres?.length > 0) {
          const genreIds = detailData?.genres?.map(g => g.id).join(',');
          const similarRes = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
            params: {
              api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
              language: 'ko-KR',
              region: 'KR',
              sort_by: 'popularity.desc',
              with_genres: genreIds,
              page: Math.floor(Math.random() * 5) + 1  // 1~5페이지 중 랜덤
            }
          });

          // 랜덤으로 순서 정하여 10개의 데이터만 변수에 할당
          const shuffled = similarRes.data.results.sort(() => 0.5 - Math.random());
          setSimilarContents(shuffled.slice(0, 10));
        }
      } catch (err) {
        console.error('데이터 요청 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);
  
  // true 시 로딩 표시
  if (loading) return <Loading/>;
  
  return (
    detailData && (
      <div className='detail'>
        {/* background */}
        <div className="detailBackground" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://image.tmdb.org/t/p/original${detailData.backdrop_path}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          position: 'relative'
          }}>
        </div>

        {/* 뒤로가기 버튼 */}
        <p className='detailBackBtn' onClick={() => navigate(-1)}>
          <img src="/imgs/icon-back.svg" alt="backIcon" /> 
          <span>뒤로가기</span>
        </p>

        {/* TV series 상세 내용 */}
        <div className='detailContents'>
          {/* 포스터 이미지 */}
          <p className='detailContents-left'>
            <img src={`https://image.tmdb.org/t/p/w400${detailData.poster_path}`} alt="poster" />
          </p>

          {/* 내용 텍스트 */}
          <div className='detailContents-right'>
            {/* 제목 */}
            <h3>{detailData.name}</h3>

            {/* 방영일 및 런타임 */}
            <div className='detailDateNTime'>
              <p>
                {detailData.status === 'Ended'
                  ? `${detailData.first_air_date} ~ ${detailData.last_air_date}`
                  : `${detailData.first_air_date} ~ 방영 중`
                }
              </p>
              <span>{`${detailData.number_of_seasons} 시즌 | ${detailData.number_of_episodes} 회차`}</span>
            </div>

            {/* 장르 정보. 데이터가 있을 때만 표시. */}
            {detailData?.genres?.length > 0 && (
              <div className='detailGenres'>
                {detailData.genres?.map((gen) => (
                  <p key={gen.id}>{gen.name}</p>
                ))}
              </div>
            )}

            {/* overview. 데이터가 있을 때만 표시. */}
            {detailData?.overview !== "" && (
              <span className='detailOverview'>
                {detailData.overview}
              </span>
            )}

            {/* 평균 평점. 값이 0 이상일 때만 표시. */}
            {detailData?.vote_average > 0 && (
              <p className='detailVote'>
                ★ {detailData.vote_average}
              </p>
            )}

            {/* 주요 배우. 데이터가 있을 때만 표시 */}
            {detailData?.credits?.cast?.length > 0 && (
              <div className='detailCastBox'>
                <p>출연</p>

                {/* 배우 리스트. 최대 4명만 표시. */}
                <ul className='detailCastList'>
                  {
                    detailData?.credits?.cast?.slice(0, 4).map((cast)=>(
                      <li key={cast.id}>
                        {/* 이미지 */}
                        <p className='noPathBox'>
                          {
                            // 이미지가 없을 경우 로고 표시
                            cast.profile_path
                              ? <img src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`} alt="cast_img" />
                              : <span className='noLogoPath'>ZFLIX</span>
                          }
                        </p>

                        {/* 이름 */}
                        <span>{cast.name}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}

            {/* 주요 제작진. 데이터가 있을 때만 표시 */}
            {detailData?.credits?.crew?.filter(c => c.job === 'Director').length > 0 && (
              <div className='detailCastBox'>
                <p>PD</p>

                {/* 제작진 리스트. 최대 4명만 표시. */}
                <ul className='detailCastList'>
                  {
                    detailData?.credits?.crew?.filter(c => c.job === 'Director').slice(0, 3).map((crew)=>(
                      <li key={crew.id}>
                        {/* 이미지 */}
                        <p className='noPathBox'>
                          {
                            // 이미지가 없을 경우 로고 표시
                            crew.profile_path
                              ? <img src={`https://image.tmdb.org/t/p/w200/${crew.profile_path}`} alt="cast_img" />
                              : <span className='noLogoPath'>ZFLIX</span>
                          }
                        </p>

                        {/* 이름 */}
                        <span>{crew.name}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}

            {/* 제작사 */}
            {detailData?.production_companies?.length > 0 && (
              <div className='detailCompanyBox'>
                <p>제작사</p>

                {/* 제작사 리스트. 최대 3개의 데이터만 표시 */}
                <ul className='detailCompanyList'>
                  {
                    detailData?.production_companies?.slice(0, 3).map((prod) => (
                      <li key={prod.id}>
                        {/* 이미지 */}
                        <p className='noPathBox'>
                          {
                            // 이미지가 없을 경우 로고 표시
                            prod.logo_path
                            ? <img src={`https://image.tmdb.org/t/p/w200/${prod.logo_path}`} alt="company" />
                            : <span className='noLogoPath'>ZFLIX</span>
                          }
                        </p>

                        {/* 제작사명 */}
                        <span>{prod.name}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* 시즌 정보. 데이터가 있을 때만 표시. */}
        {detailData?.seasons?.length > 0 && (
          <div className='detailSeasonBox'> 
            <span className='detailSeasonBoxTitle'>📺 시즌 정보</span>
            <SeasonAccordion data={detailData.seasons} className={'seasonAccordion'}/>
          </div>
        )}

        {/* 구분선 */}
        <hr />

        {/* 비슷한 컨텐츠 (슬라이드) */}
        {similarContents?.length > 0 && (
          <div className='detailSliderBox'>
            <span>비슷한 컨텐츠</span>
            <Swiper
              slidesPerView={'auto'}
              loop={true}
              spaceBetween={15}
              grabCursor={true}
              className="detailSlider">
              {
                similarContents?.map((item)=>{
                  if (!item.poster_path) {return null;}
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

      <TopBtn className={'topBtn'}/>
      </div>
    )
  )
}

export default DetailTv