import React, { useEffect, useState } from 'react'

function SeasonAccordion({ data, className }) {
    const [openIndexes, setOpenIndexes] = useState([]); // 열린 인덱스 관리

    // 토글 시 인덱스 값 변경
    const toggleIndex = (index) => {
        setOpenIndexes(prev =>
        prev.includes(index)
            ? prev.filter(i => i !== index)
            : [...prev, index]
        );
    };

    // data 변경 시 인덱스 초기화
    useEffect(() => {
        setOpenIndexes([]);
    }, [data])

  return (
    <div className={className}>
        {data.map((item, index) => {
            const isOpen = openIndexes.includes(index); // 인덱스 기반 열림 상태 파악

            return (
                <div key={item.id} className="seasonItem">
                    {/* 제목 및 아이콘 (클릭 시 상세 내용 표시) */}
                    <button className="seasonTitle" onClick={() => toggleIndex(index)}>
                        {item.name}
                        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
                    </button>

                    {/* 내용 */}
                    {isOpen && (
                        <div className="seasonContent">
                            {/* 이미지 */}
                            <div className="thumbWrap">
                                {item.poster_path
                                    ? <img src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt={item.name} />
                                    : <div className="noImage">ZFLIX</div>}
                            </div>

                            {/* 텍스트 정보 */}
                            <div className="textInfo">
                                <p> <strong>방영일:</strong> {`${item.air_date} ~` || '정보 없음'} </p>
                                <p className='episode'> <strong>에피소드:</strong> {item.episode_count || 0} </p>
                                {item.vote_average > 0 && 
                                    <p> <strong>☆</strong> {item.vote_average} </p>
                                }
                                <p className="overview"> {item.overview || '설명이 제공되지 않았습니다.'} </p>
                            </div>
                        </div>
                    )}
                </div>
            );
        })}
    </div>
  )
}

export default SeasonAccordion