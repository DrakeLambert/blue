import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { trackPageView } from './analytics'
import Quote from './Quote'

const Workflows = () =>
  <div className='container py-2'>
    <Router>
      <Switch>
        <Route path='/quote'>
          <Quote />
        </Route>
        <Route path='/'>
          <Redirect to='/quote' />
        </Route>
      </Switch>
    </Router>
  </div>

const reactContainer = document.getElementById('app')
ReactDOM.render(<Workflows />, reactContainer)

trackPageView()
