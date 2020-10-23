import React from 'react'
import type1 from './type-1.svg'
import type2 from './type-2.svg'
import type3 from './type-3.svg'
import { Col, Row, Image } from 'react-bootstrap'
import FullWidthButton from '../../../../Components/FullWidthButton'

const types = [type1, type2, type3]
	.map((type, i) => ({ className }) => <Image src={type} alt={`bathroom type ${i}`} className={className} rounded />)

export default () => <>
	<h4>Just a heads up!</h4>
	<p>We renovate more traditional bathrooms. Like this...</p>
	<Row className='justify-content-between mb-3 mx-0'>
		{types.map((TypeImage, i) =>
			<Col xs={5} sm={3} key={i} className={(i < 2 ? '' : 'd-none d-sm-block ') + 'px-0'}>
				<TypeImage className='w-100' />
			</Col>
		).reduce((xs, x, i) => <>
			{xs}
			<Col xs='auto' className={(i < 2 ? '' : 'd-none d-sm-block ') + 'align-self-center px-0'}>
				<h5>or</h5>
			</Col>
			{x}
		</>)}
	</Row>
	<p>If your bathroom has more corners than fingers on your hands or specialty fixtures, we'll in touch later on to talk options!</p>
	<Row>
		<Col xs='12' sm='auto'>
			<FullWidthButton color='primary' className='w-100'>
				Continue To Quote!
			</FullWidthButton>
		</Col>
	</Row>
</>