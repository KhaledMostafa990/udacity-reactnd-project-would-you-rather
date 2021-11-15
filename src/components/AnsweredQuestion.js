import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import WhereToVoteIcon from '@material-ui/icons/WhereToVote'
import Avatar  from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=> ({
    container:{
        hieght:'100%',
        border:'4px solid #f1f1f1',
        borderRadius:'1rem',
        display:'flex',
        flexDirection:'column',
        marginBottom:'2rem'
    },
    header:{
        backgroundColor:'#f4f4f4',
        padding:'.6rem',
        hieght:'5rem',
        display:'flex',
        alignItems:'center'
    },
    qDetails:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',  
    },
    hr:{
        display:'block',
        height:'6rem',
        border:'.1px solid #999',
    },
    large:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin:'1rem 0'
    },
}))
function AnsweredQuestion (props){
        const classes = useStyles()

        const {question , users} = props
        const {author , optionOne , id} = question

        return (
            <Box  className={classes.container} fullWidth> 
                <Box className={classes.header}>
                    <Avatar alt='User Image' src={users[author].avatarURL} style={{marginRight:'1rem'}} />
                    <Typography  variant='body1' component='p' >{`${users[author].name} asks`}</Typography>
                </Box>

                <Box className={classes.qDetails} >
                    <Box>
                        <Avatar className={classes.large} alt='User Image' src={users[author].avatarURL} />
                    </Box>

                    <Box  style={{height:'100%'}}>
                        <Typography variant='body1' component='span' className={classes.hr}></Typography>
                    </Box>

                    <Box component='div' display="flex" flexDirection='column' justifyContent='center' alignItems='center' m={1} p={1}>                    
                        <Typography variant='h5' component='h5'  style={{marginBottom:'1.2rem'}}>Would You Rather</Typography>

                        <Typography variant='body1' component='p' paragraph>{`${optionOne.text}`}</Typography>
                        <Typography variant='body1' component='p' paragraph>Or...</Typography>
                    
                        <Link to={`/answeredquestion/${id}`} >
                            <Button onClick={()=> props.questionID(id)} variant='outlined' color='primary' endIcon={<WhereToVoteIcon />}>View polls</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        )
}
function mapStateToProps ({questions, users} , {id}) {

    const question = questions[id];
    return {
       question,
       users,
    }
}
export default connect(mapStateToProps)(AnsweredQuestion)