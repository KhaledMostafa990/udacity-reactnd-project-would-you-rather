import {
    _getUsers,
    _getQuestions,
    _saveQuestionAnswer,
    _saveQuestion
} from './_DATA'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function handleSaveAnswer (authedUser, qid, answer) {
  // console.log(authedUser, qid, answer)
  return _saveQuestionAnswer(authedUser, qid, answer)
}

export function handleSaveQuestion(question){
  // console.log(question)
  return _saveQuestion(question)
} 