import React, { useCallback, useState } from 'react'
import { Col, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FullWidthButton from '../../Components/FullWidthButton'
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
		onLockIn
	} = props

	const jobType = jobDetails.jobType

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
	}, [quote, jobType, lockInQuote, setQuoteLockInLoading, onLockIn])

	const [quoteLockInLoading, setQuoteLockInLoading] = useState(false)

	const formattedTotal = currencyFormatter.format(quote.total)

	return <>
		<h4>Here's your {jobType} quote!</h4>
		<div className='w-100 text-center my-4'>
			<h1 >{formattedTotal}</h1>
			<h5>We see 🛠 in your future!</h5>
		</div>
		<p>You'll pay {formattedTotal} to remodel your {quote.description}.</p>
		<p>This price includes all taxes and fees!</p>
		<h5>Next:</h5>
		<p>Get your free sample box and lock in your quote! We'll ship all of our top tier material choices to your doorstep within a week.</p>
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Row>
				<FormField {...fields.firstName} as={Col} />
				<FormField {...fields.lastName} as={Col} />
			</Form.Row>

			<FormField {...fields.email} />
			<FormField {...fields.address1} />
			<FormField {...fields.address2} />
			<FormField {...fields.city} />
			<FormField {...fields.state} />
			<FormField {...fields.zip} />
			<FormField {...fields.phoneNumber} />

			<FullWidthButton color='primary' type='submit' disabled={quoteLockInLoading}>
				{quoteLockInLoading &&
					<Spinner
						as='span'
						animation='border'
						size='sm'
						role='status'
						aria-hidden='true'
						className='mr-2'
					/>}
				Lock in Quote!
			</FullWidthButton>
		</Form>
	</>
}

const FormField = ({ id, label, inputMode, as, register, notRequired = false, errors }) => <Form.Group as={as} controlId={id}>
	<Form.Label inputMode={inputMode}>{label}</Form.Label>
	<Form.Control name={id} ref={register({ required: !notRequired })} isInvalid={errors[id]} />
</Form.Group>
