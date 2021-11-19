import React from 'react'
import { connect } from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar  from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme)=> ({
    large:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin:'1rem 0'
    },
}))

function LeaderBoard (props) {
    /** LeaderBoard
     * - Getting the Question and Users IDs, from the store to show the number of questions the users had answered and  asked
     * - sorting the users in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.
     */
    const classes = useStyles()

    const {users, usersId ,questionsId  } = props

    function AnswerAndQuestionlength () {
        const  answers = (id) => {
            const answers = questionsId.filter((q)=> ( users[id].answers[q] )).length ;
            return answers
        }
        const questions = (id) => { 
            const questions = questionsId.filter((q)=> ( users[id].questions.includes(q))).length
            return questions
        }
        return {
            answers,
            questions
        }
    }

    const length = AnswerAndQuestionlength();

    return (
        
        <Box mr={'15%'} ml={'15%'}  mt={'5%'} style={{border:'.1rem solid #e1e1e1', boxShadow:'-.1rem -.1rem .4rem #e1e1e1'}}
                borderRadius='.2rem' display='flex' flexDirection='column' p={.5} mb={2}> 

            { usersId.sort( (a,b) => (length.questions(b)+length.answers(b)) - (length.answers(a)+length.questions(a))).map((id) => (
            <Box key={id}  >

                <Box 
                    style={{border:'.1rem solid #e1e1e1', boxShadow:'-.1rem -.1rem .4rem #e1e1e1'}}
                    maxheight='100%' display='flex' alignItems='center' borderRadius='1.2rem' m={'.5rem'}>

                    {/*Avatar*/}
                    <Box display='flex' flexBasis='35%' justifyContent='center'>
                        <Avatar className={classes.large} alt='User Image' src={users[id].avatarURL} />
                    </Box>
                    
                    {/*Qustions Details*/}
                    <Box
                        height='8rem'  flexBasis='50%'  display="flex" flexDirection='column'
                        justifyContent='space-around' alignItems='flex-start'> 
                        
                        <Typography  variant='h5' textalign='center'>{`${users[id].name}`}</Typography>

                        <Box  width='70%'>
                                Answered Questions 
                                <h4 style={{float:'right'}}>
                                    { `${length.answers(id)}` }
                                </h4>
                        </Box>

                        <Box  width='70%'>
                                Current Questions 
                                <h4 style={{float:'right'}}>
                                    {` ${length.questions(id) } `}
                                </h4>
                        </Box>                        

                    </Box>

                    {/** Score  */}
                    <Box 
                        style={{border:'.15rem solid #e1e1e1' }} height='8rem' m={1} borderRadius='.8rem' flexBasis='15%'  display='flex'
                        flexDirection='column' justifyContent='space-around' alignItems='center'  >

                            <Typography  variant='body1' component='h6' >Score</Typography>
                            <Avatar alt='User Image' style={{backgroundColor:'#3F51B5'}} >
                                {length.answers(id) + length.questions(id)}
                            </Avatar>
                    </Box>

                </Box>
            </Box>

            ))}
                
        </Box>

    )
}

function mapStateToProps ({questions, users, authedUser}) {
    const usersId = Object.keys(users).map((user) => user)
    const questionsId = Object.keys(questions).map((id) => id)
   
    return {
        authedUser,
        users,
        questionsId,
        usersId,
    }
}

export default connect(mapStateToProps)(LeaderBoard)
