import { useCallback } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMusics } from '../redux/musicsSlice';
import type { Music } from '../types/musics';

const useFetchMusics = () => {
    const dispatch = useDispatch();
    const musics: Music[] = useSelector((state: any) => state.musics.musics);
    const getMusics = useCallback(async (url: string) => {
        await axios.get(url)
            .then((response) => {
                console.log(response.data);
                dispatch(setMusics(response.data));
            });
    }, []);
    return { musics, setMusics, getMusics };
};

export default useFetchMusics;
