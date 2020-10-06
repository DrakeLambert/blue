import React from 'react'
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { routes } from '..'
import Bathroom from './Bathroom'
import RoomUnderConstruction from './RoomUnderConstruction'

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

	const RoomTypeQuoter = RoomTypeComponentMap[roomType]
	if (!RoomTypeQuoter) {
		return <RoomUnderConstruction roomType={roomType} />
	}
	return <RoomTypeQuoter />
}

const RoomTypeComponentMap = {
	'bathroom': Bathroom
}

export default QuoteYourJobRouter