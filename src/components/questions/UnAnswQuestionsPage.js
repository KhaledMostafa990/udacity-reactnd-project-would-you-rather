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
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles((theme)=> ({
    container:{
        border:'2px solid #c1c1c1',
        borderRadius:'.6rem',
        display:'flex',
        flexDirection:'column',
        marginTop:'4rem',

    },
    header:{
        backgroundColor:'#f1f1f1',
        borderRadius:'.6rem',
        padding:'.4rem',
        hieght:'5rem',
        display:'flex',
        alignItems:'center'
    },
    questionContainer:{
        height:'16rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',  
    },
    questionInfo:{
        height:'100%',
        display:"flex",
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
    },
    question:{
        width:'100%'
    },
    hr:{
        display:'block',
        height:'6rem',
        border:'.1px solid #c1c1c1',
        padding:'0 -4rem'
    },
    large:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin:'1rem 0'
    },
}))
function UnAnswQuestionsPage (props) {
    const classes = useStyles()

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
    }
    const {users , question } = props
    const { author, optionOne ,optionTwo} = question
    
        return (
            <Container maxWidth='sm' > 

            <Box  className={classes.container}> 
                <Box className={classes.header}>
                    <Avatar alt='User Image' src={users[author].avatarURL} style={{marginRight:'1rem'}} />
                    <Typography  variant='body1' component='p' >{`${users[author].name} asked`}</Typography>
                </Box>

                <Box className={classes.questionContainer} >
                    {/*Avatar*/}
                    <Box>
                        <Avatar className={classes.large} alt='User Image' src={users[author].avatarURL} />
                    </Box>

                    <Box >
                        <Typography variant='body1' component='span' className={classes.hr}></Typography>
                    </Box>
                    
                    {/*Qustion*/}
                    <Box className={classes.questionInfo} p={2}> 
                    <Box className={classes.question} >                    

                            <Typography variant='h5' component='h5'  >Would You Rather</Typography>

                            <form onSubmit={handleSubmit}> 
                            <FormControl>
                                <RadioGroup value={answer} onChange={(e)=> setAnswer(e.target.value)}>
                                    <FormControlLabel control={<Radio value={`optionOne`}/>} label={`${optionOne.text} ?`} > </FormControlLabel>
                                    <FormControlLabel control={<Radio value={`optionTwo`}/>} label={`${optionTwo.text} ?`} > </FormControlLabel>
                                </RadioGroup>
                                <Button type='submit' variant='outlined' color='primary'>Submit</Button>
                            </FormControl>
                            </form>
                        </Box>
                        
                    </Box>
                </Box>
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
export default connect(mapStateToProps)(UnAnswQuestionsPage)