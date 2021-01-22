import React from 'react'
import FullWidthButton from '../../Components/FullWidthButton'
import IncludedServicesExpandableList from '../../Components/IncludedServicesExpandableList'

const JobTypePicker = ({ jobTypes, onSelect }) => {
	if (!jobTypes) {
		return <div className='alert alert-warning' role='alert'>
			No job types available!
		</div>
	}
	return <>
		<h4>Choose your job type:</h4>
		{jobTypes.map(jobType => <JobType jobType={jobType} onSelect={onSelect} key={jobType.type} />)}
	</>
}

export default JobTypePicker

const JobType = ({ jobType, onSelect }) => {

	const includedServices = Array.isArray(jobType.includedServices)
		? <IncludedServicesExpandableList serviceDescriptions={jobType.includedServices} jobTypeName={jobType.type} />
		: null

	return <div className='card mb-2'>
		<div className='card-body'>
			<h5 className='card-title'>{jobType.displayName} {jobType.emoji}</h5>
			<p className='card-text'>{jobType.description}</p>
			{includedServices}
			{jobType.active
				? <FullWidthButton variant='primary' onClick={_ => onSelect(jobType)}>Renovate the {jobType.displayName}!</FullWidthButton>
				: <FullWidthButton variant='warning' disabled>Under Construction!</FullWidthButton>
			}
		</div>
	</div>
}

// const IncludedServices = ({ serviceDescriptions, jobTypeName }) => <div className='mb-3'>
// 	<a className='text-decoration-none' data-bs-toggle='collapse' data-bs-target={'#' + jobTypeName} aria-expanded='false' aria-controls={jobTypeName}>
// 		What's included?
// 	</a>
// 	<div className='collapse' id={jobTypeName}>
// 		<ul className='mb-0'>
// 			{serviceDescriptions.map((description, i) => <li key={i}>
// 				{description}
// 			</li>
// 			)}
// 		</ul>
// 	</div>
// </div>