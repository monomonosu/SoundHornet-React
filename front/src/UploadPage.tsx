import { Grid } from "@mui/material";
import Header from "./component/Header";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const UploadPage = () => {
    // 転送前
    const getUploadParams = ({ meta, file }: any) => {
        console.log(meta);
        const body = new FormData();
        body.append('file', file);
        // 再生時間整形
        const min = Math.floor(meta.duration / 60);
        const sec = Math.floor(meta.duration % 60);
        const secPadding: string = ('00' + sec).slice(-2);
        body.append('duration', String(min + ':' + secPadding));
        // 拡張子識別
        const fileName = file.name;
        const position = fileName.lastIndexOf('.');
        const extension = fileName.slice(position + 1);
        body.append('type', extension);
        return { url: 'http://localhost:8080/upload-music', body }
    }

    // 転送後
    const handleChangeStatus = ({ meta, file, xhr }: any, status: any) => {
        console.log(status, meta, file)
        if (status === 'done') {
            console.log(JSON.parse(xhr.response));
        }
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files: any, allFiles: any) => {

    }

    return (
        <div>
            <Header></Header>
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item xs={11}>
                    <h1 style={{ color: "white" }}>Import</h1>
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleSubmit}
                        accept="audio/*"
                    />
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </div>
    )
}

export default UploadPage;
