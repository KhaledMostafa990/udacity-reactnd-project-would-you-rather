import React, {  useState } from 'react';
import { connect } from 'react-redux';
import { saveQustionAnswered } from '../actions/shared';

import { useNavigate } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';

function QustionsPage (props) {
    // use navigate is the v6 update for useHistory in reactRouter
    const navigate = useNavigate()    
    const [answer, setAnswer] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch, question , authedUser} = props
        let qid= question.id

        if (answer !== null){
            console.log( authedUser , question.id, answer)
            dispatch(saveQustionAnswered({ authedUser, qid, answer }))
            navigate(`/answeredquestion/${qid}`);
        }      
        // <Route path={`/unansweredquestion/${qid}`}><Navigate replace to={`/answeredquestion/${qid}`}/></Route> 
    }
    const { author, optionOne ,optionTwo} = props.question
    console.log(answer)
    
        return (
            <Container maxWidth='sm' > 
                <Box component='div' display="flex" flexDirection='column' justifyContent='center' alignItems='center' m={1} p={1} style={{border:'2px solid #3F51B5'}}>                    

                    <Typography variant='h6' component='h6'  style={{marginBottom:'1rem'}}>{`${author} asks`}</Typography>
                    <Typography variant='h5' component='h5'  style={{marginBottom:'1.2rem'}}>Would You Rather</Typography>

                    <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Would You Rather</FormLabel>
                        <RadioGroup value={answer} onChange={(e)=> setAnswer(e.target.value)}>
                            <FormControlLabel control={<Radio value={`optionOne`}/>} label={`${optionOne.text}`} > </FormControlLabel>
                            <FormControlLabel control={<Radio value={`optionTwo`}/>} label={`${optionTwo.text}`} > </FormControlLabel>
                        </RadioGroup>
                        <Button type='submit' variant='outlined' color='primary'>Submit</Button>
                    </FormControl>
                    </form>
                </Box>
               
            </Container>
        )
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