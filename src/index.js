import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

import {BrowserRouter as Router} from 'react-router-dom'

import App from './components/App'

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store} >
        <Router>
            <App />
        </Router>
    </Provider>,
document.getElementById('root')
)