import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import getQuote from './getQuote'

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

	return <p>{JSON.stringify(quote)}</p>
}