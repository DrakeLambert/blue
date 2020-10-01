import React from 'react'
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { routes } from '..'

const QuoteYourJobRouter = () => {
	const routeMatch = useRouteMatch()

	return <Switch>
		<Route path={`${routeMatch.path}/:roomType`} component={QuoteYourJob} />
		<Route path='/'>
			<Redirect to={routes.chooseJobType} />
		</Route>
	</Switch>
}

const QuoteYourJob = () => {
	const roomType = useParams().roomType

	return <div>You've choosen room type: {roomType}</div>
}

export default QuoteYourJobRouter