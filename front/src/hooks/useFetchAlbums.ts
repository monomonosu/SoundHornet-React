import { useCallback, useState } from 'react';
import axios from 'axios';
import { AlbumAddMusicCount } from '../types/albumsAddMusicCount';

const useFetchAlbums = () => {
    const [albums, setAlbums] = useState<AlbumAddMusicCount[]>([]);
    const getAlbums = useCallback(async (url: string) => {
        await axios.get(url)
            .then((response) => {
                console.log(response.data);
                setAlbums(response.data);
            });
    }, []);
    return { albums, setAlbums, getAlbums };
};

export default useFetchAlbums;
