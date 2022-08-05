import React from 'react';
import {
    Box, Modal, Backdrop, Snackbar, Alert, CircularProgress
} from '@mui/material'

type Props = {
    setIsSnackOpen: React.Dispatch<React.SetStateAction<boolean>>,
    modalClose: () => void,
    isOpenModal: boolean,
    isProgress: boolean,
    isSnackOpen: boolean,
    openButton: JSX.Element,
    editTitle: JSX.Element,
    editContent: JSX.Element,
}

const EditModal: React.FC<Props> = (props: Props) => {
    const {
        setIsSnackOpen,
        modalClose,
        isOpenModal,
        isProgress,
        isSnackOpen,
        openButton,
        editTitle,
        editContent,
    } = props;
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

    const snackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackOpen(false);
    };

    return (
        <div>
            {openButton}
            <Modal
                open={isOpenModal}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {editTitle}
                    {editContent}
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
    )
}

export default EditModal;
