import React, { useEffect, useState } from 'react'
import Loader from '../../Components/Loader'
import GetJobTypes from './GetJobTypes'
import JobTypePicker from './JobTypePicker'

export default ({ onSelect }) => {
	const [jobTypes, setJobTypes] = useState()
	const [jobTypesLoading, setJobTypesLoading] = useState(true)

	useEffect(() => {
		(async () => {
			setJobTypesLoading(true)
			try {
				const jobTypes = await GetJobTypes()
				setJobTypes(jobTypes)
			} finally {
				setJobTypesLoading(false)
			}
		})()
	}, [setJobTypes, setJobTypesLoading])

	if (jobTypesLoading) {
		return <Loader />
	}

	return <JobTypePicker jobTypes={jobTypes} onSelect={onSelect} />
}