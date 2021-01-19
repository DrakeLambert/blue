import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import React from 'react'
import FullWidthButton from '../../Components/FullWidthButton'

const JobTypePicker = ({ jobTypes, onSelect }) => {
	if (!jobTypes) {
		return <Alert variant='warning'>No room types available.</Alert>
	}
	return <>
		<h4>Choose your room type:</h4>
		{jobTypes.map(jobType =>
			<Card key={jobType.type} className='mb-2'>
				<Card.Body>
					<Card.Title>{jobType.displayName} {jobType.emoji}</Card.Title>
					<Card.Text>{jobType.description}</Card.Text>
					{jobType.active
						? <FullWidthButton variant='primary' onClick={_ => onSelect(jobType)}>Renovate the {jobType.displayName}!</FullWidthButton>
						: <FullWidthButton variant='warning' disabled>Under Construction!</FullWidthButton>
					}
				</Card.Body>
			</Card>
		)}
	</>
}

export default JobTypePicker