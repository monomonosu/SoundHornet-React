import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {
  Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import Header from './component/Header';
import axios from "axios"
import { Howl, Howler } from 'howler';


type Music = {
  id: number;
  musicName: string;
  artist: string;
  album: string;
  genre: string;
  fileSize: string;
  fileName: string;
}

function App() {
  // メソッド
  function PlaySound(music: Music) {
    const filepath = 'static/musics/' + music.fileName;
    console.log(music);
    const sound: Howl = new Howl({
      src: [filepath],
    });
    sound.play();
  }
  // ステート
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

      <Header></Header>

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
          <TableContainer component={Paper} style={{ backgroundColor: "#161B22" }}>
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

    </div >
  );
}

export default App;
