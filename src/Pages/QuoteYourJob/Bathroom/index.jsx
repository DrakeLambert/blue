import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import typeImages from './TypeImages'

export default () => <>
	<h4>Just a heads up!</h4>
	<p>We renovate more traditional bathrooms. Like this...</p>
	<Row className='justify-content-around mb-3 mx-n0'>
		{typeImages.map((TypeImage, i) =>
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
	<Row className='justify-content-center'>
		<Col xs='12' sm='auto'>
			<Button color='primary' className='w-100'>
				Continue To Quote!
	</Button>
		</Col>
	</Row>
</>