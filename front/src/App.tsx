import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { Howl, Howler } from 'howler';
import axios from "axios"
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoop } from './redux/isLoopSlice';
import { setPlayingId } from './redux/playingIdSlice';
import { setVolume } from './redux/volumeSlice';
import { setMusics } from './redux/musicsSlice';
import { setCurrentSeek } from './redux/currentSeekSlice';
import { setSounds } from './redux/soundsSlice';
import { setCurrentSound } from './redux/currentSoundSlice';
// MUIComponents
import {
  Box, Grid, Typography, Card, CardContent, CardMedia, Slider, Popper, Paper, IconButton, Button,
} from '@mui/material';
// components
import Header from './component/Header';
import MusicTable from './component/MusicsTable';
// icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LoopIcon from '@mui/icons-material/Loop';
// types
import type { Music } from './types/musics';
import type { MusicResource } from './types/musicResource';

// 投げたcallbackを毎秒実行
export const useInterval = (callback: () => void) => {
  useEffect(() => {
    const id = setInterval(callback, 500);
    return () => clearInterval(id);
  }, [callback])
}

function App() {
  // ステート
  const [checkedNumbers, setCheckedNumbers] = useState<number[]>([]);
  const currentSound: MusicResource = useSelector((state: any) => state.currentSounder.currentSound);
  const isLoop: boolean = useSelector((state: any) => state.isLooper.isLoop);
  const volume: number = useSelector((state: any) => state.volume.volume);
  const musics: Music[] = useSelector((state: any) => state.musics.musics);
  const sounds: MusicResource[] = useSelector((state: any) => state.sounder.sounds);
  const playingId: number = useSelector((state: any) => state.playingId.playingId);
  const dispatch = useDispatch();
  const isLoopRef: { current: boolean } = useRef(false);
  let currentRef: { current: MusicResource } = useRef({ id: undefined, howl: undefined, musicName: undefined, filePath: undefined, music_photo: undefined, group: undefined });
  let soundsRef: { current: MusicResource[] } = useRef([]);

  useEffect(() => {
    musicsGet();
    settingGet();
  }, [])
  useEffect(() => {
    isLoopRef.current = isLoop;
    dispatch(setIsLoop(isLoopRef.current));
    console.log('isLoop:', isLoopRef.current);
  }, [isLoop]);
  useEffect(() => {
    currentRef.current = currentSound;
    soundsRef.current = sounds;
  }, [currentSound]);
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
    if (currentSound.howl === undefined) return;
    dispatch(setCurrentSeek(currentSound?.howl.seek()));
  });
  const isDeleteButton = () => {
    if (checkedNumbers.length !== 0) return true;
    else return false;
  }
  function createHowler() {
    let newSounds: MusicResource[] = [];
    musics.forEach(music => {
      const filepath = 'static/musics/' + music.fileName;
      if (!sounds.find(el => el.filePath === filepath)) {
        newSounds.push({
          id: music.id,
          musicName: music.musicName,
          group: music.group,
          filePath: filepath,
          music_photo: music.music_photo,
          howl: new Howl({
            src: filepath,
            onend: () => {
              afterPlayback();
            }
          })
        });
        return;
      }
      else {
        const index = sounds.findIndex((el) => el.filePath === filepath);
        newSounds.push({
          id: music.id,
          musicName: music.musicName,
          group: music.group,
          filePath: filepath,
          music_photo: music.music_photo,
          howl: sounds[index].howl,
        })
      }
    });
    dispatch(setSounds(newSounds));
  }
  function PlaySound(music: Music) {
    let resource = sounds.find(el => el.filePath === 'static/musics/' + music.fileName);
    if (!!currentSound.howl && currentSound.howl.playing() === true && currentSound.filePath === resource?.filePath) {
      currentSound.howl.pause();
    }
    else if (!!currentSound.howl && currentSound.filePath !== resource?.filePath) {
      currentSound.howl.stop();
      dispatch(setPlayingId(Number(resource?.howl?.play())));
      if (!!resource)
        dispatch(setCurrentSound(resource));
    }
    else {
      if (currentSound.howl === undefined && !!resource) {
        dispatch(setCurrentSound(resource));
        dispatch(setPlayingId(Number(resource?.howl?.play())));
      }
      if (!!currentSound.howl) {
        currentSound.howl.play();
      }
    }
  }
  const afterPlayback = () => {
    let resource = soundsRef.current.find(el => el.filePath === currentRef.current.filePath);
    // ループ機能
    if (isLoopRef.current) {
      dispatch(setCurrentSound(resource));
      dispatch(setPlayingId(Number(resource?.howl?.play(playingId))));
      return;
    }
    // TODO:自動連続再生 Index番号によって管理 ソートに対応できない場合修正をする事。
    const currentSoundIndex = soundsRef.current.findIndex(hu => hu.filePath === currentRef.current.filePath);
    const nextSound = soundsRef.current[currentSoundIndex + 1];
    if (!!nextSound) {
      dispatch(setCurrentSound(nextSound));
      dispatch(setPlayingId(Number(nextSound?.howl?.play())));
    }
  }
  function musicsGet() {
    axios.get("/musics")
      .then((response) => {
        console.log(response.data);
        dispatch(setMusics(response.data));
      });
  }
  function musicsDelete(ids: number[]) {
    console.log(ids);
    axios.delete("/musics/" + ids)
      .then((response) => {
        console.log(response.data);
        dispatch(setMusics(response.data));
      })
    setCheckedNumbers([]);
  }
  function settingGet() {
    axios.get("/settings")
      .then((response) => {
        console.log(response.data);
        dispatch(setVolume(Number(response.data.volume)));
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
      <Footer></Footer>

    </div >
  );
}

export const Footer = () => {
  const Wrapper = styled.div<{ left: number | undefined }>`
    .MuiSlider-thumbColorPrimary{
      left:${props => (props.left ? props.left.toString() + '%' : '0%')} !important;
    }
  `

  const [timePer, setTimePer] = useState<number | undefined>();
  const sounds: MusicResource[] = useSelector((state: any) => state.sounder.sounds);
  const currentSound: MusicResource = useSelector((state: any) => state.currentSounder.currentSound);
  const currentSeek: number = useSelector((state: any) => state.currentSeeker.currentSeek);
  const dispatch = useDispatch();
  function ChangeSeek(seek: number | undefined) {
    if (!!currentSound.howl)
      currentSound.howl.seek(seek);
  }
  useEffect(() => {
    setTimePer(timeToPerCalculation(currentSeek));
  }, [currentSeek]);
  const playButtonSubmit = () => {
    if (!!currentSound.howl && currentSound.howl?.playing()) {
      currentSound.howl.pause();
      return;
    }
    if (!!currentSound.howl)
      currentSound.howl.play();
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    const val_str = newValue.toString();
    const val: number = Number(val_str);
    setTimePer(val);
    ChangeSeek(perToTimeCalculation(val));
  };
  const timeToPerCalculation = (seek: number) => {
    if (!!currentSound.howl) {
      return seek / currentSound.howl.duration() * 100;
    }
    return 0;
  };
  const perToTimeCalculation = (per: number) => {
    if (!!currentSound.howl) {
      return currentSound.howl.duration() / 100 * per;
    }
    return 0;
  };
  const skipPrev = () => {
    currentSound.howl?.stop();
    const currentSoundIndex = sounds.findIndex(hu => hu.filePath === currentSound.filePath);
    const prevSound = sounds[currentSoundIndex - 1];
    if (!!prevSound) {
      dispatch(setCurrentSound(prevSound));
      dispatch(setPlayingId(Number(prevSound?.howl?.play())));
    }
  }
  const skipNext = () => {
    currentSound.howl?.stop();
    const currentSoundIndex = sounds.findIndex(hu => hu.filePath === currentSound.filePath);
    const nextSound = sounds[currentSoundIndex + 1];
    if (!!nextSound) {
      dispatch(setCurrentSound(nextSound));
      dispatch(setPlayingId(Number(nextSound?.howl?.play())));
    }
  }
  if (!!currentSound.howl) {
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
                    image={currentSound.music_photo?.path ? currentSound.music_photo?.path : 'static/resource/no_image_white.png'}
                    alt="Live from space album cover"
                  />
                  <div style={{ marginLeft: '10px' }}>
                    <Typography variant="h6" component="div" style={{ color: "white" }}>
                      {currentSound.musicName}
                    </Typography>
                    <p style={{ color: "white", margin: '4px 0' }}>
                      {currentSound.group}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                  <IconButton
                    aria-label="expand row"
                    size="large"
                    onClick={skipPrev}
                  >
                    <SkipPreviousIcon fontSize='large' style={{ color: 'white' }} />
                  </IconButton>
                  <IconButton
                    aria-label="expand row"
                    size="large"
                    onClick={playButtonSubmit}
                  >
                    {currentSound.howl?.playing() ?
                      <PauseIcon fontSize='large' style={{ color: 'white' }} /> : <PlayArrowIcon fontSize='large' style={{ color: 'white' }} />
                    }
                  </IconButton>
                  <IconButton
                    aria-label="expand row"
                    size="large"
                    onClick={skipNext}
                  >
                    <SkipNextIcon fontSize='large' style={{ color: 'white' }} />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs>
                <div style={{ display: 'flex', justifyContent: "right" }}>
                  <VolumeButton />
                  <RepeatButton />
                </div>
              </Grid>
            </Grid>
          </CardContent >
        </Card >
      </div >
    )
  }
  return (
    <div></div>
  )
}

export const RepeatButton = () => {
  const isLoop: boolean = useSelector((state: any) => state.isLooper.isLoop);
  const dispatch = useDispatch();
  const repeatButtonOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    isLoop ? dispatch(setIsLoop(false)) : dispatch(setIsLoop(true));
  }
  return (
    <div>
      <Button aria-label="expand row" size="large" onClick={repeatButtonOnClick}>
        {isLoop ? <LoopIcon fontSize='large' /> : <LoopIcon fontSize='large' style={{ color: 'white' }} />}
      </Button>
    </div>
  )
}

export const VolumeButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [isOpenPopper, setIsOpenPopper] = useState<boolean>(false);
  const dispatch = useDispatch();
  const volume: number = useSelector((state: any) => state.volume.volume);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (!!isOpenPopper)
      await volumeUpdate({ 'volume': volume });
    setIsOpenPopper(!isOpenPopper);
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    const val: number = Number(newValue);
    dispatch(setVolume(val));
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
