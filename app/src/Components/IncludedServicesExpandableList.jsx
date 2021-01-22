import React from 'react'

export default ({ serviceDescriptions, jobTypeName }) => <div className='mb-3'>
	<a className='text-decoration-none' data-bs-toggle='collapse' data-bs-target={'#' + jobTypeName} aria-expanded='false' aria-controls={jobTypeName}>
		What's included?
	</a>
	<div className='collapse' id={jobTypeName}>
		<ul className='mb-0'>
			{serviceDescriptions.map((description, i) => <li key={i}>
				{description}
			</li>
			)}
		</ul>
	</div>
</div>