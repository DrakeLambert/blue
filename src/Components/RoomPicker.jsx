import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import React from 'react'

const RoomPicker = props => {
	if (!props.roomTypes) {
		return <Alert variant='warning'>No room types available.</Alert>
	}
	return <>
		<h4>Choose your room type:</h4>
		{props.roomTypes.map(roomType =>
			<Card key={roomType.type} className='mb-2'>
				<Card.Body>
					<Card.Title>{roomType.displayName}</Card.Title>
					<Card.Text>{roomType.description}</Card.Text>
					{roomType.active
						? <Button variant='primary' onClick={_ => props.onSelect(roomType)}>Renovate the {roomType.displayName}!</Button>
						: <Button variant='warning' disabled>Under Construction!</Button>
					}
				</Card.Body>
			</Card>
		)}
	</>;
}

export default RoomPicker