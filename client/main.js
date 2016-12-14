import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'


import {Login} from '/imports/UI/Pages/login'

render((
    <Router history={browserHistory}>
        <Route path="/" component={Login} />
    </Router>
), document.body)