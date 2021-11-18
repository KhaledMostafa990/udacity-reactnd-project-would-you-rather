import React from 'react'
import { connect } from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Avatar  from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme)=> ({
    root: {
        flexGrow: 1,
    },
    container:{
        border:'.2rem solid #c1c1c1',
        borderRadius:'.6rem',
        display:'flex',
        flexDirection:'column',
        marginTop:'4rem',
        height:'100%'
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
        height:'10rem',
        border:'.2rem solid #c1c1c1',
        borderTop:'2rem solid #c1c1c1',
        borderRadius:'1.2rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',  
        margin:'1.5rem'
    },
    questionInfo:{
        height:'80%',
        display:"flex",
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'flex-start',
    },
    questionsDetails:{
        width:'12rem'
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
    questionScore:{
        border:'.2rem solid #c9c9c9',
        height:'60%',
        display:"flex",
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        padding:'.4rem'
    },
}))

function LeaderBoard (props) {

    const classes = useStyles()

    const {users, usersId ,questionsId  } = props

    // console.log( questionsId.filter((id)=>  ( users['khaledfarghly'].questions.includes(id))) )
    function Help () {
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

    const length = Help();

    return (
        
        <Container maxWidth='sm' >
            <Box  className={classes.container}> 

                {usersId.sort( (a,b) => (length.questions(b)+length.answers(b)) - (length.answers(a)+length.questions(a))).map((id) => (
                <Box key={id}  >
                    <Box>
                        
                    </Box>
                    <Box className={classes.questionContainer}>
                        {/*Avatar*/}
                        <Box>
                            <Avatar className={classes.large} alt='User Image' src={users[id].avatarURL} />
                        </Box>
                        
                        {/*Qustions Details*/}
                        <Box className={classes.questionInfo} p={2}> 
                            <Typography  variant='h5' component='h5' >{`${users[id].name}`}</Typography>

                            <Box className={classes.questionsDetails}>
                                    Answered Questions 
                                    <h4 style={{float:'right'}}>
                                        { `${length.answers(id)}` }
                                    </h4>
                            </Box>

                            <Box className={classes.questionsDetails}>
                                    Current Questions 
                                    <h4 style={{float:'right'}}>
                                        {` ${length.questions(id) } `}
                                    </h4>
                            </Box>                        

                        </Box>

                        {/** Score  */}
                        <Box className={classes.questionScore}>
                                <Typography  variant='body1' component='h6' >Score</Typography>
                                <Avatar alt='User Image'  >
                                    {length.answers(id) + length.questions(id)}
                                </Avatar>
                        </Box>

                    </Box>
                </Box>

                ))}
                
            </Box>
        </Container>
    )
}

function mapStateToProps ({questions, users, authedUser}) {
    const usersId = Object.keys(users).map((user) => user)
    const usersID = Object.values(users).map((user) => user)
    const questionsId = Object.keys(questions).map((id) => id)

   

        // console.log( usersID.sort( (a,b) =>  b.questions.length - a.questions.length ))

  

    return {
        authedUser,
        users,
        questionsId,
        usersId,
    }
}

export default connect(mapStateToProps)(LeaderBoard)
