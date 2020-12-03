import React, { useCallback, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import FullWidthButton from '../../../Components/FullWidthButton'
import lockInQuote from './lockInQuote'

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
	const history = useHistory()

	const { register, handleSubmit, errors } = useForm()

	for (const field in fields) {
		fields[field].register = register
		fields[field].errors = errors
	}

	const {
		quote,
		roomDetails
	} = props

	const roomType = roomDetails.roomType

	const onSubmit = useCallback(formValues => {
		const quoteInformation = {
			...quote,
			roomDetails
		}
		lockInQuote(formValues, quoteInformation)
			.then((response) => {
				if (response.ok) {
					alert("Quote Lock In Request Received")
				} else {
					alert("Error Sending Quote Request")
				}
			})
	}, [quote, roomType, lockInQuote])

	const [quoteLockInLoading, setQuoteLockInLoading] = useState(false)

	if (quoteLockInLoading) {
		return <h4>Locking in your quote...</h4>
	}

	const formattedTotal = currencyFormatter.format(quote.total)

	return <>
		<h4>Here's your {roomType} quote!</h4>
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

			<FullWidthButton color='primary' type='submit'>
				Lock in Quote!
			</FullWidthButton>
		</Form>
	</>
}

const FormField = ({ id, label, inputMode, as, register, notRequired = false, errors }) => <Form.Group as={as} controlId={id}>
	<Form.Label inputMode={inputMode}>{label}</Form.Label>
	<Form.Control name={id} ref={register({ required: !notRequired })} isInvalid={errors[id]} />
</Form.Group>
