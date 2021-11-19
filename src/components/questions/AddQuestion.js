import React , {useState} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { saveQuestion } from '../../actions/shared'
import { useNavigate } from 'react-router'
import Box  from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({

    input:{
        marginTop:'2rem',
        width:'100%'
    },
    btn:{
        marginTop:'2rem',
        width:'100%'
    }
})
function AddQuestion(props) {
    /** AddQuestion
     * - saveQuestion method is an action creator using handleSaveQuestion method to fromat new question and update the state by adding new question to signed-in user 
     */
    const [optionOneText, setoptionOne] = useState()
    const [optionTwoText, setoptionTwo] = useState()
    const navigate = useNavigate()
    const classes = useStyles();


    const addQuestion = (e) => {
        e.preventDefault()
        const {dispatch, authedUser} = props
        console.log(optionOneText, optionTwoText, authedUser)

        dispatch(saveQuestion(optionOneText, optionTwoText ,authedUser))
        navigate('/')
    }

    return (
        <Box   mr={'15%'} ml={'15%'}  mt={'5%'} style={{border:'.1rem solid #e1e1e1', boxShadow:'-.1rem -.1rem .4rem #e1e1e1'}} 
            borderRadius='.2rem' display='flex' flexDirection='column' p={.5} mb={2}>
            
                <Typography align='center' variant='h4' >Create New Question</Typography> 
                <Box style={{border:'.07rem solid #c9c9c9', width:'100%'}} m='1rem 0'></Box>

                <Typography align='left' variant='h6' gutterBottom>Would You rather...</Typography>              

                <form onSubmit={addQuestion} >
                    <Box display='flex' flexDirection='column' alignItems='center' mb='2rem'>
                        <TextField onChange={(e)=> setoptionOne(e.target.value)} label="optionOne" size="small"
                            id="optionOne"
                            defaultValue=""
                            variant="outlined"  
                            required     
                            className={classes.input}
                            />

                        <TextField onChange={(e)=> setoptionTwo(e.target.value)} label="optionTwo" size="small"
                            id="optionTwo"
                            defaultValue=""
                            variant="outlined"
                            required                              
                            className={classes.input}
                            />

                        <Button type='submit' className={classes.btn} variant='contained' color='primary'>Create</Button>
                    </Box>
                </form>           
        </Box>
    )
}

function mapStateToProps({authedUser}) {

    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(AddQuestion)
