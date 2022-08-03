import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Header from './component/Header';
import {
    Box, Card, CardContent, CardMedia, IconButton, Typography, Grid, Button
} from '@mui/material'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

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
                    <Button variant="contained" size='large' style={{ textTransform: "none" }}>CreateAlbum</Button>
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