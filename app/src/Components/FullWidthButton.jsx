import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

export default props => {
	const buttonProps = {
		...props,
		className: 'w-100 ' + props.className
	}
	return <Row>
		<Col xs='12' sm='auto'>
			<Button {...buttonProps} />
		</Col>
	</Row>
}