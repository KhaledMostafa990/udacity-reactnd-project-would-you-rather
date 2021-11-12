import React, { Component } from 'react'
import { connect } from 'react-redux'
import UnAnswQuestion from './UnAnswQuestion'
import AnswQuestion from './AnswQuestion'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Box from '@material-ui/core/Box'

class Dashboard extends Component {
    state ={
        showUnAnsw:true,
    }
    showUnAnswQ = ()=> {
        this.setState({
            showUnAnsw: true
        })
    }
    showAnswQ = ()=> {
        this.setState({
            showUnAnsw: false
        })
    }

    render() {

        const { unAnswQuestion , answQuestion } = this.props
        const { showUnAnsw} = this.state
        // console.log(this.props.questions)
        return (
            <div> 
                <Box style={{marginTop:'3rem' , border:'2px solid #3F51B5'}}>
                    <ButtonGroup >
                        <Button onClick={this.showUnAnswQ} variant='contained' color='primary'>UnAnswered Question</Button>
                        <Button onClick={this.showAnswQ} variant='contained' color='primary'>Answered Question</Button>
                    </ButtonGroup>
                </Box>
                    {showUnAnsw === true ?
                    
                        unAnswQuestion.map((id)=>(
                            <div key={id}>
                                <UnAnswQuestion questionID={this.props.questionID} id={id}/>
                            </div> ))
                    :
                        answQuestion.map((id)=>(
                        <div key={id}>
                            <AnswQuestion id={id}/>
                        </div> ))
                    }
   
            </div>
        )
    }
}

function mapStateToProps ({questions , authedUser , users  }) {

    return {
        authedUser,
        questions,
        users,
        unAnswQuestion:
        Object.keys(questions).filter((id)=> (
            !users[authedUser].answers.hasOwnProperty(id)
        )),

        answQuestion:
        Object.keys(questions).filter((id)=> (
            users[authedUser].answers.hasOwnProperty(id)
        ))
    }
 
}
export default connect(mapStateToProps)(Dashboard)