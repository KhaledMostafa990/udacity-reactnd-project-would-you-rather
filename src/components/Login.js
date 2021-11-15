import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import  {Link}  from 'react-router-dom'
import {Button, FormControl, InputLabel, Select, MenuItem, Container} from '@material-ui/core'

 class SignIn extends Component {
    state = {
        text: '',
        toDashboard: false,
        open: true,
        close:false,
    }

    handleInputValue = (e) => {
        const text = e.target.value
        this.setState({
            text
        })
  }

    handleSubmit = (e) => {
        e.preventDefault()
        const {text} = this.state
        const {dispatch , users} = this.props
        if(users[text]) {
           dispatch(setAuthedUser(text)) 
        } 

    }

    handleChange = (event) => {
        console.log(event.target.value);
    };

    handleClose = () => {
        this.setState({
            open:false
        })
    };

    handleOpen = () => {
        this.setState({
            open:true
        })
    };

    render() {
        const { text} = this.state
        const {users} = this.props
        

        return (
            <div >
                <Container>
                    <Button onClick={this.handleOpen}>  
                        <Link 
                            to='/dashboard'
                            onClick={this.handleSubmit}
                            disabled={!users[text]} 
                            className='btn'>select User</Link>
                    </Button>
                    <FormControl >
                        <InputLabel id="demo-controlled-open-select-label">Select User</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.handleInputValue}
                        onChange={this.handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'khaledfarghly'}>khaledfarghly</MenuItem>
                        <MenuItem value={'tylermcginnis'}>tylermcginnis</MenuItem>
                        <MenuItem value={'sarahedo'}>sarahedo</MenuItem>
                        </Select>
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