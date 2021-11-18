import React, { Component, Fragment } from 'react'
import {Routes , Route , Navigate} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import { createTheme, ThemeProvider } from '@material-ui/styles'
import Navigation from './components/Navigation'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import LoadingBar from 'react-redux-loading'
import UnAnswQuestionsPage from './components/questions/UnAnswQuestionsPage'
import AnswQuestionsPage from './components/questions/AnswQuestionsPage'
import AddQuestion  from './components/questions/AddQuestion'
import NotFound from './components/NotFound'
import LeaderBoard from './components/LeaderBoard'

// const theme = createMuiTheme({

// })

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

