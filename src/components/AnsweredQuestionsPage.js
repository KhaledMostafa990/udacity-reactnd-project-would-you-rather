import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Avatar  from '@material-ui/core/Avatar'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 4,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme)=> ({
    root: {
        flexGrow: 1,
    },
    container:{
        hieght:'100%',
        border:'2px solid #c1c1c1',
        borderRadius:'.6rem',
        display:'flex',
        flexDirection:'column',
        marginTop:'4rem'
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
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',  
    },
    questionInfo:{
        display:"flex",
        flexDirection:'column',
        justifyContent:'center',
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
function AnsweredQuestionsPage (props){
        const classes = useStyles()

        const {question , users} = props
        const {author , optionOne , optionTwo , id} = question

        return (
            <Container maxWidth='sm' >
            <Box  className={classes.container} fullWidth> 
                <Box className={classes.header}>
                    <Avatar alt='User Image' src={users[author].avatarURL} style={{marginRight:'1rem'}} />
                    <Typography  variant='body1' component='p' >{`${users[author].name} asked`}</Typography>
                </Box>

                <Box className={classes.questionContainer} >
                    {/*Avatar*/}
                    <Box>
                        <Avatar className={classes.large} alt='User Image' src={users[author].avatarURL} />
                    </Box>

                    <Box  style={{height:'100%'}}>
                        <Typography variant='body1' component='span' className={classes.hr}></Typography>
                    </Box>
                    
                    {/*Qustion*/}
                    <Box className={classes.questionInfo} p={2}> 

                        <Typography variant='h4' component='h4'  style={{marginBottom:'1rem'}}>Results</Typography>

                        <Box className={classes.question}>
                            <Typography variant='body1' component='p' >{`${optionOne.text}?`}</Typography>
                                <Box >
                                    <BorderLinearProgress variant="determinate" 
                                        value={ optionOne.votes.length / 3 * 100  || 0 } />
                                </Box>
                            <Typography variant='body1' component='p' >{`${optionOne.votes.length} from 3`}</Typography>
                        </Box>

                        <Box className={classes.question}>
                            <Typography variant='body1' component='p' >{`${optionTwo.text}?`}</Typography>
                                <Box >
                                    <BorderLinearProgress variant="determinate" 
                                        value={ optionTwo.votes.length / 3 * 100  || 0 } />
                                </Box>
                            <Typography variant='body1' component='p' >{`${optionTwo.votes.length} from 3`}</Typography>
                        </Box>
                        
                    
                    </Box>
                </Box>
            </Box>
            </Container>
        )
}
function mapStateToProps ({questions, users} , {id}) {

    const question = questions[id];
    return {
       question,
       users,
    }
}
export default connect(mapStateToProps)(AnsweredQuestionsPage)