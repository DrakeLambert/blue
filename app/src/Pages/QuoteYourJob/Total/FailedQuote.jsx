import React from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../..'
import FullWidthButton from '../../../Components/FullWidthButton'

export default props => {
	const {
		quote
	} = props

	const history = useHistory()
	const handleQuoteDifferentRoom = useCallback(() => {
		history.push(routes.chooseJobType)
	}, [history])

	return <>
		<h4>There was an issue generating your quote 😢</h4>
		<p>{quote.description}</p>
		<FullWidthButton color='primary' onClick={handleQuoteDifferentRoom}>
			Quote a Different Room
		</FullWidthButton>
	</>
}