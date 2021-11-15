import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme)=> ({
    container:{
        border:'1.5px solid gray',
        borderRadius:'1.5px',
        marginTop:'4rem',
        padding:'1.5rem',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    hr:{
        border:'.1rem solid gray',
        width:'100%',
        margin:'.5rem 0'
    },
    large:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin:'1rem 0'
    }
}))

function SignIn(props)  {
    const classes = useStyles()

    const [text, setText] = useState()
    const {users, dispatch} = props

    const handleSubmit = (e) => {
        e.preventDefault()
        if(users[text]) {
           dispatch(setAuthedUser(text)) 
        } 

    }

        return (   
            <Container maxWidth='sm' className={classes.container}>
                <Typography variant='h6' component='h6'>Welcome to the Would You Rather App!</Typography>              
                <Typography variant='body1' component='p' >please sing in to continue</Typography>              
                <Typography component='span' className={classes.hr}></Typography>
                <Avatar className={classes.large} alt='react-redux' src='https://miro.medium.com/max/600/1*i1yreXvK0kGrS9_uy5qKHQ.jpeg' />

                <FormControl style={{minWidth:'75%',}} >
                    <Select 
                        color='primary'
                        variant='outlined'
                        id='select'
                        value={text}
                        onChange={(e)=> setText(e.target.value)}
                    >      
                        <MenuItem value={'khaledfarghly'}>Khaled Farghly</MenuItem>
                        <MenuItem value={'tylermcginnis'}>Tyler Mcginnis</MenuItem>
                        <MenuItem value={'sarahedo'}>Sarah Edo</MenuItem>
                    </Select>
                    <FormHelperText style={{marginTop:'.5rem'}}>Select User </FormHelperText>

                    <Button onClick={handleSubmit} variant='contained' color='primary' disabled={!users[text]} style={{marginTop:'.5rem'}}>
                        Login
                    </Button>
                </FormControl>
            </Container>
        )
}

function mapStateToProps ({users}) {

    return {
        users,
    }
}
export default  connect(mapStateToProps)(SignIn)
