import React, { useCallback } from 'react'
import { Col, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import FullWidthButton from '../../../Components/FullWidthButton'

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default props => {
	const history = useHistory()

	const handleSubmit = useCallback(() => {
	}, [history])

	const {
		quote,
		roomType
	} = props
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
		<p>Get your free sample box and lock in your quote! We'll ship all of our top tier material choices to your doorstep this week.</p>
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group as={Col} controlId='firstName'>
					<Form.Label>First Name</Form.Label>
					<Form.Control />
				</Form.Group>

				<Form.Group as={Col} controlId='lastName'>
					<Form.Label>Last Name</Form.Label>
					<Form.Control />
				</Form.Group>
			</Form.Row>

			<Form.Group controlId='address1'>
				<Form.Label>Address line 1</Form.Label>
				<Form.Control />
			</Form.Group>

			<Form.Group controlId='address2'>
				<Form.Label>Address line 2</Form.Label>
				<Form.Control />
			</Form.Group>

			<Form.Group controlId='city'>
				<Form.Label>City</Form.Label>
				<Form.Control />
			</Form.Group>

			<Form.Group controlId='state'>
				<Form.Label>State</Form.Label>
				<Form.Control />
			</Form.Group>

			<Form.Group controlId='zip'>
				<Form.Label inputMode='numeric'>Zip code</Form.Label>
				<Form.Control />
			</Form.Group>

			<Form.Group controlId='zip'>
				<Form.Label inputMode='tel'>Phone number</Form.Label>
				<Form.Control />
			</Form.Group>

			<FullWidthButton color='primary' type='submit'>
				Lock in Quote!
			</FullWidthButton>
		</Form>
	</>
}