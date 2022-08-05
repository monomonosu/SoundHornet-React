import * as React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
// component
import Header from './component/Header';
import EditModal from './component/EditModal';
import {
    Typography, Grid, Button, TextField,
} from '@mui/material'
// types
import { Album } from './types/albums';

export default function AlbumPage() {
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
                <Grid item xs><h2 style={{ color: "white" }}>AlbumList</h2></Grid>
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
