import { useState } from "react";
import { Grid } from "@mui/material";
import Header from "./component/Header";
import { Box, Button, TextField } from "@mui/material";

const DownloadPage = () => {
    const [url, setUrl] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(() => e.target.value)
    }
    return (
        <div>
            <Header></Header>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={11}>
                    <h1 style={{ color: "white" }}>Download</h1>
                    <h2 style={{ color: "white" }}>InputURL</h2>
                    <Box
                        component="form"
                        sx={{
                            m: 1,
                            width: 1500,
                            maxWidth: '100%',
                        }}
                        noValidate
                        autoComplete="off"
                        style={{ backgroundColor: "white" }}
                    >
                        <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined"
                            value={url}
                            onChange={handleChange}
                        />
                    </Box>
                    <Button onClick={() => alert(url)}>submit</Button>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    )
}

export default DownloadPage;
