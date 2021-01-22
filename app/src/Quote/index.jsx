import React, { useCallback, useState } from 'react'
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import ChooseJob from './ChooseJob'
import JobDetails from './JobDetails'
import JobQuote from './JobQuote'
import JobQuoteLockedIn from './JobQuoteLockedIn'

const routes = {
	chooseJob: '/chooseJob',
	setJobDetails: '/setJobDetails',
	jobQuote: '/jobQuote',
	jobQuoteLockedIn: '/jobQuoteLockedIn'
}

export default () => {
	const { path, url } = useRouteMatch()
	const history = useHistory()

	const [jobType, setJobType] = useState()
	const handleSelectJobType = useCallback(jobType => {
		setJobType(jobType)
		history.push(url + routes.setJobDetails)
	}, [setJobType, history, url])

	const [jobDetails, setJobDetails] = useState()
	const handleSubmitJobDetails = useCallback(jobDetails => {
		setJobDetails(jobDetails)
		history.push(url + routes.jobQuote)
	}, [setJobDetails, history, url])

	const [jobQuote, setJobQuote] = useState()
	const handleSubmitJobQuote = useCallback((contactInformation, jobQuote) => {
		setJobQuote({ contactInformation, jobQuote })
		history.push(url + routes.jobQuoteLockedIn)
	}, [setJobQuote, history, url])

	return <Switch>
		<Route path={path + routes.chooseJob}>
			<ChooseJob onSelect={handleSelectJobType} />
		</Route>

		<Route path={path + routes.setJobDetails}>
			{jobType == null
				? <Redirect to={url + routes.chooseJob} />
				: <JobDetails jobType={jobType.type} onSubmit={handleSubmitJobDetails} />}
		</Route>

		<Route path={path + routes.jobQuote}>
			{jobDetails == null
				? <Redirect to={url + routes.setJobDetails} />
				: <JobQuote jobDetails={jobDetails} jobType={jobType} onLockIn={handleSubmitJobQuote} />}
		</Route>

		<Route path={path + routes.jobQuoteLockedIn}>
			{jobQuote == null
				? <Redirect to={url + routes.jobQuote} />
				: <JobQuoteLockedIn quoteInformation={jobQuote} />}
		</Route>

		<Route path={path}>
			<Redirect to={url + routes.chooseJob} />
		</Route>
	</Switch>
}