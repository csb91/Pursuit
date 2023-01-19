import * as React from 'react';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Image from 'next/image';
import ResumeForm from './resume/resumeForm.jsx';
import Link from 'next/link';
import Notifications from './notifications.jsx';
import axios from 'axios';

// Navigation Link
const pages = [['Home', '/'], ['Job Board', '/'], ['My Jobs', '/homeJobSeeker']];
const settings = [['Job Seeker Home', '/homeJobSeeker'], ['Employer Home', '/homeEmployer'] ,['Logout', '/'], ['Post Job', '/postJob']];

// TODO: Conditionally Add Login Page
// TODO: Conditionally change pages based on whether the user is logged in.

const logoUrl = '';

const NavBar = ({ page }) => {
  const [notifications, setNotifications] = useState([]);
  //TODO: Routinely pull down items for user for notifications:

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [importingResume, updateImportingResume] = useState(false);
  const [showNotifications, updateShowNotifications] = useState(false);

  // TODO: Routinely pull down items from user for notifications:

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };

  useEffect(() => {
    axios.get('http://localhost:3001/notifications', {params: {user_id: 2}})
      .then(res => setNotifications(res.data))
      .catch(err => console.log(data))
  }, [])

  return (
    <AppBar position='static' sx={{ bgcolor: '#E44F48' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="user-account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((apage) => (
                <MenuItem key={apage} onClick={handleCloseNavMenu}>
                   <Link key={apage[1]} href={apage[1]} passHref style={{ textDecoration: 'none', color: 'black' }}>
                    <Typography textAlign="center">{apage[0]}</Typography>
                   </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <Image src='/assets/logo.png' alt='Job-Pursuit-Logo' width='200' height='64' />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link key={page[1]} href={page[1]} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center">{page[0]}</Typography>
                </Link>
              </Button>
            ))}
            <Button>
              <Link style={{ textDecoration: 'none', color: 'white' }} href="/calendar">Calendar</Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                  <MenuItem key={setting[0]} onClick={handleCloseUserMenu} >
                    <Link key={setting[1]} href={setting[1]} passHref style={{ textDecoration: 'none', color: 'black' }}>
                    <Typography textAlign="center" underline='none'>{setting[0]}</Typography>
                    </Link>
                  </MenuItem>
              ))}
              <MenuItem key={'notifications'} onClick={event => {
                updateShowNotifications(true)}}>
                <Typography textAlign="center">Notifications {'(' + notifications.length + ')'}</Typography>
              </MenuItem>
              <MenuItem key={'upload'} onClick={e => updateImportingResume(true)}>
                <Typography textAlign="center">Upload Resume</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ResumeForm visible={importingResume} updateVisible={updateImportingResume} />
      <Notifications visible={showNotifications} updateVisible={updateShowNotifications} notifications={notifications} setNotifications={setNotifications}/>
    </AppBar>
  )

};

export default NavBar;