import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { useRecoilState, useRecoilBridgeAcrossReactRoots_UNSTABLE } from 'recoil';
import { Howl, Howler } from 'howler';
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import { isLoopSetFalse, isLoopSetTrue } from './redux/isLoopSlice';
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
// atoms
import { musicsAtom } from './atoms/MusicsAtom';
import { currentSoundAtom } from './atoms/CurrentSoundAtom';
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
  const [checkedNumbers, setCheckedNumbers] = useState<number[]>([]);
  const [musics, setMusics] = useRecoilState(musicsAtom);
  const [currentSound, setCurrentSound] = useRecoilState(currentSoundAtom);
  const [sounds, setSounds] = useRecoilState(soundsAtom);
  const [volume, setVolume] = useRecoilState(volumeAtom);
  const [playingId, setPlayingId] = useRecoilState(playingIdAtom);
  const [currentSeek, setCurrentSeek] = useRecoilState(currentSeekAtom);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const isLoop = useSelector((state: any) => state.isLooper.isLoop);
  const isLoopRef = useRef(0);
  const [dummyHandler, setDummyHandler] = useState(0);  // currentSound->useEffect用ダミー変数

  useEffect(() => {
    musicsGet();
    settingGet();
  }, [])
  useEffect(() => {
    console.log('currentSound:', currentSound);
    currentSound.howl?.once('end', () => {
      // ループ機能
      if (isLoopRef.current) {
        setDummyHandler(() => { return dummyHandler + 1 }); // useEffectが実行されなくなる為
        setCurrentSound(currentSound);
        setPlayingId(Number(currentSound?.howl?.play()));
        return;
      }
      // TODO:自動連続再生 Index番号によって管理 ソートに対応できない場合修正をする事。
      const currentSoundIndex = sounds.findIndex(hu => hu.filePath === currentSound.filePath);
      const nextSound = sounds[currentSoundIndex + 1];
      if (!!nextSound) {
        setCurrentSound(nextSound);
        setPlayingId(Number(nextSound?.howl?.play()));
      }
    });
  }, [currentSound, dummyHandler]);
  useEffect(() => {
    isLoopRef.current = isLoop;
  }, [isLoop]);
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
    setCurrentSeek(currentSound?.howl.seek());
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
          id: music.id,
          musicName: music.musicName,
          group: music.group,
          filePath: filepath,
          music_photo: music.music_photo,
          howl: new Howl({
            src: filepath,
          })
        }])
        return;
      }
      else {
        const index = sounds.findIndex((el) => el.filePath === filepath);
        // const soundsCopy = [...sounds];
        // soundsCopy[index] = {
        sounds[index] = {
          id: music.id,
          musicName: music.musicName,
          group: music.group,
          filePath: filepath,
          music_photo: music.music_photo,
          howl: sounds[index].howl,
        }
        setSounds(sounds);
      }
    });
    console.log('sounds:', sounds);
  }
  function PlaySound(music: Music) {
    let resource = sounds.find(el => el.filePath === 'static/musics/' + music.fileName);
    if (!!currentSound.howl && currentSound.howl.playing() === true && currentSound.filePath === resource?.filePath) {
      currentSound.howl.pause();
    }
    else if (!!currentSound.howl && currentSound.filePath !== resource?.filePath) {
      currentSound.howl.stop();
      setPlayingId(Number(resource?.howl?.play()));
      if (!!resource)
        setCurrentSound(resource);
    }
    else {
      if (currentSound.howl === undefined && !!resource) {
        setCurrentSound(resource);
        setPlayingId(Number(resource?.howl?.play()));
      }
      if (!!currentSound.howl) {
        currentSound.howl.play();
      }
    }
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
      <RecoilBridge>
        <MusicTable
          musics={musics}
          checkedNumbers={checkedNumbers}
          setCheckedNumbers={setCheckedNumbers}
          PlaySound={PlaySound}
          isDeleteButton={isDeleteButton}
          musicsDelete={musicsDelete}></MusicTable>
      </RecoilBridge>

      <div style={{ height: '150px' }}></div>

      {/* フッター */}
      <Footer></Footer>

    </div >
  );
}

export const Footer = () => {
  // TODO:アルバムフォト・MusicName・GroupNameの繋ぎこみをする。
  // TODO:再生・次へ・前へ・音量・詳細を付ける。
  const Wrapper = styled.div<{ left: number | undefined }>`
    .MuiSlider-thumbColorPrimary{
      left:${props => (props.left ? props.left.toString() + '%' : '0%')} !important;
    }
  `

  const [timePer, setTimePer] = useState<number | undefined>();
  const [currentSound, setCurrentSound] = useRecoilState(currentSoundAtom);
  const [currentSeek, setCurrentSeek] = useRecoilState(currentSeekAtom);
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
                    onClick={() => console.log('hoge')}
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
                    onClick={() => console.log('hoge')}
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
  const isLoop = useSelector((state: any) => state.isLooper.isLoop);
  const dispatch = useDispatch();
  const repeatButtonOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    isLoop ? dispatch(isLoopSetFalse()) : dispatch(isLoopSetTrue());
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
