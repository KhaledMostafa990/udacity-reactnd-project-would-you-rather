import React, {useState} from 'react'
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'
import {  NavLink  } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) =>({
  signOut:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    [theme.breakpoints.up(900)]: {
      flexBasis:'25%',
    },
    [theme.breakpoints.down(900)]: {
      display:'none',
    },
  },
 logo: {
    
    [theme.breakpoints.down(900)]: {
    },
  },
  
}))

function Navigation(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState('')
  const {authedUser, users, dispatch} = props
  const theme = useTheme()
  const matchMd = useMediaQuery(theme.breakpoints.down('900'))

  const signOut = ()=> {
    dispatch(setAuthedUser(null))
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position='relative' >
          <Box display='flex' justifyContent='space-around' alignItems='center' p={.5}>
            
            <Box className={classes.logo} >
                <Typography variant="h5" style={{fontFamily:' Praise, cursive '}}> Would You Rather?</Typography>
            </Box>
                { matchMd ? 
                <Box display='flex' alignItems='center'>
                  <IconButton  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MenuIcon style={{fontSize:'2.4rem', color:'white'}} />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <NavLink to='/' style={{color:'black'}}>
                      <MenuItem onClick={handleClose}>Home</MenuItem>
                    </NavLink>
                    <NavLink to='/add' style={{color:'black'}}>
                      <MenuItem onClick={handleClose}>New Question</MenuItem>
                    </NavLink>
                    <NavLink to='/leaderboard' style={{color:'black'}}>
                      <MenuItem onClick={handleClose}>Leaderboard</MenuItem>
                    </NavLink>

                    <MenuItem onClick={signOut}>Logout</MenuItem>
                  </Menu>
                  {authedUser ?
                  <Avatar  alt={users[authedUser].name} src={users[authedUser].avatarURL}/>
                  : null}
                </Box>
                 : 
                 <> 
                  <Box>
              
                    <ButtonGroup variant="contained"  color='primary' aria-label="large contained button group" >
                        <NavLink to='/' style={{color:'white'}}>
                          <Button style={{color:'white'}}>Home</Button>
                        </NavLink>

                        <NavLink to={'/add'} style={{color:'white'}}>
                          <Button style={{color:'white'}}>New Question</Button>
                        </NavLink>
                        
                        <NavLink to={'/leaderboard'} style={{color:'white'}}>
                          <Button style={{color:'white'}}>Leaderboard</Button>
                        </NavLink>
                    </ButtonGroup>
                  </Box>

                  {authedUser 
                    ? <Box className={classes.signOut} >
                          <Box fontSize='11px' >Hello, {users[authedUser].name}</Box>
                          <Avatar alt={users[authedUser].name} src={users[authedUser].avatarURL}/>
                          <Button variant='contained' onClick={signOut} size='small' style={{fontSize:'12px'}} >Logout</Button>
                      </Box> : null }
                </>
            }
          </Box>
      </AppBar>
    </div>
  );
}
function mapStateToprop({authedUser, users}){
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToprop)(Navigation)