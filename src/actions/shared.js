import { getInitialData, handleSaveQuestion } from '../utils/api'
import { handleSaveAnswer } from "../utils/api"
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import {showLoading, hideLoading} from 'react-redux-loading'
export const SAVE_ANSWER_QUSTION = 'SAVE_ANSWER_QUSTION '
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users ,questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}

// Save Answer
export function saveAnswer({authedUser, qid, answer}) {
    return {
        type: SAVE_ANSWER_QUSTION,
        authedUser,
        qid,
        answer
    }
}
export function saveQustionAnswered(info) {
    return (dispatch)=> {
        dispatch(showLoading())
        return handleSaveAnswer(info)
            .then(()=> {
                dispatch(saveAnswer(info))
                dispatch(hideLoading())
            })
    }
}

// Save Question
export function saveQuestionAction(question) {
    return {
        type:SAVE_QUESTION,
        question,
    } 
}
export function saveQuestion (optionOneText, optionTwoText, author){
    return (dispatch)=>{
        dispatch(showLoading())
        return handleSaveQuestion({optionOneText , optionTwoText , author})
            .then((question)=>{
                dispatch(saveQuestionAction(question))
                dispatch(showLoading())
            })
    }
}