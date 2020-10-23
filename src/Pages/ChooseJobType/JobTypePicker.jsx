import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import React from 'react'
import FullWidthButton from '../../Components/FullWidthButton'

const JobTypePicker = ({roomTypes, onSelect}) => {
	if (!roomTypes) {
		return <Alert variant='warning'>No room types available.</Alert>
	}
	return <>
		<h4>Choose your room type:</h4>
		{roomTypes.map(roomType =>
			<Card key={roomType.type} className='mb-2'>
				<Card.Body>
					<Card.Title>{roomType.displayName}</Card.Title>
					<Card.Text>{roomType.description}</Card.Text>
					{roomType.active
						? <FullWidthButton variant='primary' onClick={_ => onSelect(roomType)}>Renovate the {roomType.displayName}!</FullWidthButton>
						: <FullWidthButton variant='warning' disabled>Under Construction!</FullWidthButton>
					}
				</Card.Body>
			</Card>
		)}
	</>;
}

export default JobTypePicker