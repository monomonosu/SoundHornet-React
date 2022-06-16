import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {
  Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, Typography, Checkbox
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import Header from './component/Header';
import axios from "axios"
import { Howl, Howler } from 'howler';


type Music = {
  id: number;
  musicName: string;
  group: string;
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

interface MusicResource {
  howl: Howl,
  filePath: string,
}

let sounds: MusicResource[] = [];
let playingId: number | undefined;

// メソッド
function PlaySound(music: Music) {
  let current = sounds.find(el => el.howl.playing(playingId) === true);
  let resource = sounds.find(el => el.filePath === 'static/musics/' + music.fileName)
  if (current !== undefined && current?.filePath === resource?.filePath) {
    current.howl.stop();
    console.log(current);
  }
  else if (current !== undefined && current?.filePath !== resource?.filePath) {
    current.howl.stop();
    playingId = resource?.howl.play();
    console.log(current);
    console.log(resource);
  }
  else {
    const id = resource?.howl.play();
    playingId = id;
    console.log(resource);
  }
}

function App() {
  // ステート
  const [musics, setMusics] = useState<Music[]>([]);
  const [checkedNumbers, setCheckedNumbers] = useState<number[]>([]);
  useEffect(() => {
    musicsGet();
  }, [])
  useEffect(() => {
    createHowler();
  }, [musics]);
  useEffect(() => {
    console.log('選択中のid:' + checkedNumbers.toString());
  }, [checkedNumbers]);
  const isDeleteButton = () => {
    if (checkedNumbers.length !== 0) return true;
    else return false;
  }
  function createHowler() {
    musics.forEach(music => {
      const filepath = 'static/musics/' + music.fileName;
      if (!sounds.find(el => el.filePath === filepath)) {
        sounds.push({
          filePath: filepath,
          howl: new Howl({
            src: filepath,
            volume: 0.05,
          })
        });
      }
    });
    console.log(sounds);
  }
  function musicsGet() {
    axios.get("/musics")
      .then((response) => {
        console.log(response.data);
        setMusics(response.data)
      });
  }
  function musicsDelete(ids: number[]) {
    console.log(ids);
    axios.delete("/musics/" + ids)
      .then((response) => {
        console.log(response.data);
        setMusics(response.data);
      })
    setCheckedNumbers([]);
  }

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
              <TableHead style={{ height: "73px" }}>
                <TableRow>
                  <TableCell />
                  <TableCell align='center'>
                    <IconButton style={{ color: "white" }} disabled={!isDeleteButton()} onClick={() => musicsDelete(checkedNumbers)}>
                      {isDeleteButton() ? <DeleteIcon /> : ""}
                    </IconButton>
                  </TableCell>
                  <TableCell />
                  <TableCell style={{ color: "#FFFFFF" }}>MusicName</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Group</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Album</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Genre</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }} align="right">FileSize</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {musics.map((music) => (
                  <Row music={music} setCheckedNumbers={setCheckedNumbers} checkedNumbers={checkedNumbers} />
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
export const Row = (props: { music: Music, setCheckedNumbers: React.Dispatch<React.SetStateAction<number[]>>, checkedNumbers: number[] }) => {
  const [isDetail, setIsDetail] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const check = event.target.checked;
    setIsChecked(check);
    console.log(check);
    if (check)
      props.setCheckedNumbers([...props.checkedNumbers, props.music.id]);
    else
      props.setCheckedNumbers(props.checkedNumbers.filter((value) => (value !== props.music.id)));
  }
  return (
    <React.Fragment>
      <TableRow
        key={props.music.musicName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
        <TableCell align='center'>
          <Checkbox size="small" style={{ color: "white" }} checked={isChecked} onChange={handleChange}></Checkbox>
        </TableCell>
        <TableCell align='center'>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => PlaySound(props.music)}
          >
            <PlayArrowIcon style={{ color: 'white' }} />
          </IconButton>
        </TableCell>
        <TableCell style={{ color: "#FFFFFF" }} component="th" scope="row">
          {props.music.musicName}
        </TableCell>
        <TableCell style={{ color: "#FFFFFF" }}>{props.music.group}</TableCell>
        <TableCell style={{ color: "#FFFFFF" }}>{props.music.album}</TableCell>
        <TableCell style={{ color: "#FFFFFF" }}>{props.music.genre}</TableCell>
        <TableCell style={{ color: "#FFFFFF" }} align="right">{props.music.fileSize}</TableCell>
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
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" style={{ color: "white" }}>{props.music.evaluation}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.music.comment}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.music.fileType}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.music.fileName}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.music.createdAt.toString()}</TableCell>
                    <TableCell style={{ color: "white" }}>{props.music.updatedAt.toString()}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => console.log('hoge')}
                      >
                        <EditIcon style={{ color: 'white' }} />
                      </IconButton>
                    </TableCell>
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
