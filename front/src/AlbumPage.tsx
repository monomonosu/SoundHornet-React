import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Howl } from 'howler';
// component
import Header from './component/Header';
import PageTitle from './component/PageTitle';
import EditModal from './component/EditModal';
import Footer from './component/Footer';
import MusicTable from './component/MusicsTable';
import {
    Typography, Grid, Button, TextField, Card, CardActionArea, CardMedia, CardContent,
} from '@mui/material'
// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// types
import { Album } from './types/albums';
import { AlbumAddMusicCount } from './types/albumsAddMusicCount';
import type { MusicResource } from './types/musicResource';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { setPlayingId } from './redux/playingIdSlice';
import { setVolume } from './redux/volumeSlice';
import { setSounds } from './redux/soundsSlice';
import { setCurrentSound } from './redux/currentSoundSlice';
// hooks
import useFetchMusics from './hooks/useFetchMusics';
import useFetchAlbums from './hooks/useFetchAlbums';

export default function AlbumPage() {
    const [selectAlbum, setSelectAlbum] = useState<AlbumAddMusicCount>();
    const { albums, getAlbums } = useFetchAlbums();
    if (!selectAlbum) {
        return (
            <div>
                <Header></Header>
                <PageTitle title='Albums'></PageTitle>
                <Grid container justifyContent="flex-end">
                    <Grid item xs={1}></Grid>
                    <Grid>
                        <ModalContent getAlbums={getAlbums} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs>
                        <div>
                            <h2 style={{ color: "white" }}>AlbumList</h2>
                        </div>
                        <AlbumIndex setSelectAlbum={setSelectAlbum} albums={albums} getAlbums={getAlbums} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <div style={{ height: '150px' }}></div>
                <Footer></Footer>
            </div >
        );
    }
    return (
        <Album_MusicPage album={selectAlbum} setSelectAlbum={setSelectAlbum}></Album_MusicPage>
    )
}

export const ModalContent = (props: { getAlbums: (url: string) => Promise<void> }) => {
    const { getAlbums } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isProgress, setIsProgress] = useState(false);
    const [isSnackOpen, setIsSnackOpen] = useState(false);
    const modalOpen = () => setIsOpenModal(true);
    const modalClose = () => setIsOpenModal(false);
    const { register, handleSubmit } = useForm<Album>();

    const onSubmit: SubmitHandler<Album> = async (data) => {
        setIsProgress(true);
        await axios.post('/album', data)
            .then((response) => {
                console.log(response);
                getAlbums('/albums-attached-music-count');
            })
        setIsProgress(false);
        setIsOpenModal(false);
        setIsSnackOpen(true);
    }

    function onChangeHandle(newValue: number) { }

    const openButton = <Button color='success' variant="contained" size='large' style={{ textTransform: "none" }} onClick={modalOpen}>CreateAlbum</Button>;
    const editTitle = <Typography id="modal-modal-title" variant="h6" component="h2">CreateAlbum</Typography>
    const editContent = (
        <Typography id="modal-modal-description" sx={{
            mt: 2, '& .MuiTextField-root': { m: 1 },
        }}>
            <div>
                <TextField style={{ width: '25ch' }} label="albumName" type="text" {...register('albumName')} variant="standard" />
            </div>
            <div>
                <Button
                    sx={{ mt: 2 }}
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={handleSubmit(onSubmit)}
                >
                    submit
                </Button>
            </div>
        </Typography>
    )

    return (
        <div>
            <EditModal
                setIsSnackOpen={setIsSnackOpen}
                modalClose={modalClose}
                isOpenModal={isOpenModal}
                isProgress={isProgress}
                isSnackOpen={isSnackOpen}
                openButton={openButton}
                editTitle={editTitle}
                editContent={editContent}
                onChangeHandle={onChangeHandle}
            />
        </div>
    );
}

export const AlbumIndex = (props: {
    setSelectAlbum: React.Dispatch<React.SetStateAction<AlbumAddMusicCount | undefined>>,
    albums: AlbumAddMusicCount[],
    getAlbums: (url: string) => Promise<void>
}) => {
    const { setSelectAlbum } = props;
    const { albums, getAlbums } = props;
    useEffect(() => {
        getAlbums('/albums-attached-music-count');
    }, [])
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 3, md: 4 }}>
            {albums.map((album: AlbumAddMusicCount, index) => (
                <Grid item xs={1} sm={1} md={1} key={index}>
                    <AlbumMedia album={(album)} setSelectAlbum={setSelectAlbum} />
                </Grid>
            ))}
        </Grid>
    )
}

export const AlbumMedia = (props: { album: AlbumAddMusicCount, setSelectAlbum: React.Dispatch<React.SetStateAction<AlbumAddMusicCount | undefined>> }) => {
    const { album, setSelectAlbum } = props;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => setSelectAlbum(props.album)}>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.album.album_photo.path ? props.album.album_photo.path : 'static/resource/no_image_white.png'}
                    alt="album-photo"
                />
                <CardContent>
                    <Typography noWrap variant="h5" component="div" height={25}>
                        {props.album.albumName ? props.album.albumName : 'Unknown'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.album.musicsCount} sounds
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export const Album_MusicPage = (props: { album: AlbumAddMusicCount, setSelectAlbum: React.Dispatch<React.SetStateAction<AlbumAddMusicCount | undefined>> }) => {
    const { album, setSelectAlbum } = props;
    const sounds: MusicResource[] = useSelector((state: any) => state.sounder.sounds);
    const playingId: number = useSelector((state: any) => state.playingId.playingId);
    const dispatch = useDispatch();
    const { getMusics, musics } = useFetchMusics();
    useEffect(() => {
        getMusics("/musics/" + album.albumName);
        settingGet();
    }, []);
    useEffect(() => {
        createHowler();
    }, [musics]);
    function createHowler() {
        let newSounds: MusicResource[] = [];
        musics.forEach(music => {
            const filepath = 'static/musics/' + music.fileName;
            if (!sounds.find(el => el.filePath === filepath)) {
                newSounds.push({
                    id: music.id,
                    musicName: music.musicName,
                    group: music.group,
                    filePath: filepath,
                    music_photo: music.music_photo,
                    howl: new Howl({
                        src: filepath,
                        onend: () => {
                            afterPlayback();
                        }
                    })
                });
                return;
            }
            else {
                const index = sounds.findIndex((el) => el.filePath === filepath);
                newSounds.push({
                    id: music.id,
                    musicName: music.musicName,
                    group: music.group,
                    filePath: filepath,
                    music_photo: music.music_photo,
                    howl: sounds[index].howl,
                })
            }
        });
        dispatch(setSounds(newSounds));
    }
    const afterPlayback = () => {
        const storeState = store.getState();
        const storeSounds: MusicResource[] = storeState.sounder.sounds;
        let resource = storeSounds.find(el => el.filePath === storeState.currentSounder.currentSound.filePath);
        // ループ機能
        if (storeState.isLooper.isLoop) {
            dispatch(setCurrentSound(resource));
            dispatch(setPlayingId(Number(resource?.howl?.play(playingId))));
            return;
        }
        // TODO:自動連続再生 Index番号によって管理 ソートに対応できない場合修正をする事。
        const currentSoundIndex = storeSounds.findIndex(el => el.filePath === storeState.currentSounder.currentSound.filePath);
        const nextSound = storeSounds[currentSoundIndex + 1];
        if (!!nextSound) {
            dispatch(setCurrentSound(nextSound));
            dispatch(setPlayingId(Number(nextSound?.howl?.play())));
        }
    }
    function settingGet() {
        axios.get("/settings")
            .then((response) => {
                console.log(response.data);
                dispatch(setVolume(Number(response.data.volume)));
            });
        return;
    }

    return (
        <div>
            <Header></Header>
            <div style={{ height: '5vh' }}></div>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={11}>
                    <Button variant="contained" size='large' style={{ textTransform: "none" }} sx={{ mb: 3 }} onClick={() => { setSelectAlbum(undefined) }}><ArrowBackIcon />AlbumList</Button>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
            <MusicTable
                musics={musics}
                musicsGetUrl={"/musics/" + album.albumName}
            />
            <Footer></Footer>
        </div>
    )
}
