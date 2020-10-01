import React, { useCallback } from 'react'
import JobTypePicker from './JobTypePicker'
import roomTypes from '../../ExternalData/room-types.json'
import {  useHistory } from 'react-router-dom'
import { routes } from '..'

const ChooseJobType = () => {
	const history = useHistory()

	const handleOnSelect = useCallback(
		roomType => {
			history.push(routes.quoteYourJob + '/' + roomType.type)
		},
		[history])

	return <JobTypePicker roomTypes={roomTypes} onSelect={handleOnSelect} />
}

export default ChooseJobType