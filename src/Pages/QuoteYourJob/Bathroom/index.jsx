import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { routes } from '../..'
import QuoteForm from './QuoteForm'

export default () => {
	const routeMatch = useRouteMatch()

	return <Switch>
		<Route path={`${routeMatch.path}`} exact component={QuoteForm} />
		<Route path='/'>
			<Redirect to={routes.chooseJobType} />
		</Route>
	</Switch>
}
