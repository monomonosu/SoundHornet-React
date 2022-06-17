import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {
  Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, Typography, Checkbox, Card, CardContent, CardMedia,
  Slider,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
    current.howl.pause();
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
  setInterval(() => {
    let current = sounds.find(el => el.howl.playing(playingId) === true);
    if (!current) return;
    console.log(current.howl.seek());
  }, 300);
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
          <div style={{ height: "1000px" }}></div>
          <Link to="/table-sample">
            <Button>TableSample</Button>
          </Link>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>

      {/* フッター */}
      <Footer></Footer>

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

export const Footer = () => {
  // TODO:アルバムフォト・MusicName・GroupNameの繋ぎこみをする。
  // TODO:再生・次へ・前へ・音量・詳細・再生進捗機能を付ける。
  return (
    <div>
      <Card style={{ width: "100%", position: "fixed", height: "100px", bottom: "0", backgroundColor: '#161B22', }}>
        <CardContent style={{ paddingTop: '0' }}>
          <Box style={{ width: "100%", height: "30px", backgroundColor: '#161B22', }}>
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="off"
              style={{ padding: '0', }}
            />
          </Box>
          <Grid container>
            <Grid item xs>
              <div style={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 60, height: 60 }}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNIDOXlthHXz96_Q3_oREmfsZFs-seuKCMw&usqp=CAU"
                  alt="Live from space album cover"
                />
                <div style={{ marginLeft: '10px' }}>
                  <Typography variant="h6" component="div" style={{ color: "white" }}>
                    MusicNameHoge
                  </Typography>
                  <p style={{ color: "white", margin: '4px 0' }}>
                    GroupNameHoge
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div style={{ display: 'flex', justifyContent: "center" }}>
                <IconButton
                  aria-label="expand row"
                  size="large"
                  onClick={() => console.log('hoge')}
                >
                  <SkipPreviousIcon fontSize='large' style={{ color: 'white' }} />
                </IconButton>
                <IconButton
                  aria-label="expand row"
                  size="large"
                  onClick={() => console.log('hoge')}
                >
                  <PlayArrowIcon fontSize='large' style={{ color: 'white' }} />
                </IconButton>
                <IconButton
                  aria-label="expand row"
                  size="large"
                  onClick={() => console.log('hoge')}
                >
                  <SkipNextIcon fontSize='large' style={{ color: 'white' }} />
                </IconButton>
              </div>
            </Grid>
            <Grid item xs>
              <div style={{ display: 'flex', justifyContent: "right" }}>
                <IconButton
                  aria-label="expand row"
                  size="large"
                  onClick={() => console.log('hoge')}
                >
                  <VolumeUpIcon fontSize='large' style={{ color: 'white' }} />
                </IconButton>
                <IconButton
                  aria-label="expand row"
                  size="large"
                  onClick={() => console.log('hoge')}
                >
                  <MoreHorizIcon fontSize='large' style={{ color: 'white' }} />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div >
  )
}

export default App;
