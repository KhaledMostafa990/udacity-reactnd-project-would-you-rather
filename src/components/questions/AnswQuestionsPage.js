import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar  from '@material-ui/core/Avatar'
import QuestionVotes from './QuestionVotes';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles((theme)=> ({
    large:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin:'1rem 0'
    }, 
    voteState:{
        borderRadius:' 0.5rem',
        boxShadow:'-.1rem -.1rem .6rem #c1c1c1',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0rem'
    },
    voteIcon:{
        position:'absolute',
        right:'-.7rem',
        top:'-.7rem',
    }
}))
function AnswQuestionsPage (props){
        const classes = useStyles()

        const {question , users, authedUser} = props
        const {author , optionOne , optionTwo , id} = question
        // setTimeout(() => {
        //     console.log(users[authedUser].answers[id] === 'optionTwo')
        // }, 1500);
        
        return (

            <Box    mr={'15%'} ml={'15%'}  mt={'5%'} style={{border:'.1rem solid #e1e1e1', boxShadow:'-.1rem -.1rem .4rem #e1e1e1'}}
                    borderRadius='.2rem' display='flex' flexDirection='column' p={.5} mb={2}> 

                {/* { Header } */}
                <Box style={{backgroundColor:'#e9e9e9', borderRadius:'.4rem'}} p={1}  display='flex' alignItems='center'>
                    <Avatar alt='User Image' src={users[author].avatarURL} style={{marginRight:'1rem'}} />
                    <Typography  variant='body1' component='p' >{`${users[author].name} asked`}</Typography>
                </Box>

                <Box display='flex' alignItems='center' justifyContent='space-around' >

                    {/*Avatar*/}
                    <Box>
                        <Avatar className={classes.large} alt='User Image' src={users[author].avatarURL} />
                    </Box>

                    <Box  style={{height:'6rem' , border:'.1px solid #e1e1e1',}}></Box>

                    {/*Qustion info*/}
                    <Box  height='15rem' display='flex' flexDirection='column' justifyContent='space-around' alignItems='center'   p={2}> 

                        <Typography variant='h4' component='h4' >Results</Typography>

                        {/* {Question Votes detailes} */}
                        <Box style={{border:'.1rem solid #f1f1f1' }} borderRadius=' 0.5rem' position='relative' width='18.5rem' textAlign='center'>
                            
                            <QuestionVotes id={id} optionText={`${optionOne.text}?`} optionVotes={optionOne.votes.length}/>

                            {/* {Question Vote state} */}
                            {users[authedUser].answers[id] === 'optionOne' 
                                ?   <Box className={classes.voteState}  >
                                        <Box className={classes.voteIcon} > <VerifiedUserIcon/> </Box>
                                    </Box>
                                : null }                                        
                        </Box>

                        <Box    style={{border:'.1rem solid #f1f1f1' }} borderRadius=' 0.5rem' position='relative' width='18.5rem' textAlign='center'>
                            <QuestionVotes id={id} optionText={`${optionTwo.text}?`} optionVotes={optionTwo.votes.length}/>

                            {users[authedUser].answers[id] === 'optionTwo' 
                                ?   <Box className={classes.voteState}  >
                                        <Box className={classes.voteIcon} > <VerifiedUserIcon/> </Box>
                                    </Box>
                                : null }
                        </Box>
                    </Box>
                </Box>
            </Box>
           
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