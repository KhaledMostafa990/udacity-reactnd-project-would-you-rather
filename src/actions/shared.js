import { getInitialData } from '../utils/api'
import { handleSaveAnswer } from "../utils/api"
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import {showLoading, hideLoading} from 'react-redux-loading'
export const SAVE_ANSWER_QUSTION = 'SAVE_ANSWER_QUSTION '


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
        return handleSaveAnswer(info)
            .then(()=> {
                dispatch(saveAnswer(info))
            })
    }
}
