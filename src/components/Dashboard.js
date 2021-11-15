import React, { Component } from 'react'
import { connect } from 'react-redux'
import UnAnswQuestion from './UnAnswQuestion'
import AnsweredQuestion from './AnsweredQuestion'
import Container  from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

class Dashboard extends Component {
    state ={
        value:0,
        showUnAnsw:true,
    }
    componentDidMount(){
        this.setState({
            value:0,
            showUnAnsw:true,
        })
    }
    handleChange = (event, newValue) => {

        if(newValue === 0){
            this.setState({
                value:0,
                showUnAnsw:true,
            })
        }else if (newValue === 1){
            this.setState({
                value:1,
                showUnAnsw:false,
            })
        }
    };

    render() {
        const { unAnswQuestion , answQuestion } = this.props
        const { showUnAnsw, value} = this.state
        
        return (
            <Container maxWidth='sm' style={{marginTop:'4rem', border:'4px solid #f1f1f1', borderRadius:'2px', padding:'0'}}> 
                    <Paper  square >
                        <Tabs  
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab icon={<LiveHelpIcon />} style={{width:'100%'}} label="UnAnswered Question" />
                            <Tab icon={<QuestionAnswerIcon />} style={{width:'100%'}} label="Answered Question" />
                        </Tabs>
                    </Paper>
                    <Container style={{padding:'2rem'}}>
                        { showUnAnsw === true 

                            ? unAnswQuestion.map((id)=>(
                                <div key={id}>
                                    <UnAnswQuestion questionID={this.props.questionID} id={id}/>
                                </div> ))
                            :
                            answQuestion.map((id)=>(
                            <div key={id}>
                                <AnsweredQuestion questionID={this.props.questionID} id={id}/>
                            </div> ))
                        }
                    </Container>
            </Container>
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