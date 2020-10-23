import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import FailedQuote from './FailedQuote'
import getQuote from './getQuote'
import SuccessfulQuote from './SuccessfulQuote'

export default ({ roomDetails }) => {
	const [quote, setQuote] = useState()
	useEffect(() => {
		if (roomDetails) {
			(async () => {
				const quote = await getQuote(roomDetails)
				setQuote(quote)
			})()
		}
	}, [roomDetails, setQuote])

	if (!roomDetails) {
		return <Redirect to='/' />
	}

	switch (quote?.success) {
		case true:
			return <SuccessfulQuote quote={quote} roomType={roomDetails.roomType} />
		case false:
			return <FailedQuote quote={quote} />
		default:
			return <h4>Loading...</h4>
	}
}
