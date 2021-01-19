export default jobDetails => {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(getQuote(jobDetails))
    }, 2)
  })
}

const getQuote = ({jobType, ...jobDetails}) => {
  switch (jobType) {
    case 'bathroom':
      const {
        squareFootage,
        vanityCount
      } = jobDetails
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
        description: `The ${jobType} quoter hasn't been built yet!`
      }
  }
}