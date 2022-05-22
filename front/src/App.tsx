import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import BackupIcon from '@mui/icons-material/Backup';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import axios from "axios"
import { Howl, Howler } from 'howler';


type Music = {
  id: number;
  musicName: string;
  artist: string;
  album: string;
  genre: string;
  fileSize: string;
}

function App() {
  function PlaySound(music: Music) {
    const filepath = 'static/musics/' + music.musicName + '.mp3';
    console.log(music);
    console.log(filepath);
    const sound: Howl = new Howl({
      src: [filepath],
    });
    sound.play();
  }
  const [musics, setMusics] = useState<Music[]>([]);
  useEffect(() => {
    axios.get("http://localhost:8080/test")
      .then((response) => {
        console.log(response.data);
        setMusics(response.data);
      });
  }, []);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "#0A0A0A" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              SoundHornet
            </Typography>
            <Link to="/download">
              <Button>
                <YouTubeIcon fontSize="large" />
              </Button>
            </Link>
            <Link to="/import">
              <Button>
                <BackupIcon fontSize="large" />
              </Button>
            </Link>
            <Button>
              <SettingsIcon fontSize="large" />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container>
        <Grid item xs>
        </Grid>
        <Grid item xs={11}>
          <Box>
            <p>ここにジャケ画</p>
          </Box>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs>
        </Grid>
        <Grid item xs={11}>
          <TableContainer component={Paper} style={{ backgroundColor: "#0E0E0E" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#FFFFFF" }}>MusicName</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Artist</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Album</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Genre</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }} align="right">FileSize</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {musics.map((music) => (
                  <TableRow
                    key={music.musicName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => PlaySound(music)}
                  >
                    <TableCell style={{ color: "#FFFFFF" }} component="th" scope="row">
                      {music.musicName}
                    </TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>{music.artist}</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>{music.album}</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>{music.genre}</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }} align="right">{music.fileSize}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
