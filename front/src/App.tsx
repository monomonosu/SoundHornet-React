import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {
  Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
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

// メソッド
function PlaySound(music: Music) {
  const filepath = 'static/musics/' + music.fileName;
  console.log(music);
  const sound: Howl = new Howl({
    src: [filepath],
  });
  sound.play();
}

function App() {
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
                  <TableCell />
                  <TableCell style={{ color: "#FFFFFF" }}>MusicName</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Artist</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Album</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Genre</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }} align="right">FileSize</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {musics.map((music) => (
                  <Row {...music} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>

      {/* コンポーネントサンプル */}
      <Grid container>
        <Grid item xs>
        </Grid>
        <Grid item xs={11}>
          <div style={{ height: "300px" }}></div>
          <Link to="/table-sample">
            <Button>TableSample</Button>
          </Link>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>

    </div >
  );
}

// テーブルRow
export const Row = (props: Music) => {
  const [isDetail, setIsDetail] = useState(false);
  return (
    <React.Fragment>
      <TableRow
        key={props.musicName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={() => PlaySound(props)}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setIsDetail(!isDetail)}
          >
            {isDetail ? <KeyboardArrowUpIcon style={{ color: 'white' }} /> : <KeyboardArrowDownIcon style={{ color: 'white' }} />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: "#FFFFFF" }} component="th" scope="row">
          {props.musicName}
        </TableCell>
        <TableCell style={{ color: "#FFFFFF" }}>{props.artist}</TableCell>
        <TableCell style={{ color: "#FFFFFF" }}>{props.album}</TableCell>
        <TableCell style={{ color: "#FFFFFF" }}>{props.genre}</TableCell>
        <TableCell style={{ color: "#FFFFFF" }} align="right">{props.fileSize}</TableCell>
      </TableRow>
      <TableRow>
        <Collapse in={isDetail} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Detail
            </Typography>
          </Box>
        </Collapse>
      </TableRow>
    </React.Fragment>
  )
}

export default App;
