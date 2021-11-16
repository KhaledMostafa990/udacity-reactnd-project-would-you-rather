import React from 'react'
import { connect } from 'react-redux'

export const LeaderBoard = (props) => {
    return (
        <>
        </>
    )
}

const mapStateToProps = ({authedUser, users}) => ({
    authedUser,
    users,
    
})


export default connect(mapStateToProps)(LeaderBoard)
