import React from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import FullWidthButton from '../../Components/FullWidthButton'

export default props => {
	const {
		quote
	} = props

	const history = useHistory()
	const handleQuoteDifferentJob = useCallback(() => {
		history.push('/quote')
	}, [history])

	return <>
		<h4>There was an issue generating your quote 😢</h4>
		<p>{quote.description}</p>
		<FullWidthButton onClick={handleQuoteDifferentJob}>
			Quote a Different Job
		</FullWidthButton>
	</>
}