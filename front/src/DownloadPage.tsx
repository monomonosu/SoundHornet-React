import { useState } from "react";
import Header from "./component/Header";
import { Box, Button, TextField, Grid, createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";

const DownloadPage = () => {
    const [url, setUrl] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(() => e.target.value)
    }
    // テーマ変更
    const theme = createTheme({
        palette: {
            secondary: {
                main: grey[50]
            }
        }
    });
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
                            width: 1500,
                            maxWidth: '100%',
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <ThemeProvider theme={theme}>
                            <TextField fullWidth id="youTubeUrl" label="YouTubeURL" variant="outlined" color="secondary"
                                value={url}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: '#FFFFFF',    // 入力文字の色
                                    },
                                    '& label': {
                                        color: '#FFFFFF', // 通常時のラベル色
                                        '&:focusVisible': { color: '#FFFFFF' }
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#DDDDDD',    // 通常時のボーダー色(アウトライン)
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FFFFFF',    // ホバー時のボーダー色(アウトライン)
                                        },
                                    },
                                }}
                            />
                        </ThemeProvider>
                    </Box>
                    <Button onClick={() => alert(url)}>submit</Button>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    )
}

export default DownloadPage;
