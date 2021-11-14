import React, { Component, Fragment } from 'react'
import {Navigate,Routes , Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Navigation from './Navigation'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import UnAnswQuestion from './UnAnswQuestion'
import QuestionsPage from './QuestionsPage'
import AnsweredQuestionsPage from './AnsweredQuestionsPage'

class App extends Component {

  state={
    questionID:null
  }
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  questionID = (id) => {
      this.setState({
          questionID: id
      })
  }

  render() {
    const {authedUser} = this.props

    return (
        <div>
          <LoadingBar />  
          <Navigation />
          <div className='app-container' >

                  <Routes>         
                    {authedUser === null  ? (
                      <Fragment>
                        <Route path='/' element={ <SignIn />} /> 
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Route path='/' element={ <Dashboard questionID={this.questionID} /> } />
                        <Route path='/unansweredquestion/:id' element={ <QuestionsPage id={this.state.questionID}/> } />
                        <Route path='/answeredquestion/:id' element={ <AnsweredQuestionsPage id={this.state.questionID}/> } />
                      </Fragment>
                    )}          
                  </Routes>                          
          </div>
        </div>
    
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser,
  }
}
export default connect(mapStateToProps)(App)

