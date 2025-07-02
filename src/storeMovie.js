import axios from "axios";
import { create } from 'zustand'


const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: 'f89a6c1f22aca3858a4ae7aef10de967',
        language: 'ko-kr'
    }
});

// zustand 정의
export const useStore = create((set) => ({
    data:{
        mPop: [],
        mTop: [],
        sPop: [],
        sTop: []
    },
    
    // 서버 data 받기 - 전체
    fetchAllData: async () => {
        let res;
        res = await Promise.all([
                instance.get('/movie/popular'),
                instance.get('/movie/top_rated'),
                instance.get('/tv/popular'),
                instance.get('/tv/top_rated')])
                
        set({ 
            data:{
                mPop:res[0].data.results,
                mTop:res[1].data.results,
                sPop:res[2].data.results,
                sTop:res[3].data.results
            }
        });
    },

    // 서버 data 받기 -> 서브 페이지에서 사용
    fetchData: async (t1, t2, pageNum) => {
        let res;
        res = await instance.get(`/${t1}/${t2}`, { params: { page: pageNum } });
        return res.data.results;
    }
}));
