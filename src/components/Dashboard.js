import React, { Component } from 'react'
import { connect } from 'react-redux'

import Questions from './questions/Questions'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

class Dashboard extends Component {
    /** Dshboard
     * - Getting the Answ Q and UnAbsw Q from redux store and showing them in order by the recently added
     * - UnAnsw Q appearing by default and navigating between them depending on user clicks on taps
     */
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
        // console.log(unAnswQuestion.length)
        return (
            <>
            <Box style={{border:'.1rem solid #e1e1e1', boxShadow:'-.1rem -.1rem .6rem #e1e1e1'}}  borderRadius='.2rem' mr={'15%'} ml={'15%'}  mt={'5%'} > 

                    {/* { Tabs } */}
                    <Paper square >
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

                    {/* { Questions } */}
                    <Box p={'2rem'}>
                        { showUnAnsw === true 
                            ? unAnswQuestion.map((id)=>(
                                <div key={id}>
                                    <Questions route={`unanswered/`} questionID={this.props.questionID} id={id} btn={'View And Vote'}/>
                                </div> ))
                            :
                            answQuestion.map((id)=>(
                                <div key={id}>
                                    <Questions route={`answered/`} questionID={this.props.questionID} id={id} btn={'View votes'}/>
                                </div> ))
                        }
                    </Box>
            </Box>
            <Box style={{fontSize: 12, textAlign: 'center'}} position='relative' bottom='-5rem' right>
                    Development by <a href="https://github.com/KhaledMostafa990" target="blank" >Khaled Farghly </a>.
            </Box>
            </>
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