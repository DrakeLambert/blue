import React from 'react'
import FullWidthButton from '../../Components/FullWidthButton'

export default ({ quoteInformation }) => {
  return <div>
    <h4>Thanks {quoteInformation.contactInformation.firstName}! We've received your request!</h4>
    <div className='w-100 text-center my-4'>
      <h1>🥂</h1>
    </div>
    <p>We'll put together your samples box and get it sent over!</p>
    <p>In the meantime, keep an eye on your email for contact from us. Your renovation guide will reach out soon.</p>
    <FullWidthButton href='https://www.rediggs.com/'>
      Return Home
    </FullWidthButton>
  </div>
}