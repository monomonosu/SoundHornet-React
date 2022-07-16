import { useEffect, useState } from 'react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Typography, Checkbox, Modal, TextField, Rating, MenuItem, Button
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// types
import type { Music } from '../types/musics'
import { useRecoilState } from 'recoil';
import { currentSoundAtom } from '../atoms/CurrentSoundAtom';
import axios from 'axios';

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
    const [currentSound, setCurrentSound] = useRecoilState(currentSoundAtom);
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

interface Group {
    id: number,
    groupName: string,
}

export const EditModal = (props: { music: Music }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const modalOpen = () => setIsOpenModal(true);
    const modalClose = () => setIsOpenModal(false);

    const { register, handleSubmit } = useForm<Music>()

    const onSubmit: SubmitHandler<Music> = (data) => {
        // バリデーションチェックOK！なときに行う処理を追加
        console.log(data)
    }

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
    }, [])

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
                        <TextField style={{ width: '25ch' }} label="musicName" type="text" {...register('musicName')} variant="standard" />
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Select"
                            // value={group}
                            // onChange={handleChange}
                            helperText="Please select your currency"
                            variant="standard"
                        >
                            {groups?.map((group) => (
                                <MenuItem key={group.groupName} value={group.groupName}>
                                    {group.groupName}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{ width: '25ch' }} label="album" id="edit-album" defaultValue={props.music.album} variant="standard" />
                        <TextField style={{ width: '25ch' }} label="genre" id="edit-genre" defaultValue={props.music.genre} variant="standard" />
                        <TextField style={{ width: '52ch' }} label="comment" id="edit-comment" defaultValue={props.music.comment} variant="standard" />
                        <TextField style={{ width: '25ch' }} label="music_photo_fileName" id="edit-music-photo-filename" defaultValue={props.music.music_photo.fileName} variant="standard" />
                        <Typography component="legend">evaluation</Typography>
                        <Rating name="evaluation" defaultValue={props.music.evaluation} />
                        <div>
                            <Button
                                sx={{ mt: 2 }}
                                color="primary"
                                variant="contained"
                                size="large"
                                onClick={handleSubmit(onSubmit)}
                            >submit
                            </Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
