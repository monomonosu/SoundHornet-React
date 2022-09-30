import { useState } from 'react';
import "../styles/main.scss";
import {
    AppBar, Toolbar, IconButton, Typography, Button, Box, Grid, Paper, Drawer, Popper,
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

export default function Header() {
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
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isOpenPopper, setIsOpenPopper] = useState(false);
    const [isOpenPopper2, setIsOpenPopper2] = useState(false);
    const [isOpenPopper3, setIsOpenPopper3] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const [anchorEl3, setAnchorEl3] = useState<null | HTMLElement>(null);
    return (
        <div className="Header">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar className='-bggraydark'>
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
                                    <Button><BoyIcon />　Group</Button>
                                </Grid>
                                <Grid container>
                                    <Link to="/album-page" style={{ textDecoration: 'none' }}>
                                        <Button><FilterIcon />　Album</Button>
                                    </Link>
                                </Grid>
                                <Grid container>
                                    <Button><SellIcon />　Genre</Button>
                                </Grid>
                                <Grid container>
                                    <Button><FavoriteIcon />　Favorite</Button>
                                </Grid>
                                {/* <Grid container>
                                    <Link to="/table-sample" style={{ textDecoration: 'none' }}>
                                        <Button>　Sample</Button>
                                    </Link>
                                </Grid> */}
                            </Box>
                        </Drawer>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button size='large' style={{ textTransform: "none", color: "white" }}>Sound</Button>
                            </Link>
                        </Typography>
                        <Link to="/download-page">
                            <Button onMouseEnter={openPopper} onMouseLeave={closePopper}>
                                <YouTubeIcon fontSize="large" />
                                <Popper open={isOpenPopper} anchorEl={anchorEl}>
                                    <Paper>
                                        <Typography sx={{ p: 2 }}>Download from Youtube</Typography>
                                    </Paper>
                                </Popper>
                            </Button>
                        </Link>
                        <Link to="/import-page">
                            <Button onMouseEnter={openPopper2} onMouseLeave={closePopper2}>
                                <BackupIcon fontSize="large" />
                                <Popper open={isOpenPopper2} anchorEl={anchorEl2}>
                                    <Paper>
                                        <Typography sx={{ p: 2 }}>Import</Typography>
                                    </Paper>
                                </Popper>
                            </Button>
                        </Link>
                        <Link to="/setting-page">
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
        </div>
    )
};
