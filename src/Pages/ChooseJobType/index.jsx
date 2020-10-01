import React from 'react'
import JobTypePicker from './JobTypePicker'
import roomTypes from '../../ExternalData/room-types.json'

const ChooseJobType = () => {

	

	return <JobTypePicker roomTypes={roomTypes} onSelect={roomType => console.log(roomType)} />
}

export default ChooseJobType