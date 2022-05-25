import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, Popper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import BackupIcon from '@mui/icons-material/Backup';
import SettingsIcon from '@mui/icons-material/Settings';
import BoyIcon from '@mui/icons-material/Boy';
import FilterIcon from '@mui/icons-material/Filter';
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import axios from "axios"
import { Howl, Howler } from 'howler';


type Music = {
  id: number;
  musicName: string;
  artist: string;
  album: string;
  genre: string;
  fileSize: string;
}

function App() {
  // メソッド
  function PlaySound(music: Music) {
    const filepath = 'static/musics/' + music.musicName + '.mp3';
    console.log(music);
    console.log(filepath);
    const sound: Howl = new Howl({
      src: [filepath],
    });
    sound.play();
  }
  const drawerOpen = () => {
    setIsOpenDrawer(!isOpenDrawer);
  }
  const openPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenPopper(true);
  }
  const closePopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenPopper(false);
  }
  const openPopper2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
    setIsOpenPopper2(true);
  }
  const closePopper2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
    setIsOpenPopper2(false);
  }
  const openPopper3 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl3(event.currentTarget);
    setIsOpenPopper3(true);
  }
  const closePopper3 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl3(event.currentTarget);
    setIsOpenPopper3(false);
  }
  // ステート
  const [musics, setMusics] = useState<Music[]>([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenPopper, setIsOpenPopper] = useState(false);
  const [isOpenPopper2, setIsOpenPopper2] = useState(false);
  const [isOpenPopper3, setIsOpenPopper3] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [anchorEl3, setAnchorEl3] = useState<null | HTMLElement>(null);
  useEffect(() => {
    axios.get("http://localhost:8080/test")
      .then((response) => {
        console.log(response.data);
        setMusics(response.data);
      });
  }, []);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "#161B22" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={drawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={isOpenDrawer}
              onClose={drawerOpen}
            >
              <Box style={{ backgroundColor: "#161B22", height: '100vh' }}>
                <Box style={{ height: '9vh' }}></Box>
                <Grid container>
                  <Button><BoyIcon />　Artist</Button>
                </Grid>
                <Grid container>
                  <Button><FilterIcon />　Album</Button>
                </Grid>
                <Grid container>
                  <Button><SellIcon />　Genre</Button>
                </Grid>
                <Grid container>
                  <Button><FavoriteIcon />　Favorite</Button>
                </Grid>
              </Box>
            </Drawer>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              SoundHornet
            </Typography>
            <Link to="/download">
              <Button onMouseEnter={openPopper} onMouseLeave={closePopper}>
                <YouTubeIcon fontSize="large" />
                <Popper open={isOpenPopper} anchorEl={anchorEl}>
                  <Paper>
                    <Typography sx={{ p: 2 }}>Download from Youtube</Typography>
                  </Paper>
                </Popper>
              </Button>
            </Link>
            <Link to="/import">
              <Button onMouseEnter={openPopper2} onMouseLeave={closePopper2}>
                <BackupIcon fontSize="large" />
                <Popper open={isOpenPopper2} anchorEl={anchorEl2}>
                  <Paper>
                    <Typography sx={{ p: 2 }}>Import</Typography>
                  </Paper>
                </Popper>
              </Button>
            </Link>
            <Link to="/setting">
              <Button onMouseEnter={openPopper3} onMouseLeave={closePopper3}>
                <SettingsIcon fontSize="large" />
                <Popper open={isOpenPopper3} anchorEl={anchorEl3}>
                  <Paper>
                    <Typography sx={{ p: 2 }}>Setting</Typography>
                  </Paper>
                </Popper>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

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
                  <TableCell style={{ color: "#FFFFFF" }}>MusicName</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Artist</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Album</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }}>Genre</TableCell>
                  <TableCell style={{ color: "#FFFFFF" }} align="right">FileSize</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {musics.map((music) => (
                  <TableRow
                    key={music.musicName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => PlaySound(music)}
                  >
                    <TableCell style={{ color: "#FFFFFF" }} component="th" scope="row">
                      {music.musicName}
                    </TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>{music.artist}</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>{music.album}</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>{music.genre}</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }} align="right">{music.fileSize}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>

    </div >
  );
}

export default App;
