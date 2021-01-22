import React, { useState, useCallback } from 'react'
import FullWidthButton from '../../Components/FullWidthButton'

const singleVanity = 'single'
const doubleVanity = 'double'

export default ({ onSubmit }) => {
	const [squareFootage, setSquareFootage] = useState('')
	const handleSquareFootageChange = useCallback(e => {
		const newValue = e.target.value
		if (/^([1-9]\d*)?$/.test(newValue)) {
			setSquareFootage(newValue)
		}
	}, [setSquareFootage])

	const [vanityCount, setVanityCount] = useState('')
	const handleVanityCountChange = useCallback(e => {
		setVanityCount(e.target.id)
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
			onSubmit({
				jobType: 'bathroom',
				squareFootage: Number.parseFloat(squareFootage),
				vanityCount: vanityCount === singleVanity ? 1 : 2
			})
		}
	}, [squareFootage, vanityCount])

	return <>
		<h4>This is all we need to know!</h4>
		<form onSubmit={handleSubmit}>
			<div className='mb-3'>
				<label htmlFor='squareFootage' className='form-label'>What's the square footage?</label>
				<input id='squareFootage' inputMode='numeric' className={'form-control' + (squareFootageIsInvalid ? ' is-invalid' : '')} aria-describedby='squareFootageHelp' value={squareFootage} onChange={handleSquareFootageChange} />
				<div className='form-text' id='squareFootageHelp'>
					<ol className='ps-3'>
						<li>
							Measuring the length and width of your bathroom. Include the space taken up by the tub, toilet, and vanity.
						</li>
						<li>
							Multiply the length and width to get your square footage.
						</li>
						<li>
							If you have closets, measure their square footage and add it to your total.
						</li>
					</ol>
				</div>
			</div>

			<fieldset className='mb-3'>
				<label htmlFor='' className='form-label'>
					Single or double vanity?
				</label>
				<RadioButton name='vanityCount' label='Single' id={singleVanity} isChecked={vanityCount === singleVanity} onChange={handleVanityCountChange} isInvalid={vanityCountIsInvalid} />
				<RadioButton name='vanityCount' label='Double' id={doubleVanity} isChecked={vanityCount === doubleVanity} onChange={handleVanityCountChange} isInvalid={vanityCountIsInvalid} />
			</fieldset>

			<FullWidthButton type='submit'>
				Continue to Quote!
			</FullWidthButton>
		</form>
	</>
}

const RadioButton = ({ id, label, isChecked, onChange, isInvalid, name }) => <div className='form-check'>
	<input className={'form-check-input' + (isInvalid ? ' is-invalid' : '')} type='radio' id={id} name={name} checked={isChecked} onChange={onChange} />
	<label className='form-check-label' htmlFor={id}>
		{label}
	</label>
</div>
