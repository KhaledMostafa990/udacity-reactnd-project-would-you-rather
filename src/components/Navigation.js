import React from 'react'
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'
import {  NavLink , useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
  signOut:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  }
   
});

function Navigation(props) {

  const classes = useStyles();

  // use navigate is the v6 updateD for useHistory in reactRouter
  const navigate = useNavigate()
  const {authedUser, users, dispatch} = props

  const signOut = ()=> {
    dispatch(setAuthedUser(null))
    navigate('/')
  }

  return (
    <div>
      <AppBar style={{justifyContent:'center'}} position='relative'>
        <Toolbar>
          <Grid container >
            <Grid  item xs={3} >
                <Typography variant="h5" style={{fontFamily:' Praise, cursive '}}> Would You Rather  </Typography>
            </Grid>

            <Grid item xs={6} align='center'>
                <ButtonGroup variant="contained"  color='primary' aria-label="large contained button group" >
                    <NavLink to='/' style={{color:'white'}}>
                      <Button style={{color:'white'}}>Home</Button>
                    </NavLink>

                    <NavLink to={'/addquestion'} style={{color:'white'}}>
                      <Button style={{color:'white'}}>New Question</Button>
                    </NavLink>
                    
                    <NavLink to={'/leaderboard'} style={{color:'white'}}>
                      <Button style={{color:'white'}}>Leaderboard</Button>
                    </NavLink>
                </ButtonGroup>
            </Grid>
            {authedUser 
                ? <Grid className={classes.signOut} item xs={3} align='right'>
                    <Typography variant='h6' component='p' style={{fontSize:'12px'}} >Hello, {users[authedUser].name}</Typography>
                    <Avatar alt={users[authedUser].name} src={users[authedUser].avatarURL}/>
                    <Button variant='contained' onClick={signOut} style={{fontSize:'12px'}} ><NavLink to='/' style={{color:'black'}}>Logout</NavLink></Button>
                </Grid> : null }

          </Grid>
        </Toolbar>
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