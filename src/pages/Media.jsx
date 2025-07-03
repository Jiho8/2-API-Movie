import React, { useEffect, useState } from 'react'
import { useStore } from '../storeMovie';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import MediaItem from '../component/MediaItem';
import '../styles/media.scss';
import Loading from '../component/Loading';
import NoData from '../component/NoData';

function Media() {
    const { fetchData } = useStore();        // store에서 데이터 가져오는 함수
    const [ list, setList ] = useState([]);  // 데이터 리스트 관리
    const [ pageCount, setPageCount ] = useState(1);  // 페이지 번호 관리 (더보기용)
    const [ loading, setLoading ] = useState(true);   // 로딩 상태 관리     
    const [ isSearched, setIsSearched ] = useState(false);  // 검색 상태 관리
    
    const { type } = useParams();    // tv 또는 movie
    const { state } = useLocation(); // t2, title 전달 받기

    const t1 = ['movie', 'tv'].includes(type) ? type : 'tv';
    const t2 = state?.t2 || 'popular';
    const pageTitle = state?.title || (t1 === 'movie' ? 'Movies' : 'TV Series');
    
    async function dataMore(t1, t2, pageNum){
        const res = await fetchData(t1, t2, pageNum);
        setList((prev) => [...prev, ...res]);
    }

    useEffect(() => {
        setLoading(true); // 🔴 로딩 시작

        const timeout = setTimeout(() => {
            setLoading(false); // ✅ 로딩 종료
        }, 600);

        return () => clearTimeout(timeout); // 🧹 정리
    }, [t1, t2]);
    
    // 페이지 최상단으로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 1. t1, t2가 바뀔 때 리스트 초기화 & 페이지 리셋
    useEffect(() => {
        resetSearch();
    }, [t1, t2])

    // 2. 페이지 수 바뀔 때 fetchData 실행
    useEffect(()=>{
        if (isSearched) return;
        dataMore(t1, t2, pageCount);
    },[pageCount, t1, t2]);

    function searchData(keyword){
        axios.get(`https://api.themoviedb.org/3/search/${t1}?query=${keyword}&api_key=f89a6c1f22aca3858a4ae7aef10de967`)
        .then((res)=>{
            setList(res.data.results);
            setIsSearched(true);
            setPageCount(1);
        })
    }

    function resetSearch() {
        setIsSearched(false);
        setList([]);
        setPageCount(1);

        // 강제 fetch
        fetchData(t1, t2, 1).then(res => {
            setList(res);
        });
    }

    if (loading) return <Loading/>;

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
                list.map((item, i) =>
                    item.poster_path && <MediaItem key={i} data={item} type={t1} />
                )
            )}
        </div>

        {!isSearched && (
            <button onClick={()=>{ setPageCount( pageCount + 1) }} className='moreBtn'>Load More</button>
        )}

        {isSearched && (
            <button onClick={resetSearch} className='moreBtn'>
                🔄 검색 초기화
            </button>
        )}
    </>
    )
}

export default Media