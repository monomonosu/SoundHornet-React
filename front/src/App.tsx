import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { Howl } from 'howler';
import axios from "axios"
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { setPlayingId } from './redux/playingIdSlice';
import { setVolume } from './redux/volumeSlice';
import { setMusics } from './redux/musicsSlice';
import { setSounds } from './redux/soundsSlice';
import { setCurrentSound } from './redux/currentSoundSlice';
// components
import Header from './component/Header';
import MusicTable from './component/MusicsTable';
import Footer from './component/Footer';
// types
import type { Music } from './types/musics';
import type { MusicResource } from './types/musicResource';

function App() {
  // ステート
  const [checkedNumbers, setCheckedNumbers] = useState<number[]>([]);
  const currentSound: MusicResource = useSelector((state: any) => state.currentSounder.currentSound);
  const musics: Music[] = useSelector((state: any) => state.musics.musics);
  const sounds: MusicResource[] = useSelector((state: any) => state.sounder.sounds);
  const playingId: number = useSelector((state: any) => state.playingId.playingId);
  const dispatch = useDispatch();

  useEffect(() => {
    musicsGet();
    settingGet();
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
  // ↓オブジェクト生成時に付随するものなので、コンポーネント毎に持たせる必要はない。
  const afterPlayback = () => {
    const storeState = store.getState();
    const storeSounds: MusicResource[] = storeState.sounder.sounds;
    let resource = storeSounds.find(el => el.filePath === storeState.currentSounder.currentSound.filePath);
    // ループ機能
    if (storeState.isLooper.isLoop) {
      dispatch(setCurrentSound(resource));
      dispatch(setPlayingId(Number(resource?.howl?.play(playingId))));
      return;
    }
    // TODO:自動連続再生 Index番号によって管理 ソートに対応できない場合修正をする事。
    const currentSoundIndex = storeSounds.findIndex(el => el.filePath === storeState.currentSounder.currentSound.filePath);
    const nextSound = storeSounds[currentSoundIndex + 1];
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


export default App;
