import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
// component
import Header from './component/Header';
import EditModal from './component/EditModal';
import {
    Typography, Grid, Button, TextField, Card, CardActionArea, CardMedia, CardContent,
} from '@mui/material'
// types
import { Album } from './types/albums';
import { AlbumAddMusicCount } from './types/albumsAddMusicCount';

export default function AlbumPage() {
    const [albums, setAlbums] = useState<AlbumAddMusicCount[]>([]);
    useEffect(() => {
        albumsGet();
    }, [])
    function albumsGet() {
        axios.get("/albums-attached-music-count")
            .then((response) => {
                console.log(response.data);
                setAlbums(response.data);
            });
    }
    return (
        <div>
            <Header></Header>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs><h1 style={{ color: "white" }}>Album</h1></Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Grid item xs={1}></Grid>
                <Grid>
                    <ModalContent />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs>
                    <div>
                        <h2 style={{ color: "white" }}>AlbumList</h2>
                    </div>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 3, md: 4 }}>
                        {albums.map((album: AlbumAddMusicCount, index) => (
                            <Grid item xs={1} sm={1} md={1} key={index}>
                                <AlbumMedia album={(album)} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div >
    );
}

export const ModalContent: React.FC = () => {
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
            })
        setIsProgress(false);
        setIsOpenModal(false);
        setIsSnackOpen(true);
    }

    function onChangeHandle(newValue: number) { }

    const openButton = <Button variant="contained" size='large' style={{ textTransform: "none" }} onClick={modalOpen}>CreateAlbum</Button>;
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

export const AlbumMedia = (props: { album: AlbumAddMusicCount }) => {
    const { album } = props;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.album.album_photo.path ? props.album.album_photo.path : 'static/resource/no_image_white.png'}
                    alt="album-photo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" height={25}>
                        {props.album.albumName ? props.album.albumName : 'Unknown'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.album.musicsCount} sounds
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
