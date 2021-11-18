import React, { Component, Fragment } from 'react'
import {Routes , Route , Navigate} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Navigation from './Navigation'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import NotFound from './NotFound'
import UnAnswQuestionsPage from './questions/UnAnswQuestionsPage'
import AnswQuestionsPage from './questions/AnswQuestionsPage'
import AddQuestion  from './questions/AddQuestion'
import LeaderBoard from './LeaderBoard'



class App extends Component {
  /**
   * ** Main 
   * - Getting the initial data from redux store (users, questions) ./_DATA
   * - the home route ./ showing SingIn and Navgation Comp as long as the user does not singIn
   * - If sing in ./ showing the the Answ Q and UnAnsw Q inside the Dashboard Comp and the Nav showing the user name and avatar
   * - the question Id in the state comes when user clicks to any question from Questions Comp
   * - ./addQuestion route showing Comp to add new question to UnAnsw Q 
   * - ./leaderBoard route showing users ordered in descending order based on questions they've asked + they've answered
   * - NotFound route (*) in react router v6
   */
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
    const theme = createTheme()
    const {authedUser} = this.props

    return (
        <ThemeProvider theme={theme}>
          <LoadingBar />  
          <Navigation />
              <Routes>         
                {authedUser === null  ? (
                  <Fragment>
                    <Route path='/' element={ <SignIn />} /> 
                    <Route path='/addquestion' element={<Navigate to='/' /> } />
                    <Route path='/leaderboard' element={<Navigate to='/' /> } />
                    
                    <Route path='*'  element={ <NotFound /> } />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Route path='/' element={ <Dashboard questionID={this.questionID} /> } />
                    {/* We can show the questions components in one route but I think the following better*/}
                    <Route path='/unansweredquestion/:id' element={ <UnAnswQuestionsPage id={this.state.questionID}/> } />
                    <Route path='/answeredquestion/:id' element={ <AnswQuestionsPage id={this.state.questionID}/> } />
                    <Route path='/addquestion' element={<AddQuestion id={this.state.questionID} />} />
                    <Route path='/leaderboard' element={<LeaderBoard />} />
                    
                    <Route path='*' element={ <NotFound /> } />
                  </Fragment>
                )}          
              </Routes>                            
        </ThemeProvider>
    
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser,
  }
}
export default connect(mapStateToProps)(App)

