import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveQustionAnswered } from '../actions/shared';

import {Link ,Routes,Route ,Navigate} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

class QustionsPage extends Component {
    state={
        answer:null
    }
    setOption = (value) =>{
        this.setState({
            answer: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch, question , authedUser} = this.props
        const { answer } = this.state
        let qid= question.id
        if (answer !== null){
            console.log(this.state.answer, authedUser , question.id, answer)
            dispatch(saveQustionAnswered({ authedUser, qid, answer }))
        }
        
        // <Route path='/unansweredquestion/:id'><Navigate to={`/answeredquestion/${qid}`}/></Route> 
        
    }

    render() {
        const {answer} = this.state
        const { author, optionOne ,optionTwo , id} = this.props.question
        console.log(this.props.question.id) 
        console.log('Author ', author)
        console.log(this.props.users[author].avatarURL) 
        console.log(answer)

        return (
            <div className='questions-container'> 
                <Box component='div' display="flex" flexDirection='column' justifyContent='center' alignItems='center' m={1} p={1} style={{border:'2px solid #3F51B5'}}>                    

                    <Typography variant='h6' component='h6'  style={{marginBottom:'1rem'}}>{`${author} asks`}</Typography>
                    <Typography variant='h5' component='h5'  style={{marginBottom:'1.2rem'}}>Would You Rather</Typography>

                    <form onSubmit={this.handleSubmit}>
                    <RadioGroup value={answer} onChange={(e)=> this.setOption(e.target.value)}>
                        <FormControlLabel control={<Radio value={`optionOne`}/>} label={`${optionOne.text}`} > </FormControlLabel>
                        <FormControlLabel control={<Radio value={`optionTwo`}/>} label={`${optionTwo.text}`} > </FormControlLabel>
                    </RadioGroup>
                    <Button type='submit' variant='outlined' color='primary'>Submit</Button>
                    </form>
                    {/*should navigate by condition to this path */}
                </Box>
               
            </div>
        )
    }
}

function mapStateToProps ({questions, users, authedUser }, {id}) {
    const question = questions[id];
    return {
        authedUser,
       question,  
       users,
    }
}
export default connect(mapStateToProps)(QustionsPage)