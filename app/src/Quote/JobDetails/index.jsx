import React from 'react'
import Bathroom from './Bathroom'

const jobTypeComponentMap = {
  bathroom: Bathroom
}

export default ({ jobType, onSubmit }) => {
  const JobTypeQuoter = jobTypeComponentMap[jobType]
  return <JobTypeQuoter onSubmit={onSubmit} />
}
