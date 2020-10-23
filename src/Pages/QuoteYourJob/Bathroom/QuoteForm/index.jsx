import React, { useState, useCallback } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FullWidthButton from '../../../../Components/FullWidthButton'

export default ({ onQuote }) => {
	const [squareFootage, setSquareFootage] = useState('')
	const handleSquareFootageChange = useCallback(e => {
		const newValue = e.target.value
		if (/^([1-9]\d*)?$/.test(newValue)) {
			setSquareFootage(newValue)
		}
	}, [setSquareFootage])

	const [vanityCount, setVanityCount] = useState('')
	const handleVanityCountChange = useCallback(e => {
		setVanityCount(e.target.value)
	}, [setVanityCount])

	const [squareFootageIsInvalid, setSquareFootageIsInvalid] = useState(false)
	const [vanityCountIsInvalid, setVanityCountIsInvalid] = useState(false)
	const handleSubmit = useCallback(e => {
		e.preventDefault()

		const isSquareFootageValid = squareFootage !== ''
		const isVanityCountValid = vanityCount !== ''

		setSquareFootageIsInvalid(!isSquareFootageValid)
		setVanityCountIsInvalid(!isVanityCountValid)

		if (isSquareFootageValid && isVanityCountValid) {
			onQuote({
				squareFootage,
				vanityCount
			})
		}
	}, [squareFootage, vanityCount])

	return <>
		<h4>This is all we need to know!</h4>
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId='squareFootage'>
				<Form.Label>What's the square footage?</Form.Label>
				<Form.Control inputMode='numeric' value={squareFootage} onChange={handleSquareFootageChange} isInvalid={squareFootageIsInvalid} />
				<Form.Text className='text-muted'>
					Account for all the space in your bathroom: even the room taken up by the tub and closets.
				</Form.Text>
			</Form.Group>

			<Form.Group controlId='vanityCount'>
				<Form.Label>Single or double vanity?</Form.Label>
				<br />
				<Form.Check inline label='Single' type='radio' value='single' checked={vanityCount === 'single'} onChange={handleVanityCountChange} isInvalid={vanityCountIsInvalid} />
				<Form.Check inline label='Double' type='radio' value='double' checked={vanityCount === 'double'} onChange={handleVanityCountChange} isInvalid={vanityCountIsInvalid} />
			</Form.Group>

			<FullWidthButton color='primary' type='submit'>
				Continue to Quote!
			</FullWidthButton>
		</Form>
	</>
}
