import React, {  useState } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Input  from '@material-ui/core/Input'


const useStyles = makeStyles((theme)=> ({
    large:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin:'1rem 0'
    }
}))

function SignIn(props)  {
    
    const classes = useStyles()
    const [showSelect, setshowSelect] = useState()
    const [text, setText] = useState('')
    const {users, dispatch} = props

    const handleSubmit = (e) => {
        e.preventDefault()
        if(users[text]) {
           dispatch(setAuthedUser(text)) 
        } 

    }
        return (   
            <>
            <Box borderRadius='.2rem' className='sign-in'  mt={'5%'}  p={'2rem'} display='flex' flexDirection='column'  alignItems='center'  
                style={{border:'.1rem solid #e1e1e1', boxShadow:'-.1rem -.1rem .6rem #e1e1e1'}} >
                    
                {/* { Header } */}
                <Typography variant='h5' >Welcome to the Would You Rather App!</Typography>              
                <Box>please sing in to continue</Box>

                {/* { line and pic } */}
                <Box style={{border:'.07rem solid #c9c9c9', width:'100%'}} m='1rem 0'></Box>
                <Avatar className={classes.large} alt='react-redux' src='https://miro.medium.com/max/600/1*i1yreXvK0kGrS9_uy5qKHQ.jpeg' />

                {/* { Select To log in} */}
                <FormControl style={{minWidth:'75%',}} >
                    <InputLabel id="choose-user">Choose User To start</InputLabel>
                    <Select 
                        color='primary'
                        variant='outlined'
                        labelId='choose-user'
                        id='select'
                        value={text}
                        input={<Input />}
                        open={showSelect}
                        onChange={(e)=> setText(e.target.value)}
                        onOpen={()=>setshowSelect(true)}
                        onClose={()=>setshowSelect(false)}
                    >      
                        <MenuItem value={'khaledfarghly'}>Khaled Farghly</MenuItem>
                        <MenuItem value={'tylermcginnis'}>Tyler Mcginnis</MenuItem>
                        <MenuItem value={'sarahedo'}>Sarah Edo</MenuItem>
                    </Select>
                    <FormHelperText style={{marginTop:'.5rem'}}>Select User </FormHelperText>

                    <Button onClick={handleSubmit} variant='contained' type='submit' color='primary' disabled={!users[text]} style={{marginTop:'.5rem'}}>
                        Login
                    </Button>
                </FormControl>
                
            </Box>
            <Box style={{fontSize: 12, textAlign: 'center'}} position='relative' bottom='-5rem' right>
                    Development by <a href="https://github.com/KhaledMostafa990" target="blank" >Khaled Farghly </a>.
            </Box>
            </>
        )
}

function mapStateToProps ({users}) {

    return {
        users,
    }
}
export default  connect(mapStateToProps)(SignIn)

