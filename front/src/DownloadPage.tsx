import { Grid } from "@mui/material";
import Header from "./component/Header";

const DownloadPage = () => {
    return (
        <div>
            <Header></Header>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={11}>
                    <h1 style={{ color: "white" }}>Download</h1>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    )
}

export default DownloadPage;
