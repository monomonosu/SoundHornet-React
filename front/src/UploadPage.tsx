import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Grid } from "@mui/material";
import Header from "./component/Header";
import axios from "axios";

const style = {
    width: 'auto',
    height: 150,
    border: "1px dotted #888"
};
export default function UploadPage() {
    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        console.log("onDrop:", acceptedFiles);
        axios.get("http://localhost:8080/test")
            .then((response) => {
                console.log(response.data);
            });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <div>
            <Header></Header>
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item xs>
                    <div {...getRootProps()} style={style}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p style={{ color: 'white' }}>Drop the files here ...</p>
                        ) : (
                            <p style={{ color: 'white' }}>Drag 'n' drop some files here, or click to select files</p>
                        )}
                    </div>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </div>
    );
}