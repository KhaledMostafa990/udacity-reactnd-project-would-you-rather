import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import  {Link}  from 'react-router-dom'
import {Button, Container,FormControl, InputLabel, Select, MenuItem, FormHelperText} from '@material-ui/core'

 class SignIn extends Component {
    state = {
        text: '',
        toDashboard: false,
        open: true,
        close:false,
    }

    handleChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
        text
        }))
  }

    handleSubmit = (e) => {
        e.preventDefault()
        const {text} = this.state
        const {dispatch , users} = this.props
        if(users[text]) {
           dispatch(setAuthedUser(text)) 
        } 

    }
    
    render() {
        const { text} = this.state
        const {users} = this.props
        

        return (
            <div>    
                <Container maxWidth='sm' style={{
                    border:'1.5px solid #3F51B5',
                    marginTop:'5rem',
                    borderRadius:'2px',
                    padding:'3rem',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'}}>
                    <FormControl style={{minWidth:'25rem'}} >
                        
                        <Select
                        color='primary'
                        variant='outlined'
                        labelId="select-label"
                        id="select"
                        value={text}
                        onChange={this.handleChange}
                        >
                        
                        <MenuItem value={'khaledfarghly'}>khaledfarghly</MenuItem>
                        <MenuItem value={'tylermcginnis'}>tylermcginnis</MenuItem>
                        <MenuItem value={'sarahedo'}>sarahedo</MenuItem>
                        </Select>
                        <FormHelperText>Select User To Start</FormHelperText>
                        <Button onClick={this.handleSubmit} variant='contained' color='primary' disabled={!users[text]} style={{marginTop:'3rem'}}>
                           Login
                        </Button>
                    </FormControl>
                </Container>
               
            </div>
        )
    }
}
function mapStateToProps ({users}) {

    return {
        users,
    }
}
export default  connect(mapStateToProps)(SignIn)

{/* <h4 className=''>Choose User </h4>
<div className='input-field'>
    <input list='datalist' onChange={this.handleInputValue}></input>
    <datalist id='datalist'>
        <option value='khaledfarghly'>khaledfarghly</option>
        <option value='tylermcginnis'>tylermcginnis</option>
        <option value='sarahedo'>sarahedo</option>
    </datalist>
    <Link 
        to='/dashboard'
        onClick={this.handleSubmit}
        // type='submit' 
        disabled={!users[text]} 
        className='btn'> Login</Link>
</div>   */}