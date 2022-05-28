import { Grid } from "@mui/material";
import Header from "./component/Header";

const SettingPage = () => {
    return (
        <div>
            <Header></Header>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={11}>
                    <h1 style={{ color: "white" }}>Setting</h1>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    )
}

export default SettingPage;