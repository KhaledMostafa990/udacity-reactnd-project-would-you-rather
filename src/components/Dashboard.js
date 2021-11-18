import React, { Component } from 'react'
import { connect } from 'react-redux'
import Questions from './questions/Questions'
import Container  from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

class Dashboard extends Component {
    state ={
        value:0,
        showUnAnsw:true,
        answeredRoute:`/answeredquestion/`,
        unAnsweredRoute:`/unansweredquestion/`,

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
        const {answeredRoute, unAnsweredRoute , showUnAnsw, value} = this.state
        // console.log(unAnswQuestion.length)
        return (
            <Container maxWidth='sm' style={{marginTop:'4rem', border:'2px solid #c1c1c1', borderRadius:'.3rem', padding:'0'}}> 
                    <Paper justifyContent='space-between' square >
                        <Tabs centered
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
                                    <Questions route={unAnsweredRoute} questionID={this.props.questionID} id={id} btn={'View And Vote'}/>
                                </div> ))
                            :
                            answQuestion.map((id)=>(
                                <div key={id}>
                                    <Questions route={answeredRoute} questionID={this.props.questionID} id={id} btn={'View votes'}/>
                                </div> ))
                        }
                    </Container>
            </Container>
        )
    }
}

function mapStateToProps ({questions , authedUser , users}) {

    return {
        authedUser,
        questions,
        users,

        unAnswQuestion:
        Object.keys(questions).filter((id)=> (
            !users[authedUser].answers[id]
        )).sort((a,b) => questions[b].timestamp - questions[a].timestamp),

        answQuestion:
        Object.keys(questions).filter((id)=> (
            users[authedUser].answers[id]
        )).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
 
}
export default connect(mapStateToProps)(Dashboard)