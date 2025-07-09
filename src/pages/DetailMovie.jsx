import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import MainItem from '../component/MainItem';
import Loading from '../component/Loading';
import TopBtn from '../component/TopBtn';
import '../styles/detail.scss';

function DetailMovie() {
  // 현재 경로에서 id 추출
  const pathName = window.location.pathname;
  const num = pathName.lastIndexOf('/') + 1;
  const id = pathName.substr(num); // 예: /movie/1234 → 1234

  const navigate = useNavigate();

  const [ loading, setLoading ] = useState(true);       // 로딩 상태 관리
  const [ detailData, setDetailData ] = useState([]);   // 해당 컨텐츠 상세 내용
  const [ similarContents, setSimilarContents ] = useState([]);  // 같은 장르의 다른 컨텐츠
  const [ validVideos, setValidVideos ] = useState([]); // 유효한 비디오 관리
  
  // 페이지 진입 시 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  
  // 데이터 요청 및 유효성 검사
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. 경로 내 id 값 이용하여 해당 데이터 상세 내용 요청
        const detailRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
            append_to_response: 'videos,images,casts',
            language: 'ko-kr',
          }
        });

        const data = detailRes.data;
        setDetailData(data);
    
        // 2. 장르 기반 유사 컨텐츠 불러오기
        if (data.genres?.length > 0) {
          const genreIds = detailData?.genres?.map(g => g.id).join(',');
          const similarRes = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
            params: {
              api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
              language: 'ko-KR',
              region: 'KR',
              sort_by: 'popularity.desc',
              with_genres: genreIds,
              page: Math.floor(Math.random() * 5) + 1  // 1~5페이지 중 랜덤
            }
          });

          const shuffled = similarRes.data.results.sort(() => 0.5 - Math.random());
          setSimilarContents(shuffled.slice(0, 10));
        }

        // 3. YouTube 영상 필터링
        const youtubeVideos = data.videos?.results?.filter(v => v.site === 'Youtube') || [];
        const valid = [];

        for (const video of youtubeVideos) {
          const thumbUrl = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

          try {
            const res = await fetch(thumbUrl, { method: 'HEAD' });
            if (res.ok) valid.push(video);
          } catch (e) {
            console.warn(`썸네일을 찾을 수 없습니다.: ${video.name}`, e);
          }
          
          if (valid.length === 3) break; // 최대 3개까지만
        }
        setValidVideos(valid);
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

        {/* 영화 상세 내용 */}
        <div className='detailContents'>
          {/* 포스터 이미지 */}
          <p className='detailContents-left'>
            <img src={`https://image.tmdb.org/t/p/w400${detailData.poster_path}`} alt="poster" />
          </p>

          {/* 내용 텍스트 */}
          <div className='detailContents-right'>
            {/* 제목 */}
            <h3>{detailData.title}</h3>

            {/* 개봉일 및 런타임 */}
            <div className='detailDateNTime'>
              <p>{detailData.release_date}</p>
              <span>{`${detailData.runtime} 분`}</span>
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
            {detailData.vote_average > 0 && (
              <p className='detailVote'>
                ★ {detailData.vote_average}
              </p>
            )}

            {/* 주요배우. 데이터가 있을 때만 표시 */}
            {detailData?.casts?.cast?.length > 0 && (
              <div className='detailCastBox'>
                <p>출연</p>

                {/* 배우 리스트. 최대 4명만 표시. */}
                <ul className='detailCastList'>
                  {
                    detailData?.casts?.cast?.slice(0, 4).map((cast)=>(
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

        {/* 유튜브 영상 정보. 데이터가 있을 때만 표시. */}
        {validVideos?.length > 0 && (
          <div className='detailVideoBox'> 
            <span className='detailVideoBoxTitle'>📹 관련 영상 보기</span>

            {/* 영상 리스트. 유튜브만 최대 3개만 표시. */}
            <ul className='detailVideoList'>
              {
                validVideos.map((video) => (
                  <li key={video.id}>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.key}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {/* 썸네일 이미지 */}
                      <p className='videoThumb'>
                        <img src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt={video.name} />
                      </p>

                      {/* 영상 제목 */}
                      <span>{video.name}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        )}

        {/* 구분선 */}
        <hr />

        {/* 비슷한 컨텐츠 (슬라이드) */}
        {similarContents?.length > 0 && (
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
                  if (!item.poster_path) {return null;}
                  return (
                    <SwiperSlide key={item.id}>
                      <MainItem item={item} type={'movie'}/>
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

export default DetailMovie