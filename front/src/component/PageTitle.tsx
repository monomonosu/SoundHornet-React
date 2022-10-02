import "../styles/main.scss";
// components
import { Grid } from "@mui/material";

export default function PageTitle(props: { title: string }) {
    return (
        <>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs><h1 className="-white">{props.title}</h1></Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </>
    )
}
