import React from 'react'
import FullWidthButton from '../../../Components/FullWidthButton'

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default props => {
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
		<p>Get your free sample box! We'll ship all of our top tier material choices to your doorstep.</p>
		<FullWidthButton color='primary'>Lock in Quote!</FullWidthButton>
	</>
}