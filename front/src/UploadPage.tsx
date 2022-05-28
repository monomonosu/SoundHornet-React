import { Grid } from "@mui/material";
import Header from "./component/Header";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const UploadPage = () => {
    // 転送前
    const getUploadParams = (meta: any) => { return { url: 'http://localhost:8080/upload-test' } }

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
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleSubmit}
                        accept="image/*,audio/*,video/*"
                    />
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </div>
    )
}

export default UploadPage;

//   <MyUploader />

// const style = {
//     width: 'auto',
//     height: 150,
//     border: "1px dotted #888"
// };
// export default function UploadPage() {
//     return (
//         <div>
//             <Header></Header>
//             <input type="file" name="file" />
//             <Grid container>
//                 <Grid item xs>
//                 </Grid>
//                 <Grid item xs>
//                 </Grid>
//                 <Grid item xs>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }