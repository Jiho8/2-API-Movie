
![zflix_readme](https://github.com/user-attachments/assets/b5cff5e0-91b6-47e4-a626-d65f79ee4923)

## 🎞 소개
<b>ZFLIX</b>는 TheMovieDB API를 기반으로, 사용자가 원하는 콘텐츠를 빠르게 찾고 <br> 
더 풍부한 정보를 탐색할 수 있도록 설계한 미디어 정보 플랫폼입니다. <br>

React를 기반으로 개발되었으며, Zustand로 상태를 효율적으로 관리하고 <br> 
React Router로 SPA 구조를 구현했습니다. <br> 
검색 기능과 장르 기반 추천 기능을 통해 새로운 콘텐츠를 자연스럽게 탐색할 수 있도록 했고, <br> 
출연진, 영상, 제작사 등 다양한 정보를 시각적으로 보여주어 콘텐츠 몰입도를 높였습니다. <br> 

이 프로젝트를 진행하며 API 연동, 반응형 UI, 조건부 렌더링, 비동기 처리 등 <br> 
프론트엔드 실무에서 중요한 기술을 체계적으로 학습하며 적용했습니다.

## 🔗 배포 URL
https://zflix-one.vercel.app

## 📑 프로젝트 요약

### 1. 주제

* TheMovieDB API를 활용한 영화 및 TV 프로그램 정보 제공 웹

### 2. 목표

* 영화 및 TV 프로그램 실시간 정보 제공
* 검색, 타입별 리스트 등을 통한 사용자 편의 향상

### 3. 주요 기능

* SPA 구조로 빠른 페이지 전환 구현
* 영화 및 TV 프로그램에 대한 키워드 기반 검색 기능 제공
* Swiper를 이용한 슬라이드형 UI 구성
* 상세 페이지에서 줄거리•출연진•영상 등의 정보 제공
* '더보기' 버튼을 통한 콘텐츠 로딩
* 반응형 UI

### 4. 주요 기술 스택

* Front-End : React, Zustand, React Router
* API 활용 : TheMovieDB

## 📆 기간 및 인원

  * 총 작업 기간 : 6일
    * 작업 기간 : 3일
    * 추가 수정 기간 : 3일
   
  * 인원 : 개인 프로젝트 (1명)

## 💡 기능 구현 상세

### 1. TheMovieDB API 활용
* 영화 및 TV 프로그램의 다양한 정보를 API로 불러와 제공
* 장르별 구분, 이미지, 상세정보 등 포함
* `useEffect`를 활용한 비동기 데이터 처리

### 2. 검색 기능
* 키워드 기반 검색
* 입력 시 관련 영화•TV 프로그램 목록 제공

### 3. React Swiper 모듈을 활용한 슬라이드 인터페이스
* Home 페이지의 메인 배너 및 카테고리별 미디어 리스트(Top Rated, Trending 등)를 슬라이드 형태로 구성 
* TV 프로그램의 관련 콘텐츠도 슬라이드로 구성하여 콘텐츠 흐름 유지
* 모바일에서도 자연스러운 터치 UX 지원

### 4. 관련 콘텐츠 추천
* API 내 장르 데이터를 활용한 관련 콘텐츠 추천
* `Math.random()`을 통해 랜덤으로 데이터를 구성하여 화면에 표시

### 5. '더보기' 버튼 기능
* 버튼 클릭 시 20개씩 더 보여주는 방식
* 긴 목록을 점진적으로 로딩하여 성능과 UX 향상

## 🗂️ 폴더 구조

```
📂Zflix-Project
┣ 📂zflix                     # ZFLIX
┃ ┣ 📂public
┃ ┃ ┣ 📂fonts                 # 폰트
┃ ┃ ┣ 📂imgs                  # 이미지
┃ ┣ 📂src
┃ ┃ ┣ 📂component             # 컴포넌트 폴더
┃ ┃ ┣ 📂pages                 # 각 페이지 컴포넌트 폴더
┃ ┃ ┗ 📂styles                # scss
┃ ┃ ┗ 📜storeMovie.js         # Zustand
┃ ┃ ┗ 📜App.js                # 프로젝트의 전체 라우팅 및 최상위 컴포넌트
┗ ┗ README.md
```

## 💻 개발 환경

### 1. Frond-End

| 사용기술 | 설명 |Badge |
| :---:| :---: | :---: |
| **React** | **SPA기반 프레임워크** |![react](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)|
| **React Router Dom** | **페이지 라우팅 관리** |![reactrouter](https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white)|
| **React Hook Form** | **폼 상태 및 데이터 관리** |![reacthookform](https://img.shields.io/badge/ReactHookForm-F24E1E?style=flat-square&logo=reacthookform&logoColor=white)|
| **Axios** | **HTTP 클라이언트 라이브러리** |![axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)|
| **Zustand** | **상태 관리** |![Zustand](https://img.shields.io/badge/Zustand-181717?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAv0lEQVQ4jeVUMQ7DIAx0KmZGlJGJB+RBjLyC1/ADVr7AC8gzCBJs7lCpUhqw0qpDqp7kxSefDWd5QkQYwVqLQogh/4oYIwAiDiOlhO/AOYe30+1P4g8FGUUqpSaC7q4Hs9ai1rorFkJAKeUuX0qBZVmGjZgQApRSXVJKeeByzsTQv2DK911urXX/hXMOpZQDt20bcM67NbVWmKjj8AnIJ6/rivDYt2fknMkJrm/K9QXJ4+C9h3med7laKxhjhjV3vjqJYwKihcAAAAAASUVORK5CYII=&logoColor=white)|
| **Node.js** | **JavaScript 런타임 환경 (프론트엔드 개발 및 빌드 도구 실행용)** |![nodedotjs](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)|

### 2. UI/UX 라이브러리

| 사용기술 | 설명 | Badge |
| :---:| :---: | :---: |
| **Swiper** | **슬라이더** |![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=axios&logoColor=white)|
| **Sass** | **스타일링**|![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white)|

### 3. 개발 도구

|사용기술 | 설명 | Badge | 
| :---:| :---: | :---: |
| **Visual Studio Code (VS Code)** | **코드 편집기( 에디터 )** |![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjAwMyAyTDEyIDEzLjMwM0w0Ljg0IDhMMiAxMEw4Ljc3MiAxNkwyIDIyTDQuODQgMjRMMTIgMTguNzAyTDI0LjAwMyAzMEwzMCAyNy4wODdWNC45MTNMMjQuMDAzIDJaTTI0IDkuNDM0VjIyLjU2NkwxNS4yODkgMTZMMjQgOS40MzRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K&logoColor=white) |
| **GitHub** | **버전 관리** |![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)| 
| **Vercel** | **서버리스 플랫폼** |![vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)|
| **Figma** | **디자인 & UI/UX** |![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white) |

<hr>

# 개발 상세

## 📑 요약

### 컴포넌트
1. Header.jsx : 화면 상단에 고정할 헤더. 로고, 페이지 링크 포함. 
2. Footer.jsx : 홈 화면 하단에 위치하는 푸터.
3. Loading.jsx : 페이지 진입 시 표시할 로딩 컴포넌트.
4. MainItem.jsx : 홈 화면에 표시할 스와이퍼 컴포넌트. 
5. MainList.jsx : `MainItem.jsx` 내 각 아이템.
6. MediaItem.jsx : Movie, TV 페이지 내 각 아이템 컴포넌트.
7. NoData.jsx : 검색 시 데이터 없음 표시용 컴포넌트.
8. SeasonAccordion.jsx : TV프로그램 상세 페이지 내 시즌 정보 아코디언.
9. TopBtn.jsx : 최상단으로 스크롤 이동하기 위한 탑버튼.

### 페이지 목록
- [홈](https://zflix-one.vercel.app)
- [영화 리스트](https://zflix-one.vercel.app/movie)
- [TV프로그램 리스트](https://zflix-one.vercel.app/tv)

- (상세 페이지는 미디어 ID를 기반으로 구성됩니다. 아래는 ID가 포함된 예시 링크이므로 참고 바랍니다.)
- [영화 상세](https://zflix-one.vercel.app/movie/1241982)
- [TV프로그램 상세](https://zflix-one.vercel.app/tv/5092)

## 💥 이슈 및 해결

### 1. 페이지 스크롤 위치 문제 해결
- 페이지 이동 시 스크롤이 내려간 상태로 로드되거나 로딩 화면이 잘려 보임
- **원인**: 브라우저가 페이지 전환 시 이전 스크롤 위치를 자동으로 복원하려 하지만, 앱의 렌더링 타이밍과 맞지 않아 생기는 충돌에 의해 발생
- **해결 1**: `index.js` 파일에 아래 코드를 추가하여 브라우저의 자동 스크롤 복원 기능 해제.
```
// 브라우저의 기본 스크롤 복원 기능을 수동으로 제어하도록 설정
if (window.history.scrollRestoration) {
  window.history.scrollRestoration = 'manual';
}
```
- **해결 2**: `Home.jsx`, `Media.jsx` 등 모든 페이지 컴포넌트의 useEffect 훅 내부에 `window.scrollTo(0, 0);` 코드 유지


### 2. 유효하지 않은 영상 데이터 처리
- 상세 페이지에 영상이 표시되지 않거나, 썸네일이 깨지고 클릭해도 영상이 존재하지 않는 문제 발생
- **원인**: TMDB API에서 제공하는 영상 정보 중 일부는 유튜브에서 비공개되었거나 삭제되어, 썸네일 이미지 또는 영상 링크가 유효하지 않음.
- **해결**: 유튜브 oEmbed API를 통해 실제 존재하는 영상인지 확인한 뒤, 유효한 영상만 필터링하여 최대 3개까지 표시
```
// `DetailMovie.jsx` 내 영상 필터링 처리
const checkVideoExistence = async (video) => {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.key}`;
  try {
    const res = await fetch(url);
    return res.ok ? video : null;
  } catch {
    return null;
  }
};
```

### 3. 허전한 레이아웃 변경
- TV 프로그램의 시즌 정보를 Swiper로 보여주던 중, `overview` 등의 정보가 부족한 경우 내용이 매우 짧고 포스터는 세로형이라 빈 부분이 많이 생기는 문제 발생
- **원인**: 컨텐츠 양이 적은데도 Swiper를 사용하여 UX적으로 불필요하게 느껴지고, 이미지가 공간을 충분히 채우지 못해 허전하게 느껴짐.
- **해결**: Swiper 대신 아코디언 형태로 변경하여 시즌 이름만 리스트 형태로 보여주고, 클릭 시 해당 상세 정보가 펼쳐지도록 구성하여 정보 밀도 및 사용성 개선.
