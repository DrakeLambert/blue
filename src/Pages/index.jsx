import React from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ChooseJobType from './ChooseJobType'

export const routes = {
	chooseJobType: '/choose-job-type'
}

const App = () =>
	<Router>
		<Container className='pt-3'>
			<Switch>
				<Route path={routes.chooseJobType} component={ChooseJobType} />
				<Route path='/'>
					<Redirect to={routes.chooseJobType} />
				</Route>
			</Switch>
		</Container>
	</Router>

export default App