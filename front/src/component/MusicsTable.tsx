import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler, } from 'react-hook-form';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSound } from '../redux/currentSoundSlice';
import { setPlayingId } from '../redux/playingIdSlice';
// MUIComponents
import {
    Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Typography, Checkbox, Modal, TextField, Rating, MenuItem, Button,
} from '@mui/material';
// Components
import EditModal from './EditModal';
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
// hooks
import useFetchMusics from '../hooks/useFetchMusics';

type MusicTableProp = {
    musics: Music[];
    musicsGetUrl: string;
}

export default function MusicTable(props: MusicTableProp) {
    const { musics } = props;
    const { musicsGetUrl } = props;
    const [checkedNumbers, setCheckedNumbers] = useState<number[]>([]);
    const { getMusics } = useFetchMusics();

    const isDeleteButton = () => {
        if (checkedNumbers.length !== 0) return true;
        else return false;
    }
    function musicsDelete(ids: number[]) {
        console.log(ids);
        axios.delete("/musics/" + ids)
            .then((response) => {
                console.log(response.data);
                getMusics(musicsGetUrl);
            })
        setCheckedNumbers([]);
    }
    useEffect(() => {
        console.log('選択中のid:' + checkedNumbers.toString());
    }, [checkedNumbers]);
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
                                <Row music={music} setCheckedNumbers={setCheckedNumbers} checkedNumbers={checkedNumbers} musicsGetUrl={musicsGetUrl} />
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
    music: Music, setCheckedNumbers: React.Dispatch<React.SetStateAction<number[]>>, checkedNumbers: number[], musicsGetUrl: string,
}) => {
    const currentSound: MusicResource = useSelector((state: any) => state.currentSounder.currentSound);
    const [isDetail, setIsDetail] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const sounds: MusicResource[] = useSelector((state: any) => state.sounder.sounds);
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const check = event.target.checked;
        setIsChecked(check);
        console.log(check);
        if (check)
            props.setCheckedNumbers([...props.checkedNumbers, props.music.id]);
        else
            props.setCheckedNumbers(props.checkedNumbers.filter((value) => (value !== props.music.id)));
    };
    function PlaySound(music: Music) {
        let resource = sounds.find(el => el.filePath === 'static/musics/' + music.fileName);
        if (!!currentSound?.howl && currentSound?.howl?.playing() === true && currentSound?.filePath === resource?.filePath) {
            currentSound.howl.pause();
        }
        else if (!!currentSound?.howl && currentSound?.filePath !== resource?.filePath) {
            currentSound.howl.stop();
            dispatch(setPlayingId(Number(resource?.howl?.play())));
            if (!!resource) {
                dispatch(setCurrentSound(resource));
            }
        }
        else {
            if (currentSound?.howl === undefined && !!resource) {
                dispatch(setPlayingId(Number(resource?.howl?.play())));
                dispatch(setCurrentSound(resource));
            }
            if (!!currentSound?.howl) {
                currentSound.howl.play();
            }
        }
    }
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
                        onClick={() => PlaySound(props.music)}
                    >
                        {currentSound?.filePath === 'static/musics/' + props.music.fileName && currentSound?.howl?.playing() ?
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
                                            <ModalContent music={props.music} musicsGetUrl={props.musicsGetUrl} />
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

export const ModalContent = (props: { music: Music, musicsGetUrl: string }) => {
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
    const { getMusics } = useFetchMusics();

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
        getMusics(props.musicsGetUrl);
        await axios.get('/music/' + props.music.id)
            .then((response) => {
                let copyCurrentSound: MusicResource = {
                    howl: currentSound.howl,
                    id: currentSound.id,
                    musicName: response.data.musicName,
                    group: response.data.group,
                    filePath: currentSound.filePath,
                    music_photo: currentSound.music_photo,
                };
                dispatch(setCurrentSound(copyCurrentSound));
            });
        setIsProgress(false);
        setIsOpenModal(false);
        setIsSnackOpen(true);
    }

    const openButton = (
        <IconButton size="small" onClick={modalOpen}>
            <EditIcon style={{ color: 'white' }} />
        </IconButton>
    );
    const editTitle = <Typography id="modal-modal-title" variant="h6" component="h2">EditMusicDetails</Typography>
    const editContent = (
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
