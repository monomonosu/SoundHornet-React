import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import {
  Box, Grid, Typography, Card, CardContent, CardMedia, Slider,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Header from './component/Header';
import MusicTable from './component/MusicsTable';
import axios from "axios"
import { Howl, Howler } from 'howler';
// types
import type { Music } from './types/musics'

interface MusicResource {
  howl: Howl,
  filePath: string,
}

let currentSeek: number = 0;

function App() {
  // ステート
  const [musics, setMusics] = useState<Music[]>([]);
  const [checkedNumbers, setCheckedNumbers] = useState<number[]>([]);
  let sounds: MusicResource[] = [];
  let playingId: number | undefined;
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
    currentSeek = current.howl.seek();
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

      <div style={{ height: '5vh' }}></div>

      {/* テーブル */}
      <MusicTable
        musics={musics}
        checkedNumbers={checkedNumbers}
        setCheckedNumbers={setCheckedNumbers}
        PlaySound={PlaySound}
        isDeleteButton={isDeleteButton}
        musicsDelete={musicsDelete}></MusicTable>

      {/* フッター */}
      <Footer></Footer>

    </div >
  );
}

export const Footer = () => {
  // TODO:アルバムフォト・MusicName・GroupNameの繋ぎこみをする。
  // TODO:再生・次へ・前へ・音量・詳細・再生進捗機能を付ける。
  const Wrapper = styled.div`
    .MuiSlider-thumbColorPrimary{
      left:40%
    }
  `
  const [time, setTime] = useState<number | number[] | undefined>();
  setInterval(() => {
    setTime(currentSeek);
  }, 300);
  useEffect(() => {
    console.log(time);
  }, [time]);
  return (
    <div>
      <Card style={{ width: "100%", position: "fixed", height: "100px", bottom: "0", backgroundColor: '#161B22', }}>
        <CardContent style={{ paddingTop: '0' }}>
          <Box style={{ width: "100%", height: "30px", backgroundColor: '#161B22', }}>
            <Wrapper>
              <Slider
                size="small"
                defaultValue={0}
                value={time}
                max={100}
                min={0}
                aria-label="Small"
                valueLabelDisplay="off"
                style={{ padding: '0', }}
              />
            </Wrapper>
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
