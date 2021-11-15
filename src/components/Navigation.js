import React, { Component } from 'react'
import {  NavLink  } from 'react-router-dom'
import { makeStyles ,createStyles , Theme} from '@material-ui/core/styles'
import { AppBar ,Toolbar, Button , Typography ,ButtonGroup, Container ,Grid} from '@material-ui/core';



const useStyles = makeStyles({
  nav: {
    justifyContent:'center'
  },
  container: {
    alignItems:'center',
  },
  link: {
    color:'white'
  },
   
});

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.nav} position="static">
        <Toolbar>

            <Grid container >
                <Grid  item  sm={3} align='left' >
                    <Typography variant="h5">
                        Would You Rather 
                    </Typography>
                </Grid>

                <Grid item   sm={6} align='center'>
                    <ButtonGroup variant="contained"  color='primary' aria-label="contained primary button group">
                        <Button  className={classes.primaryNav}><NavLink to='/' className={classes.link}>Home</NavLink></Button>
                        <Button  className={classes.primaryNav}><NavLink to='/addquestion' className={classes.link}>New Question</NavLink></Button>
                        <Button  className={classes.primaryNav}><NavLink to='/leaderboard' className={classes.link}>Leaderboard</NavLink></Button>
                    </ButtonGroup>
                </Grid>

                <Grid item  sm={3} align='right'>
                    <Button className={classes.signIn} variant='contained' ><NavLink to='/signin' style={{color:'black'}}>Login</NavLink></Button>
                </Grid>

            </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}


    // <nav className='nav'>
    //             <h1><NavLink to='/'className='logo' style={{fontSize:18}}>WouldYouRather</NavLink></h1>
    //                 <div className='navbar_left'>
    //                     <button className='btnn'><NavLink className='nav-link' to='/signin' > Home</NavLink> </button>
    //                     <button className='btnn'><NavLink className='nav-link' to='/newquestion' >New Question</NavLink> </button>
    //                     <button className='btnn'><NavLink className='nav-link' to='/leaderboard' > Leaderboard</NavLink></button>
    //                 </div>
    //                 <div className="navbar_right">            
    //                     <button className='btnn'><NavLink className='nav-link' to='/signin'>LogIn</NavLink></button>
    //                 </div>   
    //             </nav> 