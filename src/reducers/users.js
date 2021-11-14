import { RECEIVE_USERS } from '../actions/users'
import { SAVE_ANSWER_QUSTION } from '../actions/shared'

export default function users(state={}, action) {
    switch (action.type) {
        case RECEIVE_USERS:

            return {
                ...state,
                ...action.users,
            }

        case SAVE_ANSWER_QUSTION:
            const {authedUser, qid, answer} = action
            return {
                ...state,
                [authedUser]:{
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
                
             
            }
            
        default:
            return state
    }
}