import {RECEIVE_QUSTIONS} from '../actions/questions'

export default function questions(state={}, action) {
    switch (action.type) {
        case RECEIVE_QUSTIONS:

            return {
                ...state,
                ...action.questions,
            }
            
        default:
            return state
    }
}