import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
// component
import Header from './component/Header';
import {
    Box, Card, CardContent, CardMedia, IconButton, Typography, Grid, Button, Modal, TextField, MenuItem, Backdrop, Snackbar, Alert, CircularProgress
} from '@mui/material'
// icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// types
import { Album } from './types/albums';
// redux
import { useDispatch } from 'react-redux';

export default function AlbumPage() {
    const theme = useTheme();
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
                    <CreateModal />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs><h2 style={{ color: "white" }}>Many views</h2></Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs>
                    <Card sx={{ display: 'flex', maxWidth: '365px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Live From Space
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Mac Miller
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <IconButton aria-label="previous">
                                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                </IconButton>
                                <IconButton aria-label="play/pause">
                                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                </IconButton>
                                <IconButton aria-label="next">
                                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                </IconButton>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNIDOXlthHXz96_Q3_oREmfsZFs-seuKCMw&usqp=CAU"
                            alt="Live from space album cover"
                        />
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card sx={{ display: 'flex', maxWidth: '365px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Live From Space
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Mac Miller
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <IconButton aria-label="previous">
                                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                </IconButton>
                                <IconButton aria-label="play/pause">
                                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                </IconButton>
                                <IconButton aria-label="next">
                                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                </IconButton>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNIDOXlthHXz96_Q3_oREmfsZFs-seuKCMw&usqp=CAU"
                            alt="Live from space album cover"
                        />
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card sx={{ display: 'flex', maxWidth: '365px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Live From Space
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Mac Miller
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <IconButton aria-label="previous">
                                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                </IconButton>
                                <IconButton aria-label="play/pause">
                                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                </IconButton>
                                <IconButton aria-label="next">
                                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                </IconButton>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNIDOXlthHXz96_Q3_oREmfsZFs-seuKCMw&usqp=CAU"
                            alt="Live from space album cover"
                        />
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs><h2 style={{ color: "white" }}>AlbumList</h2></Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div >
    );
}

export const CreateModal = () => {
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isProgress, setIsProgress] = useState(false);
    const [isSnackOpen, setIsSnackOpen] = useState(false);
    const [albums, setAlbums] = useState<Album[]>([]);
    const modalOpen = () => setIsOpenModal(true);
    const modalClose = () => setIsOpenModal(false);
    const { register, handleSubmit } = useForm<Album>();

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const onSubmit: SubmitHandler<Album> = async (data) => {
        setIsProgress(true);
        await axios.put('/music/', data)
            .then((response) => {
                console.log(response);
            })
        setIsProgress(false);
        setIsOpenModal(false);
        setIsSnackOpen(true);
    }

    const snackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackOpen(false);
    };

    return (
        <div>
            <Button variant="contained" size='large' style={{ textTransform: "none" }} onClick={modalOpen}>CreateAlbum</Button>
            <Modal
                open={isOpenModal}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        CreateAlbum
                    </Typography>
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
                </Box>
            </Modal>
            <Backdrop
                sx={{ color: '#fff', zIndex: 1301 }}
                open={isProgress}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={isSnackOpen} autoHideDuration={2000} onClose={snackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={snackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Save successfully!
                </Alert>
            </Snackbar>
        </div>
    );
}