import React from 'react'
import { Container } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Quote from './Quote'

const Workflows = () =>
	<Container className='py-2'>
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
	</Container>

const reactContainer = document.getElementById('app')
ReactDOM.render(<Workflows />, reactContainer)
