import React from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ChooseJobType from './ChooseJobType'
import LockInQuote from './LockInQuote'
import QuoteYourJob from './QuoteYourJob'

export const routes = {
	chooseJobType: '/choose-job-type',
	quoteYourJob: '/quote-your-job',
	lockInQuote: '/lock-in-your-quote'
}

const App = () =>
	<Router>
		<Container className='pt-3'>
			<Switch>
				<Route path={routes.chooseJobType} component={ChooseJobType} />
				<Route path={routes.quoteYourJob} component={QuoteYourJob} />
				<Route path={routes.lockInQuote} component={LockInQuote} />
				<Route path='/'>
					<Redirect to={routes.chooseJobType} />
				</Route>
			</Switch>
		</Container>
	</Router>

export default App