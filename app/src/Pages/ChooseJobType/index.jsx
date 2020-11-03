import React, { useCallback } from 'react'
import JobTypePicker from './JobTypePicker'
import roomTypes from './room-types.json'
import { useHistory } from 'react-router-dom'
import { routes } from '..'

export default () => {
	const history = useHistory()

	const handleOnSelect = useCallback(
		roomType => {
			history.push(routes.quoteYourJob + '/' + roomType.type)
		},
		[history])

	return <JobTypePicker roomTypes={roomTypes} onSelect={handleOnSelect} />
}
