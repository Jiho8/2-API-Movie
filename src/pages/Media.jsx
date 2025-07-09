import React, { useCallback, useEffect, useState } from 'react'
import { useStore } from '../storeMovie';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import MediaItem from '../component/MediaItem';
import Loading from '../component/Loading';
import NoData from '../component/NoData';
import TopBtn from '../component/TopBtn';
import '../styles/media.scss';

function Media() {
    const { fetchData } = useStore(); // zustand 데이터 가져오기

    const [ list, setList ] = useState([]);  // 전체 데이터 관리
    const [ pageCount, setPageCount ] = useState(1);  // 페이지 값 관리
    const [ loading, setLoading ] = useState(true);   // 로딩 상태 관리     
    const [ isSearched, setIsSearched ] = useState(false);  // 검색 상태 관리
    
    const { type } = useParams();    // tv 또는 movie
    const { state } = useLocation(); // title 전달 받기
    
    const t1 = ['movie', 'tv'].includes(type) ? type : 'tv';
    const t2 = state?.t2 || 'popular';
    const pageTitle = state?.title || (t1 === 'movie' ? 'Movies' : 'TV Series');

    // 데이터 요청 함수 (중복 제거 로직 포함)
    const loadPage = useCallback(async (pageNum, append = false) => {
        setLoading(true); // 로딩 시작

        try {
            const newData = await fetchData(t1, t2, pageNum); // 데이터 요청
            
            if (append) {
                setList(prevList => {
                    const existingIds = new Set(prevList.map(item => item.id));
                    const uniqueNewData = newData.filter(item => !existingIds.has(item.id));
                    return [...prevList, ...uniqueNewData];
                })
            } else {
                // 초기 로드 또는 검색
                setList(newData);
            }

            setPageCount(pageNum);
        } catch (error) {
            console.error('데이터 요청 실패:', error);
        } finally {
            setLoading(false);
        }
    }, [fetchData, t1, t2]);

    // 검색 결과 요청 함수
    const searchData = useCallback(async (keyword) => {
        setLoading(true); // 로딩 시작

        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/${t1}`, {
                params: { 
                    query: keyword,
                    api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
                    language: 'ko-kr',
                    region: 'KR'
                },
            });
            setList(res.data.results);
            setPageCount(1);
            setIsSearched(true);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('검색 데이터 요청 실패:', error);
        } finally {
            setLoading(false);
        }
    }, [t1]);
    
    // 초기 페이지 로드 및 페이지 전환 로직
    useEffect(() => {
        setList([]);       // 리스트 초기화
        setPageCount(1);   // 페이지 카운트 초기화
        loadPage(1, false) // 첫 페이지 로드
        setIsSearched(false);  // 검색 상태 초기화
        window.scrollTo(0, 0); // 항상 최상단으로 스크롤
    }, [t1, loadPage])

    if (loading && list?.length === 0) return <Loading/>;

    return (
        <>
            <h2 className='pageTitle'>{pageTitle}</h2>

            <div className='searchBox'>
                <form onSubmit={(e)=>{e.preventDefault(); searchData(e.target.keyword.value)}}>
                    <div className='inputWrapper'>
                    <input type='text' name="keyword" placeholder='Enter Keyword...'></input>
                    </div>
                    <button>Search</button>
                </form>
            </div>

            <div className='tvBox'>
                {isSearched && list.length === 0 ? (
                    <NoData/>
                ) : (
                    list?.map((item) =>
                        item.poster_path && <MediaItem key={item.id} data={item} type={t1} />
                    )
                )}
            </div>

            {!isSearched && (
                <button 
                    onClick={() => {
                        const nextPage = pageCount + 1;
                        setPageCount(nextPage);
                        loadPage(nextPage, true); // 다음 페이지 로드
                    }} 
                    className='moreBtn'>Load More</button>
            )}

            {isSearched && (
                <button onClick={() => {
                    setList([]); // 리스트 초기화
                    setPageCount(1); // 페이지 카운트 초기화
                    loadPage(1, false); // 첫 페이지 데이터 다시 로드
                    setIsSearched(false); // 검색 상태 해제
                    window.scrollTo(0, 0); // 스크롤 최상단
                }} className='moreBtn'>🔄 검색 초기화</button>
            )}

            {/* 탑버튼 */}
            <TopBtn className={'topBtn'}/>
        </>
    );
}

export default Media