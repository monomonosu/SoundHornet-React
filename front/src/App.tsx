import React, { memo, useContext, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import {
  Box, Grid, Typography, Card, CardContent, CardMedia, Slider, Popper, Paper
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
import { useRecoilState } from 'recoil';
import { soundsAtom } from './atoms/SoundsAtom';
import { volumeAtom } from './atoms/VolumeAtom';
import { playingIdAtom } from './atoms/PlayingIdAtom';
import { currentSeekAtom } from './atoms/CurrentSeekAtom';
// types
import type { Music } from './types/musics';
import type { Setting } from './types/Setting';

// 投げたcallbackを毎秒実行
export const useInterval = (callback: () => void) => {
  useEffect(() => {
    const id = setInterval(callback, 500);
    return () => clearInterval(id);
  }, [callback])
}

function App() {
  // ステート
  const [musics, setMusics] = useState<Music[]>([]);
  const [checkedNumbers, setCheckedNumbers] = useState<number[]>([]);
  const [sounds, setSounds] = useRecoilState(soundsAtom);
  const [volume, setVolume] = useRecoilState(volumeAtom);
  const [playingId, setPlayingId] = useRecoilState(playingIdAtom);
  const [currentSeek, setCurrentSeek] = useRecoilState(currentSeekAtom);
  useEffect(() => {
    musicsGet();
    settingGet();
  }, [])
  useEffect(() => {
    createHowler();
  }, [musics]);
  useEffect(() => {
    Howler.volume(volume ? volume * 0.01 : 0);
    console.log('howlerVolume:', Howler.volume());
  }, [volume]);
  useEffect(() => {
    console.log('選択中のid:' + checkedNumbers.toString());
  }, [checkedNumbers]);
  // 毎秒再生進捗を更新する。
  useInterval(() => {
    let current = sounds.find(el => el.howl.playing(playingId) === true);
    if (!current) return;
    setCurrentSeek(current.howl.seek());
  });
  const isDeleteButton = () => {
    if (checkedNumbers.length !== 0) return true;
    else return false;
  }
  function createHowler() {
    musics.forEach(music => {
      const filepath = 'static/musics/' + music.fileName;
      if (!sounds.find(el => el.filePath === filepath)) {
        setSounds((sounds) => [...sounds, {
          filePath: filepath,
          howl: new Howl({
            src: filepath,
          })
        }])
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
      setPlayingId(Number(resource?.howl.play()));
      console.log(current);
      console.log(resource);
    }
    else {
      setPlayingId(Number(resource?.howl.play()));
      console.log(resource);
    }
  }
  function ChangeSeek(seek: number | undefined) {
    let current = sounds.find(el => el.howl.playing(playingId) === true);
    if (current !== undefined) current.howl.seek(seek);
  }
  function musicsGet() {
    axios.get("/musics")
      .then((response) => {
        console.log(response.data);
        setMusics(response.data);
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
  function settingGet() {
    axios.get("/settings")
      .then((response) => {
        console.log(response.data);
        setVolume(Number(response.data.volume));
      });
    return;
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

      <div style={{ height: '150px' }}></div>

      {/* フッター */}
      <Footer ChangeSeek={ChangeSeek}></Footer>

    </div >
  );
}

export const Footer = (props: { ChangeSeek(seek: number | undefined): void }) => {
  // TODO:アルバムフォト・MusicName・GroupNameの繋ぎこみをする。
  // TODO:再生・次へ・前へ・音量・詳細を付ける。
  const Wrapper = styled.div<{ left: number | undefined }>`
    .MuiSlider-thumbColorPrimary{
      left:${props => (props.left ? props.left.toString() + '%' : '0%')} !important;
    }
  `

  const [timePer, setTimePer] = useState<number | undefined>();
  const [sounds, setSounds] = useRecoilState(soundsAtom);
  const [playingId, setPlayingId] = useRecoilState(playingIdAtom);
  const [currentSeek, setCurrentSeek] = useRecoilState(currentSeekAtom);
  useEffect(() => {
    setTimePer(timeToPerCalculation(currentSeek));
  }, [currentSeek]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    const val_str = newValue.toString();
    const val: number = Number(val_str);
    setTimePer(val);
    props.ChangeSeek(perToTimeCalculation(val));
  };
  const timeToPerCalculation = (seek: number) => {
    let current = sounds.find(el => el.howl.playing(playingId) === true);
    if (current !== undefined) {
      return seek / current?.howl.duration() * 100;
    }
    return 0;
  };
  const perToTimeCalculation = (per: number) => {
    let current = sounds.find(el => el.howl.playing(playingId) === true);
    if (current !== undefined) {
      return current.howl.duration() / 100 * per;
    }
    return 0;
  };
  return (
    <div>
      <Card style={{ width: "100%", position: "fixed", height: "100px", bottom: "0", backgroundColor: '#161B22', }}>
        <CardContent style={{ paddingTop: '0' }}>
          <Box style={{ width: "100%", height: "30px", backgroundColor: '#161B22', }}>
            <Wrapper left={timePer}>
              <Slider
                size="small"
                onChange={handleChange}
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
                <VolumeButton />
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

export const VolumeButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [isOpenPopper, setIsOpenPopper] = useState<boolean>(false);
  const [volume, setVolume] = useRecoilState(volumeAtom);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (!!isOpenPopper)
      await volumeUpdate({ 'volume': volume });
    setIsOpenPopper(!isOpenPopper);
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    const val: number = Number(newValue);
    setVolume(val);
    const valFloat: number = val * 0.01;
    Howler.volume(valFloat);
  };
  async function volumeUpdate(item: { volume: number | undefined }) {
    axios.put("/volume", item)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <IconButton
        aria-label="expand row"
        size="large"
        onClick={handleClick}
      >
        <VolumeUpIcon fontSize='large' style={{ color: 'white' }} />
      </IconButton>
      <Popper
        open={isOpenPopper}
        anchorEl={anchorEl}
      >
        <Paper style={{ width: '30px', height: '20vh', textAlign: 'center', paddingTop: '3vh', paddingBottom: '3vh' }}>
          <Slider
            size="small"
            onChange={handleChange}
            value={volume}
            max={100}
            min={0}
            orientation="vertical"
            aria-label="Small"
            valueLabelDisplay="off"
          />
        </Paper>
      </Popper>
    </div>
  );
};

export default App;
