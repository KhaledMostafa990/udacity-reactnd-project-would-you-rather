import { RECEIVE_QUSTIONS } from '../actions/questions'
import { SAVE_ANSWER_QUSTION, SAVE_QUESTION } from '../actions/shared'

export default function questions(state={}, action) {
    switch (action.type) {
        case RECEIVE_QUSTIONS:

            return {
                ...state,
                ...action.questions,
            }

            case SAVE_ANSWER_QUSTION:
            const {authedUser, qid, answer} = action
            return {
                ...state,
                [qid]:{   
                   ...state[qid],
                    [answer]: {
                       ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                
                }
            }
            case SAVE_QUESTION:
                return {
                    ...state,
                    [action.question.id]: action.question 
                }
            
        default:
            return state
    }
}