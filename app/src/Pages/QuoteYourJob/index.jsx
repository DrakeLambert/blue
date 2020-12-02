import React, { useCallback, useState } from 'react'
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import Bathroom from './Bathroom'
import FailedQuote from './FailedQuote'
import RoomUnderConstruction from './RoomUnderConstruction'
import SuccessfulQuote from './SuccessfulQuote'
import Total from './Total'

export default () => {
	const { url } = useRouteMatch()

	return <Switch>
		<Route path={url + '/:roomType'}>
			<QuoteYourJobRouter />
		</Route>
	</Switch>
}

const QuoteYourJobRouter = () => {
	const { url, params: { roomType } } = useRouteMatch()

	const [roomDetails, setRoomDetails] = useState()
	const history = useHistory()
	const handleQuote = useCallback(roomDetails => {
		setRoomDetails({
			roomType: roomType,
			...roomDetails
		})
		history.push(url + '/total')
	}, [setRoomDetails, roomType, url, history])

	return <Switch>
		<Route exact path={url + '/details'} >
			<QuoteYourJob onQuote={handleQuote} roomType={roomType} />
		</Route>

		<Route exact path={url + '/total'} >
			<Total roomDetails={roomDetails} />
		</Route>

		<Route exact path={url + '/success'} >
			<SuccessfulQuote />
		</Route>

		<Route exact path={url + '/failure'} >
			<FailedQuote />
		</Route>

		<Route exact path={url} >
			<Redirect to={url + '/details'} />
		</Route>
	</Switch>
}

const QuoteYourJob = ({ onQuote, roomType }) => {
	const RoomTypeQuoter = RoomTypeComponentMap[roomType]
	if (!RoomTypeQuoter) {
		return <RoomUnderConstruction roomType={roomType} />
	}
	return <RoomTypeQuoter onQuote={onQuote} />
}

const RoomTypeComponentMap = {
	'bathroom': Bathroom
}