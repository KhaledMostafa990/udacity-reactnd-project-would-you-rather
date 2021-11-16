import React , {useState} from 'react'
import { connect } from 'react-redux'
import { makeStyles ,createStyles , Theme} from '@material-ui/core/styles'
import { saveQuestion } from '../../actions/shared'
import { useNavigate } from 'react-router'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container  from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    container:{
        hieght:'100%',
        border:'2px solid #c1c1c1',
        borderRadius:'.6rem',
        display:'flex',
        flexDirection:'column',
        marginTop:'4rem'
    },
    hr:{
    border:'1px solid #c1c1c1',
    width:'100%',
    margin:'1rem 0'
    },
    inputs:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginBottom:'2rem'
    },
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
        <Container maxWidth='sm' className={classes.container} >
            

                <Typography align='center' variant='h4' component='h5'>Create New Question</Typography>              
                <Typography align='center' component='span' className={classes.hr}></Typography>

                <Typography align='left' variant='h6' component='p'  gutterBottom>Would You rather...</Typography>              

                <form onSubmit={addQuestion} >
                <Grid className={classes.inputs}>
                    <TextField onChange={(e)=> setoptionOne(e.target.value)} label="optionOne" size="small"
                        id=""
                        defaultValue=""
                        variant="outlined"  
                        required     
                        className={classes.input}     
                        />


                    <TextField onChange={(e)=> setoptionTwo(e.target.value)} label="optionTwo" size="small"
                        id=""
                        defaultValue=""
                        variant="outlined"
                        required                              
                        className={classes.input}
                        />

                    <Button type='submit' className={classes.btn} variant='contained' color='primary'>Create</Button>
                </Grid>
                </form>
           
        </Container>
    )
}

function mapStateToProps({authedUser}, {id}) {

    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(AddQuestion)
