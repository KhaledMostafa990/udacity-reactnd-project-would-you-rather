import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Typography  from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import WhereToVoteIcon from '@material-ui/icons/WhereToVote'
import Avatar  from '@material-ui/core/Avatar'


function Questions (props){
    /** Questions
     * - Answ or UnAnsw questions pages appearing depending on question id that users clicked on
     */
    const classes = useStyles()
    
    const {question , users} = props
    const {author , optionOne , id} = question

        return (
            <Box style={{border:'.1rem solid #e1e1e1', boxShadow:'-.1rem -.1rem .4rem #e1e1e1'}}  borderRadius='.2rem' display='flex' flexDirection='column' p={.5} mb={2}> 

                {/* { Questions Header } */}
                <Box style={{backgroundColor:'#e9e9e9', borderRadius:'.4rem'}} p={1}  display='flex' alignItems='center'>
                    <Avatar alt='User Image' src={users[author].avatarURL} style={{marginRight:'1rem'}} />
                    <p>{`${users[author].name} asks`}</p>
                </Box>

                
                <Box  display='flex' alignItems='center' justifyContent='space-around'>
                    {/* {Avatar} */}
                    <Box>
                        <Avatar className={classes.large} alt='User Image' src={users[author].avatarURL} />
                    </Box>

                    <Box  style={{height:'6rem' , border:'.07rem solid #e1e1e1',}}></Box>

                    {/* { Questions Info have a route name props to question page} */}
                    <Box width='18.5rem' height='10rem' display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' p={2} >

                        <Typography variant='h5' style={{marginBottom:'1rem'}}>Would You Rather</Typography>

                        <p>{`${optionOne.text}`}</p>
                        <p>or...</p>
                     
                        <Link to={`${props.route + id}`}>
                            <Button onClick={()=> props.questionID(id)} variant='contained' color='primary'
                                endIcon={<WhereToVoteIcon />}>{props.btn}</Button>
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

const useStyles = makeStyles((theme)=> ({
    large:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin:'1rem 0'
    },
}))
export default connect(mapStateToProps)(Questions)