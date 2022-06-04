import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {
  Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, Typography, Checkbox
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
  evaluation: number;
  comment: string;
  time: string;
  fileType: string;
  fileSize: string;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
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
  // const [checkedNumbers, setCheckedNumbers] = useState([]);
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
  const [isChecked, setIsChecked] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    setIsChecked(event.target.checked);
  }
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
        <TableCell>
          <Checkbox style={{ color: "white" }} checked={isChecked} onChange={handleChange}></Checkbox>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isDetail} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" style={{ color: "white" }}>
                Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Evaluation</TableCell>
                    <TableCell style={{ color: "white" }}>Comment</TableCell>
                    <TableCell style={{ color: "white" }}>FileType</TableCell>
                    <TableCell style={{ color: "white" }}>FileName</TableCell>
                    <TableCell style={{ color: "white" }}>Created</TableCell>
                    <TableCell style={{ color: "white" }}>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" style={{ color: "white" }}>{props.evaluation}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.comment}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.fileType}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.fileName}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.createdAt.toString()}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.updatedAt.toString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default App;
