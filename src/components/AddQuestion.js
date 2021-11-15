import React , {useState} from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles ,createStyles , Theme} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container  from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { saveQuestion } from '../actions/shared'

const useStyles = makeStyles({
    container:{
        border:'1px solid blue',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        margin:'1rem 0',
    },
    inputs:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginBottom:'2rem'
    },
    hr:{
    border:'.1rem solid gray',
    width:'75%',
    margin:'1rem 0'
    },
    btn:{
        marginTop:'1rem'
    }
})
function AddQuestion(props) {
    const [optionOneText, setoptionOne] = useState()
    const [optionTwoText, setoptionTwo] = useState()
    const classes = useStyles();


    const addQuestion = (e) => {
        e.preventDefault()
        const {dispatch, authedUser} = props
        console.log(optionOneText, optionTwoText, authedUser)

        dispatch(saveQuestion(optionOneText, optionTwoText ,authedUser))

    }

    return (
        <Container maxWidth='sm' >
            <Grid container className={classes.container} >

                <Typography variant='h4' component='h4' className={classes.title}>Create New Question</Typography>              
                <Typography component='span' className={classes.hr}></Typography>

                <Typography variant='h5' component='h5' className={classes.title} align='left'>Would You rather..</Typography>              

                <form onSubmit={addQuestion} >
                <Grid item className={classes.inputs}>
                    <TextField
                        onChange={(e)=> setoptionOne(e.target.value)}
                        label="optionOne"
                        size="small"
                        id=""
                        defaultValue=""
                        variant="outlined"  
                        required           
                        />
                    <Typography component='span' className={classes.hr} style={{width:'25%'}} ></Typography>
                    <TextField
                        onChange={(e)=> setoptionTwo(e.target.value)}
                        label="optionTwo"
                        size="small"
                        id=""
                        defaultValue=""
                        variant="outlined"
                        required
                        />
                        <Button type='submit' className={classes.btn} variant='outlined' color='secondary' size='small'>Create</Button>
                </Grid>
                </form>
           </Grid>
        </Container>
    )
}

function mapStateToProps({authedUser}, {id}) {

    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(AddQuestion)
