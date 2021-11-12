import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';

class QustionsPage extends Component {

    render() {
        // const { optionOne ,optionTwo , id} = this.props.question
        // console.log(this.props.id)
        console.log(this.props.question) 

        return (
            <div className='questions-container'> 
                <Box component='div' display="flex" flexDirection='column' justifyContent='center' alignItems='center' m={1} p={1} style={{border:'2px solid #3F51B5'}}>                    
                    <Typography variant='h5' component='h5'  style={{marginBottom:'1.2rem'}}>Would You Rather</Typography>

                    <Typography variant='body1' component='p' paragraph>{`none}`}</Typography>
                    <Typography variant='body1' component='p' paragraph>Or...</Typography>
                    <Typography variant='body1' component='p' paragraph>{`none`}</Typography>
                </Box>
               
            </div>
        )
    }
}

function mapStateToProps ({questions, users, authedUser }, {id}) {

    const question = questions[id];
    return {
       question,
       
    }
}
export default connect(mapStateToProps)(QustionsPage)