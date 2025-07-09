
/* ![img-thumb-05](https://github.com/user-attachments/assets/cd8ff719-4670-4f50-9bd4-7ab857d9c163) */
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

* 영화, TV 프로그램 등 타입별 리스트 출력
* 검색 기능을 통한 사용자 만족도 향상

### 3. 핵심 기능

* API 데이터 기반 실시간 정보 제공
* 검색 기능
* 미디어 타입별 리스트 출력
* 클릭 시 상세페이지로 이동 가능
* 반응형 디자인

### 4. 주요 기술 스택

* Front-End : React, Zustand, React Router
* API 활용 : TheMovieDB

## 📆 기간 및 인원

  * 총 작업 기간 : 5일
    * 작업 기간 : 3일
    * 추가 수정 기간 : 2일
   
  * 인원 : 개인 프로젝트 (1명)

## 💡 주요 기능

### 1. TheMovieDB API 활용
* TheMovieDB 오픈 API를 활용하여 각종 영화,
* TV프로그램 정보 제공

### 2. 검색
* 키워드 기반 미디어 검색 기능

### 3. 미디어 상세 정보
* 포스터, 개봉일, 줄거리, 출연진, 영상까지 확인 가능
* 비슷한 콘텐츠 추천 기능 제공 (장르 기반)

## 🗂️ 폴더 구조

```
📂Zflix-Project
┣ 📂zflix                     # ZFLIX
┃ ┣ 📂public
┃ ┃ ┣ 📂fonts
┃ ┃ ┣ 📂imgs
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

### 2. UI/UX 라이브러리

| 사용기술 | 설명 | Badge |
| :---:| :---: | :---: |
| **Swiper** | **슬라이더** |![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=axios&logoColor=white)|
| **Sass** | **스타일링**|![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white)|

### 3. 개발 도구

|사용기술 | 설명 | Badge | 
| :---:| :---: | :---: |
| **Visual Studio Code (VS Code)** | **코드 편집기( 에디터 )** |![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjAwMyAyTDEyIDEzLjMwM0w0Ljg0IDhMMiAxMEw4Ljc3MiAxNkwyIDIyTDQuODQgMjRMMTIgMTguNzAyTDI0LjAwMyAzMEwzMCAyNy4wODdWNC45MTNMMjQuMDAzIDJaTTI0IDkuNDM0VjIyLjU2NkwxNS4yODkgMTZMMjQgOS40MzRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K&logoColor=white) |
|**GitHub** | **버전 관리** |![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)| 
| **Vercel** | **서버리스 플랫폼** |![vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)|
| **Figma** | **디자인 & UI/UX**|![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white) |

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
8. TopBtn.jsx : 최상단으로 스크롤 이동하기 위한 탑버튼.

### 페이지 목록
- [홈](https://zflix-one.vercel.app)
- [영화 리스트](https://zflix-one.vercel.app/movie)
- [TV프로그램 리스트](https://zflix-one.vercel.app/tv)

(상세 페이지는 미디어 ID를 기반으로 구성됩니다. 아래는 ID가 포함된 예시 링크이므로 참고 바랍니다.)
- [영화 상세](https://zflix-one.vercel.app/movie/1241982)
- [TV프로그램 상세](https://zflix-one.vercel.app/tv/5092)

## 💥 이슈 및 해결

### 1. Media.jsx
- 더보기 버튼 클릭 시 스크롤이 상단으로 올라가는 문제
- 상황: setList([...list, ...res])처럼 상태 변경으로 인해 전체 컴포넌트가 리렌더링되며, 스크롤이 상단으로 튀는 문제 발생
- **해결**: window.scrollTo(0, 0)가 모든 리렌더링마다 실행되지 않도록 useEffect에 []으로 설정하여 조절.


### 1-2. ProductDetail.jsx
- 하단 구매 바(BottomBar) 애니메이션 실행 중 상세 내용이 리렌더링되어 스크롤이 이동하고 화면이 깜빡이는 현상
- **해결**: 상세 내용을 별도 컴포넌트(DetailContent)로 분리하고 React.memo를 적용하여 불필요한 리렌더링을 방지
