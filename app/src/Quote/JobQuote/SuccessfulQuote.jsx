import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import FullWidthButton from '../../Components/FullWidthButton'
import IncludedServicesExpandableList from '../../Components/IncludedServicesExpandableList'
import lockInQuote from './LockInQuote'

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const fields = Object.entries({
	firstName: { label: 'First Name' },
	lastName: { label: 'Last Name' },
	email: { label: 'Email', inputMode: 'email' },
	address1: { label: 'Address line 1' },
	address2: { label: 'Address line 2', notRequired: true },
	city: { label: 'City' },
	state: { label: 'State' },
	zip: { label: 'Zip code', inputMode: 'numeric' },
	phoneNumber: { label: 'Phone number', inputMode: 'tel' }
}).map(([key, value]) => ({
	...value, id: key
})).reduce((xs, x) => ({ ...xs, [x.id]: { ...x } }), {})

export default props => {
	const { register, handleSubmit, errors } = useForm()

	for (const field in fields) {
		fields[field].register = register
		fields[field].errors = errors
	}

	const {
		quote,
		jobDetails,
		onLockIn,
		jobType
	} = props

	const jobTypeName = jobDetails.jobType

	const onSubmit = useCallback(formValues => {
		const quoteInformation = {
			...quote,
			jobDetails
		}
		setQuoteLockInLoading(true)
		lockInQuote(formValues, quoteInformation)
			.then((response) => {
				if (response.ok) {
					onLockIn(formValues, quoteInformation)
				} else {
					alert('Error Sending Quote Request')
				}
			})
			.finally(() => {
				setQuoteLockInLoading(false)
			})
	}, [quote, jobTypeName, lockInQuote, setQuoteLockInLoading, onLockIn])

	const [quoteLockInLoading, setQuoteLockInLoading] = useState(false)

	const formattedTotal = currencyFormatter.format(quote.total)

	console.log(props)

	const includedServices = Array.isArray(jobType.includedServices)
		? <IncludedServicesExpandableList serviceDescriptions={jobType.includedServices} jobTypeName={jobTypeName} />
		: null

	return <>
		<h4>Here's your {jobTypeName} quote!</h4>
		<div className='w-100 text-center my-4'>
			<h1 >{formattedTotal}</h1>
			<h5>We see 🛠 in your future!</h5>
		</div>
		<p>You'll pay {formattedTotal} to remodel your {quote.description}.</p>
		{includedServices}
		<p>This price includes all taxes and fees!</p>
		<h5>Next:</h5>
		<p>Get your free sample box and lock in your quote! We'll ship all of our top tier material choices to your doorstep within a week.</p>
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='row'>
				<FormField {...fields.firstName} className='col' />
				<FormField {...fields.lastName} className='col' />
			</div>

			<FormField {...fields.email} />
			<FormField {...fields.address1} />
			<FormField {...fields.address2} />
			<FormField {...fields.city} />
			<FormField {...fields.state} />
			<FormField {...fields.zip} />
			<FormField {...fields.phoneNumber} />

			<FullWidthButton type='submit' isDisabledLoading={quoteLockInLoading}>
				Lock in Quote!
			</FullWidthButton>
		</form>
	</>
}

const FormField = ({ id, label, inputMode, register, notRequired = false, errors, className }) => <div className={'mb-3 ' + className}>
	<label className='form-label' htmlFor={id}>{label}</label>
	<input className={'form-control' + (errors[id] ? ' is-invalid' : '')} name={id} id={id} inputMode={inputMode} ref={register({ required: !notRequired })} />
</div>
