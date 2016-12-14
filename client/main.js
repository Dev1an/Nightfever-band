import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import {ComboBox} from 'meteor/universe:accounts-ui'

render((
    <Router history={browserHistory}>
        <Route path="/" component={ComboBox} />
    </Router>
), document.body)