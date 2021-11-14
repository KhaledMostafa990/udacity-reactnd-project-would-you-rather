import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

class AnsweredQuestionsPage extends Component {
    render() {
        const { author, optionOne ,optionTwo , id} = this.props.question
        console.log(this.props.question) 
        console.log(this.props.users) 
        console.log('Author ', author)
        console.log(this.props.users[author].avatarURL) 

        return (
            <div className='questions-container'> 
                <Box component='div' display="flex" flexDirection='column' justifyContent='center' alignItems='center' m={1} p={1} style={{border:'2px solid #3F51B5'}}>                    

                    <Typography variant='h6' component='h6'  style={{marginBottom:'1rem'}}>{`asked by ${author}`}</Typography>
                    <Typography variant='h5' component='h5'  style={{marginBottom:'1.2rem'}}>Would You Rather</Typography>
                    
                    <Typography variant='h5' component='h5'  style={{marginBottom:'1.2rem'}}>{`${optionOne.votes.length} from 3`}</Typography>
                    <Typography variant='h5' component='h5'  style={{marginBottom:'1.2rem'}}>{`${optionTwo.votes.length} from 3`}</Typography>
                </Box>
               
            </div>
        )
    }
}

function mapStateToProps ({questions, users, authedUser }, {id}) {
    const question = questions[id];
    return {
       question,  
       users,
    }
}
export default connect(mapStateToProps)(AnsweredQuestionsPage)