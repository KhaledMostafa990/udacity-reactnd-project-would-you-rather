import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Avatar  from '@material-ui/core/Avatar'
import QuestionVotes from './QuestionVotes';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles((theme)=> ({
    root: {
        flexGrow: 1,
    },
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
        textAlign:'center',
        width:'16rem',
        position:'relative'
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
    voteState:{
        position: 'absolute',
        boxShadow:'.1rem .2rem .6rem #c9c9c9',
        border: '.1rem solid #f1f1f1',
        borderRadius:' 0.5rem',
        width: '100%',
        height: '100%',
        top: '0rem'
    },
    voteIcon:{
        position:'absolute',
        right:'-.5rem',
        top:'-.5rem',
    }
}))
function AnswQuestionsPage (props){
        const classes = useStyles()

        const {question , users, authedUser} = props
        const {author , optionOne , optionTwo , id} = question
        setTimeout(() => {
            console.log(users[authedUser].answers[id] === 'optionTwo')
        }, 1500);
        
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

                    <Box>
                        <Typography variant='body1' component='span' className={classes.hr}></Typography>
                    </Box>
                    
                    {/*Qustion*/}
                    <Box className={classes.questionInfo} p={2}> 

                        <Typography variant='h4' component='h4' >Results</Typography>

                        <Box className={classes.question}>
                            <QuestionVotes id={id} optionText={`${optionOne.text}?`} optionVotes={optionOne.votes.length}/>
                                
                            {users[authedUser].answers[id] === 'optionOne' 
                                ?   <Box className={classes.voteState} >
                                        <Box className={classes.voteIcon} > <VerifiedUserIcon/> </Box>
                                    </Box>
                                : null }                                        
                        </Box>

                        <Box className={classes.question}>
                            <QuestionVotes id={id} optionText={`${optionTwo.text}?`} optionVotes={optionTwo.votes.length}/>

                            {users[authedUser].answers[id] === 'optionTwo' 
                                ?   <Box className={classes.voteState} >
                                        <Box className={classes.voteIcon} > <VerifiedUserIcon/> </Box>
                                    </Box>
                                : null }
                        </Box>
                    </Box>
                </Box>
            </Box>
            </Container>
        )
}
function mapStateToProps ({questions, users, authedUser} , {id}) {

    const question = questions[id];
    return {
       question,
       users,
       authedUser,
    }
}
export default connect(mapStateToProps)(AnswQuestionsPage)