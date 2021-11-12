import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

class UnAnswQuestion extends Component {
    render() {
        const {author , optionOne , id} = this.props.question
        console.log(author)
        console.log(this.props.question.id)
        return (
            <div className='questions-container'> 
                <Box component='div' display="flex" flexDirection='column' justifyContent='center' alignItems='center' m={1} p={1} style={{border:'2px solid #3F51B5'}}>                    
                    <Typography variant='h5' component='h5'  style={{marginBottom:'1.2rem'}}>Would You Rather</Typography>

                    <Typography variant='body1' component='p' paragraph>{`${optionOne.text}`}</Typography>
                    <Typography variant='body1' component='p' paragraph>Or...</Typography>
                
                    <Link to={`/question/${id}`} ><Button onClick={()=> this.props.questionID(id)} variant='outlined' color='primary'>View And Vote</Button></Link>
                </Box>
            </div>
        )
    }
}
function mapStateToProps ({questions} , {id}) {

    const question = questions[id];
    return {
       question,
    }
}
export default connect(mapStateToProps)(UnAnswQuestion)