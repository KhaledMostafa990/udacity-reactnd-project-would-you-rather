import React, {  useState } from 'react'
import { connect } from 'react-redux'
import { saveQustionAnswered } from '../../actions/shared'
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles((theme)=> ({
    
    large:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin:'1rem 0'
    },
}))
function UnAnswQuestionsPage (props) {
    /** UnAnswQuestionsPage
     * - saveQustionAnswered method is an action creator using handleSaveAnswer method to saving signed-in user answer in the state 
     */
    const classes = useStyles()

    const navigate = useNavigate()    
    const [answer, setAnswer] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch, question , authedUser} = props
        let qid= question.id

        if (answer !== null){
            console.log( authedUser , question.id, answer)
            dispatch(saveQustionAnswered({ authedUser, qid, answer }))
            navigate(`/answered/${qid}`);
        } 
    }
    const {users , question } = props
    const { author, optionOne ,optionTwo} = question
    
        return (
        

            <Box     mr={'15%'} ml={'15%'}  mt={'5%'} style={{border:'.1rem solid #e1e1e1', boxShadow:'-.1rem -.1rem .4rem #e1e1e1'}}
                    borderRadius='.2rem' display='flex' flexDirection='column' p={.5} mb={2}> 

                {/* { Header } */}
                <Box style={{backgroundColor:'#e9e9e9', borderRadius:'.4rem'}} p={1}  display='flex' alignItems='center'>
                    <Avatar alt='User Image' src={users[author].avatarURL} style={{marginRight:'1rem'}} />
                    <Typography  variant='body1' component='p' >{`${users[author].name} asked`}</Typography>
                </Box>

                <Box display='flex' alignItems='center' justifyContent='space-around'>

                    {/* { Avatar } */}
                    <Box> <Avatar className={classes.large} alt='User Image' src={users[author].avatarURL} /> </Box>
                    
                    <Box  style={{height:'6rem' , border:'.1px solid #e1e1e1',}}></Box>
                    
                    {/* { Question } */}
                    <Box height='12rem' display='flex' flexDirection='column' justifyContent='space-around' alignItems='center'  p={2}> 

                        <Box  width='18.5rem' >                    

                            <form onSubmit={handleSubmit}> 
                            <FormControl  component="fieldset">
                                <FormLabel style={{ fontSize:'1.6rem',marginBottom:'1rem'}} component="legend">Would You Rather</FormLabel>
                                <RadioGroup  aria-label="gender" name="gender" value={answer} onChange={(e)=> setAnswer(e.target.value)}>
                                    <FormControlLabel value={`${optionOne.text} ?`} control={<Radio value={`optionOne`}/>} label={`${optionOne.text} ?`} > </FormControlLabel>
                                    <FormControlLabel value={`${optionOne.text} ?`} control={<Radio value={`optionTwo`}/>} label={`${optionTwo.text} ?`} > </FormControlLabel>
                                </RadioGroup>
                                <Button type='submit' variant='outlined' disabled={!answer} color='primary'>Submit</Button>
                            </FormControl>
                            </form>
                        </Box>                        
                    </Box>
                </Box>
            </Box>                
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
export default connect(mapStateToProps)(UnAnswQuestionsPage)