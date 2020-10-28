import React from 'react'
import { Form } from 'react-bootstrap'
import FullWidthButton from '../../Components/FullWidthButton'

export default () => {
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

      <fieldset>
        <Form.Group controlId='vanityCount'>
          <Form.Label>
            Single or double vanity?
          </Form.Label>
          <FormCheck type='radio' label='Single' id='single' checked={vanityCount === 'single'} onChange={handleVanityCountChange} isInvalid={vanityCountIsInvalid} />
          <FormCheck type='radio' label='Double' id='double' checked={vanityCount === 'double'} onChange={handleVanityCountChange} isInvalid={vanityCountIsInvalid} />
        </Form.Group>
      </fieldset>

      <FullWidthButton color='primary' type='submit'>
        Continue to Quote!
      </FullWidthButton>
    </Form>
  </>
}
