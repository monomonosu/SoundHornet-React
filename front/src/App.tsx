import { useEffect } from 'react';
import './App.css';
import { Howl } from 'howler';
import axios from "axios"
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { setPlayingId } from './redux/playingIdSlice';
import { setVolume } from './redux/volumeSlice';
import { setSounds } from './redux/soundsSlice';
import { setCurrentSound } from './redux/currentSoundSlice';
// components
import Header from './component/Header';
import MusicTable from './component/MusicsTable';
import Footer from './component/Footer';
// hooks
import useFetchMusics from './hooks/useFetchMusics';
// types
import type { MusicResource } from './types/musicResource';

function App() {
  // ステート
  const sounds: MusicResource[] = useSelector((state: any) => state.sounder.sounds);
  const playingId: number = useSelector((state: any) => state.playingId.playingId);
  const dispatch = useDispatch();
  const { getMusics, musics } = useFetchMusics();
  useEffect(() => {
    getMusics('/musics');
    settingGet();
  }, [])
  useEffect(() => {
    createHowler();
  }, [musics]);
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
        musicsGetUrl={"/musics"}
      />

      <div style={{ height: '150px' }}></div>

      {/* フッター */}
      <Footer></Footer>

    </div >
  );
}


export default App;
