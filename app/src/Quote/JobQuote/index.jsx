import React, { useEffect, useState } from 'react'
import Loader from '../../Components/Loader'
import FailedQuote from './FailedQuote'
import getQuote from './GetQuote'
import SuccessfulQuote from './SuccessfulQuote'

export default ({ jobDetails, jobType, onLockIn }) => {
	const [quote, setQuote] = useState()
	useEffect(() => {
		(async () => {
			const quote = await getQuote(jobDetails)
			setQuote(quote)
		})()
	}, [jobDetails, setQuote])

	switch (quote?.success) {
		case true:
			return <SuccessfulQuote quote={quote} jobDetails={jobDetails} jobType={jobType} onLockIn={onLockIn} />
		case false:
			return <FailedQuote quote={quote} />
		default:
			return <Loader />
	}
}
