export const RECEIVE_QUSTIONS = 'RECEIVE_QUSTIONS'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUSTIONS,
        questions,
        
    }
}