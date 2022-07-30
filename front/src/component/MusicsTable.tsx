import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler, } from 'react-hook-form';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setMusics } from '../redux/musicsSlice';
import { setCurrentSound } from '../redux/currentSoundSlice';
// MUIComponents
import {
    Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Typography, Checkbox, Modal, TextField, Rating, MenuItem, Button,
    Backdrop, CircularProgress, Snackbar, Alert,
} from '@mui/material';
// MUIIcons
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// types
import type { Music } from '../types/musics'
import type { Group } from '../types/groups'
import type { Album } from '../types/albums'
import type { Genre } from '../types/genres'
import type { MusicResource } from '../types/musicResource';

type MusicTableProp = {
    musics: Music[];
    checkedNumbers: number[];
    setCheckedNumbers: React.Dispatch<React.SetStateAction<number[]>>;
    PlaySound(music: Music): void
    isDeleteButton: () => boolean;
    musicsDelete(ids: number[]): void
}

export default function MusicTable(props: MusicTableProp) {
    const { musics, checkedNumbers } = props;
    const { setCheckedNumbers } = props
    const { PlaySound, isDeleteButton, musicsDelete } = props;
    return (
        <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item xs={11}>
                <TableContainer component={Paper} style={{ backgroundColor: "#161B22" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{ height: "73px" }}>
                            <TableRow>
                                <TableCell style={{ paddingLeft: "0", paddingRight: "0" }} />
                                <TableCell style={{ paddingLeft: "0", paddingRight: "0" }} align='center'>
                                    <IconButton style={{ color: "white" }} disabled={!isDeleteButton()} onClick={() => musicsDelete(checkedNumbers)}>
                                        {isDeleteButton() ? <DeleteIcon /> : ""}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{ paddingLeft: "0", paddingRight: "0" }} />
                                <TableCell style={{ color: "#FFFFFF" }}>MusicName</TableCell>
                                <TableCell style={{ color: "#FFFFFF" }}>Group</TableCell>
                                <TableCell style={{ color: "#FFFFFF" }}>Album</TableCell>
                                <TableCell style={{ color: "#FFFFFF" }}>Genre</TableCell>
                                <TableCell style={{ color: "#FFFFFF" }} align="right">FileSize</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {musics.map((music) => (
                                <Row music={music} setCheckedNumbers={setCheckedNumbers} checkedNumbers={checkedNumbers} PlaySound={PlaySound} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs>
            </Grid>
        </Grid>
    )
}

// テーブルRow
export const Row = (props: {
    music: Music, setCheckedNumbers: React.Dispatch<React.SetStateAction<number[]>>, checkedNumbers: number[],
    PlaySound(music: Music): void
}) => {
    const currentSound: MusicResource = useSelector((state: any) => state.currentSounder.currentSound);
    const [isDetail, setIsDetail] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const check = event.target.checked;
        setIsChecked(check);
        console.log(check);
        if (check)
            props.setCheckedNumbers([...props.checkedNumbers, props.music.id]);
        else
            props.setCheckedNumbers(props.checkedNumbers.filter((value) => (value !== props.music.id)));
    };
    return (
        <React.Fragment>
            <TableRow
                key={props.music.musicName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell style={{ paddingLeft: "0", paddingRight: "0" }} align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setIsDetail(!isDetail)}
                    >
                        {isDetail ? <KeyboardArrowUpIcon style={{ color: 'white' }} /> : <KeyboardArrowDownIcon style={{ color: 'white' }} />}
                    </IconButton>
                </TableCell>
                <TableCell style={{ paddingLeft: "0", paddingRight: "0" }} align='center'>
                    <Checkbox size="small" style={{ color: "white" }} checked={isChecked} onChange={handleChange}></Checkbox>
                </TableCell>
                <TableCell style={{ paddingLeft: "0", paddingRight: "0" }} align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => props.PlaySound(props.music)}
                    >
                        {currentSound.filePath === 'static/musics/' + props.music.fileName && currentSound.howl?.playing() === true ?
                            <PauseIcon style={{ color: 'white' }} /> : <PlayArrowIcon style={{ color: 'white' }} />}
                    </IconButton>
                </TableCell>
                <TableCell style={{ color: "#FFFFFF" }} component="th" scope="row">
                    {props.music.musicName}
                </TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>{props.music.group}</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>{props.music.album}</TableCell>
                <TableCell style={{ color: "#FFFFFF" }}>{props.music.genre}</TableCell>
                <TableCell style={{ color: "#FFFFFF" }} align="right">{props.music.fileSize}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={isDetail} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" style={{ color: "white" }}>
                                Detail
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: "white" }}>Evaluation</TableCell>
                                        <TableCell style={{ color: "white" }}>Comment</TableCell>
                                        <TableCell style={{ color: "white" }}>FileType</TableCell>
                                        <TableCell style={{ color: "white" }}>FileName</TableCell>
                                        <TableCell style={{ color: "white" }}>Created</TableCell>
                                        <TableCell style={{ color: "white" }}>Updated</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row" style={{ color: "white" }}>{props.music.evaluation}</TableCell>
                                        <TableCell style={{ color: "white" }}>{props.music.comment}</TableCell>
                                        <TableCell style={{ color: "white" }}>{props.music.fileType}</TableCell>
                                        <TableCell style={{ color: "white" }}>{props.music.fileName}</TableCell>
                                        <TableCell style={{ color: "white" }}>{props.music.createdAt.toString()}</TableCell>
                                        <TableCell style={{ color: "white" }}>{props.music.updatedAt.toString()}</TableCell>
                                        <TableCell>
                                            <EditModal music={props.music} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export const EditModal = (props: { music: Music }) => {
    const dispatch = useDispatch();
    const currentSound: MusicResource = useSelector((state: any) => state.currentSounder.currentSound);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isProgress, setIsProgress] = useState(false);
    const [isSnackOpen, setIsSnackOpen] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [rating, setRating] = useState<number>();
    const modalOpen = () => setIsOpenModal(true);
    const modalClose = () => setIsOpenModal(false);
    const { register, handleSubmit } = useForm<Music>();

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

    useEffect(() => {
        axios.get("/groups")
            .then((response) => {
                console.log(response);
                setGroups(response.data);
            });
        axios.get("/albums")
            .then((response) => {
                console.log(response);
                setAlbums(response.data);
            });
        axios.get("/genres")
            .then((response) => {
                console.log(response);
                setGenres(response.data);
            });
    }, [])

    function onChangeHandle(newValue: number) {
        document.getElementById('evaluation')?.focus(); //フォーカスが当たらないと更新されない為
        if (!!newValue) {
            console.log(newValue);
            setRating(newValue);
        }
    }
    const onSubmit: SubmitHandler<Music> = async (data) => {
        setIsProgress(true);
        await axios.put('/music/' + props.music.id, data)
            .then((response) => {
                console.log(response);
            })
        // Musics更新
        await axios.get('/musics')
            .then((response) => {
                dispatch(setMusics(response.data));
            })
        await axios.get('/music/' + props.music.id)
            .then((response) => {
                let copyCurrentSound = currentSound;
                copyCurrentSound.musicName = response.data.musicName;
                copyCurrentSound.group = response.data.group;
                dispatch(setCurrentSound(copyCurrentSound));
            });
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
            <IconButton
                size="small"
                onClick={modalOpen}
            >
                <EditIcon style={{ color: 'white' }} />
            </IconButton>
            <Modal
                open={isOpenModal}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        EditMusicDetails
                    </Typography>
                    <Typography id="modal-modal-description" sx={{
                        mt: 2, '& .MuiTextField-root': { m: 1 },
                    }}>
                        <TextField style={{ width: '15ch' }} label="id" disabled type="value" defaultValue={props.music.id} variant="standard" />
                        <div>
                            <TextField style={{ width: '25ch' }} label="musicName" type="text" defaultValue={props.music.musicName} {...register('musicName')} variant="standard" />
                            <TextField style={{ width: '25ch' }} select label="group" id="edit-group" type="text" defaultValue={props.music.group} {...register("group")} variant="standard">
                                <MenuItem value=''>None</MenuItem>
                                {groups?.map((group) => (
                                    <MenuItem key={group.groupName} value={group.groupName}>
                                        {group.groupName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField style={{ width: '25ch' }} select label="album" id="edit-album" type="text" defaultValue={props.music.album} {...register('album')} variant="standard">
                                <MenuItem value=''>None</MenuItem>
                                {albums?.map((album) => (
                                    <MenuItem key={album.albumName} value={album.albumName}>
                                        {album.albumName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField style={{ width: '25ch' }} select label="genre" id="edit-genre" type="text" defaultValue={props.music.genre} {...register('genre')} variant="standard">
                                <MenuItem value=''>None</MenuItem>
                                {genres?.map((genre) => (
                                    <MenuItem key={genre.genreName} value={genre.genreName}>
                                        {genre.genreName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField style={{ width: '52ch' }} label="comment" type="text" defaultValue={props.music.comment} {...register('comment')} variant="standard" />
                        </div>
                        <div>
                            <TextField style={{ width: '25ch' }} label="FileType" disabled defaultValue={props.music.fileType} variant="standard" />
                            <TextField style={{ width: '25ch' }} label="FileSize" disabled defaultValue={props.music.fileSize} variant="standard" />
                            <TextField style={{ width: '25ch' }} label="FileName" disabled defaultValue={props.music.fileName} variant="standard" />
                            <TextField style={{ width: '25ch' }} label="PhotoFileName" disabled defaultValue={props.music.music_photo.fileName} variant="standard" />
                        </div>
                        <Typography sx={{ mt: 2 }} component="legend">evaluation</Typography>
                        <div>
                            <Rating sx={{ mt: 2 }} name="evaluation" defaultValue={props.music.evaluation ? props.music.evaluation : 3} value={rating} onChange={(event, newValue) => {
                                if (!!newValue)
                                    onChangeHandle(newValue);
                            }} />
                            <TextField
                                style={{ width: '6ch' }}
                                id='evaluation'
                                type="number"
                                defaultValue={props.music.evaluation}
                                value={rating}
                                size='small'
                                {...register('evaluation')}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
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
