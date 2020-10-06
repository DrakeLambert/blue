import React from 'react'
import Image from 'react-bootstrap/Image'
import type1 from './type-1.svg'
import type2 from './type-2.svg'
import type3 from './type-3.svg'

const types = [type1, type2, type3]
	.map((type, i) => ({ className }) => <Image src={type} alt={`bathroom type ${i}`} className={className} rounded />)

export default types