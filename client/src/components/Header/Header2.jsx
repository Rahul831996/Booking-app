import React, { Fragment,useEffect,useState } from 'react'
import "./Header.css"
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



// const Header = () => {

//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (
//         <Fragment>
//             <div className='header'>
//                 <AppBar position="static">
//                     <Container maxWidth="xl" >
//                         <Toolbar disableGutters>
//                             <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//                             <Typography
//                                 variant="h6"
//                                 noWrap
//                                 component="a"
//                                 href="/"
//                                 sx={{
//                                     mr: 2,
//                                     display: { xs: 'none', md: 'flex' },
//                                     fontFamily: 'monospace',
//                                     fontWeight: 700,
//                                     letterSpacing: '.3rem',
//                                     color: 'inherit',
//                                     textDecoration: 'none',
//                                 }}
//                             >
//                                 LOGO
//                             </Typography>

//                             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                                 <IconButton
//                                     size="large"
//                                     aria-label="account of current user"
//                                     aria-controls="menu-appbar"
//                                     aria-haspopup="true"
//                                     onClick={handleOpenNavMenu}
//                                     color="inherit"
//                                 >
//                                     <MenuIcon />
//                                 </IconButton>
//                                 <Menu
//                                     id="menu-appbar"
//                                     anchorEl={anchorElNav}
//                                     anchorOrigin={{
//                                         vertical: 'bottom',
//                                         horizontal: 'left',
//                                     }}
//                                     keepMounted
//                                     transformOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'left',
//                                     }}
//                                     open={Boolean(anchorElNav)}
//                                     onClose={handleCloseNavMenu}
//                                     sx={{
//                                         display: { xs: 'block', md: 'none' },
//                                     }}
//                                 >
//                                     {pages.map((page) => (
//                                         <MenuItem key={page} onClick={handleCloseNavMenu}>
//                                             <Typography textAlign="center">{page}</Typography>
//                                         </MenuItem>
//                                     ))}
//                                 </Menu>
//                             </Box>
//                             <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//                             <Typography
//                                 variant="h5"
//                                 noWrap
//                                 component="a"
//                                 href=""
//                                 sx={{
//                                     mr: 2,
//                                     display: { xs: 'flex', md: 'none' },
//                                     flexGrow: 1,
//                                     fontFamily: 'monospace',
//                                     fontWeight: 700,
//                                     letterSpacing: '.3rem',
//                                     color: 'inherit',
//                                     textDecoration: 'none',
//                                 }}
//                             >
//                                 LOGO
//                             </Typography>
//                             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//                                 {pages.map((page) => (
//                                     <Button
//                                         key={page}
//                                         onClick={handleCloseNavMenu}
//                                         sx={{ my: 2, color: 'white', display: 'block' }}
//                                     >
//                                         {page}
//                                     </Button>
//                                 ))}
//                             </Box>

//                             <Box sx={{ flexGrow: 0 }}>
//                                 <Tooltip title="Open settings">
//                                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                         <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Menu
//                                     sx={{ mt: '45px' }}
//                                     id="menu-appbar"
//                                     anchorEl={anchorElUser}
//                                     anchorOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'right',
//                                     }}
//                                     keepMounted
//                                     transformOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'right',
//                                     }}
//                                     open={Boolean(anchorElUser)}
//                                     onClose={handleCloseUserMenu}
//                                 >
//                                     {settings.map((setting) => (
//                                         <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                                             <Typography textAlign="center">{setting}</Typography>
//                                         </MenuItem>
//                                     ))}
//                                 </Menu>
//                             </Box>
//                         </Toolbar>
//                     </Container>
//                 </AppBar>
//             </div>
//         </Fragment>
//     )
// }

// export default Header



 
 

const Header = () => {

 

    const [stickyClass, setStickyClass] = useState('relative');

    useEffect(() => {
      window.addEventListener('scroll', stickNavbar);
  
      return () => {
        window.removeEventListener('scroll', stickNavbar);
      };
    }, []);
  
    const stickNavbar = () => {
      if (window !== undefined) {
        let windowHeight = window.scrollY;
        windowHeight > 60 ? setStickyClass('stcky-nav') : setStickyClass('relative');
      }
    };


  return (
    <Fragment>
        <div className='header'>
            <div className={`header-1 ${stickyClass}`}>
                
              
                     <div className='frt-div'><span> Movie World</span></div>
                    <div className='sec-div'>
                        <a href="/">Home</a>
                        <a href="/movies">Movies</a>
                        <a href="/">Categories</a>
                    </div>
                    <div className='trd-div'>

                        <div>
                        <Link className='userProfile' to={"/account"}>
                           
                                <img src="/Profile.png"/>
                        </Link>
                    
                        </div>  
                    </div>
                 
            </div>
        </div>
    </Fragment>
  )
}

export default Header




// Your account
// Help
// Watch Anywhere
// Account & Settings
// Sign out
// Profiles
// Kids
// Add new
// Manage profiles
// Learn more