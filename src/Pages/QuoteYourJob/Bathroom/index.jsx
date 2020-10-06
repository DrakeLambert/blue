import React from 'react'
import { Col, Row } from 'react-bootstrap'
import typeImages from './TypeImages'

export default () => <>
	<h1>Just a heads up!</h1>
	<h3>We renovate bathrooms that look like this...</h3>
	<Row className='justify-content-center'>
		{typeImages.map((TypeImage, i) =>
			<Col xs={6} key={i}>
				{i < 2
					? <TypeImage className='w-100 d-block mx-auto' />
					: <TypeImage className='w-100 d-none d-sm-block mx-auto' />
				}
			</Col>
		).reduce((xs, x, i) => <>
			{xs}
			{i < 2
				? <Col xs={2}>
					<h3 className='text-center'>or</h3>
				</Col>
				: <Col xs={2} className='d-none d-sm-block'>
					<h3 className='text-center'>or</h3>
				</Col>
			}
			{x}
		</>)}
	</Row>
	<h3>If your bathroom has more corners than fingers on one hand or specialty fixtures, get in touch!</h3>
</>