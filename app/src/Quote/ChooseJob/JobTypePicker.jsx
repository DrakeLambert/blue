import React from 'react'
import FullWidthButton from '../../Components/FullWidthButton'

const JobTypePicker = ({ jobTypes, onSelect }) => {
	if (!jobTypes) {
		return <div className='alert alert-warning' role='alert'>
			No job types available!
		</div>
	}
	return <>
		<h4>Choose your job type:</h4>
		{jobTypes.map(jobType =>
			<div className='card mb-2' key={jobType.type}>
				<div className='card-body'>
					<h5 className='card-title'>{jobType.displayName} {jobType.emoji}</h5>
					<p className='card-text'>{jobType.description}</p>
					{jobType.active
						? <FullWidthButton variant='primary' onClick={_ => onSelect(jobType)}>Renovate the {jobType.displayName}!</FullWidthButton>
						: <FullWidthButton variant='warning' disabled>Under Construction!</FullWidthButton>
					}
				</div>
			</div>
		)}
	</>
}

export default JobTypePicker