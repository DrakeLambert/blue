export default roomDetails => {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(getQuote(roomDetails))
    }, 2)
  })
}

const getQuote = ({roomType, ...roomDetails}) => {
  switch (roomType) {
    case 'bathroom':
      const {
        squareFootage,
        vanityCount
      } = roomDetails
      const isSingleVanity = vanityCount === 1
      const total = squareFootage * (isSingleVanity
        ? 144
        : 152
      )
      const description = `${vanityCount} vanity bathroom with ${squareFootage} square feet`
      return {
        success: true,
        description,
        total
      }

    default:
      return {
        success: false,
        description: `The ${roomType} quoter hasn't been built yet!`
      }
  }
}