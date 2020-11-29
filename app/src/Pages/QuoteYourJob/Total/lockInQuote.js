const route = '/api/lockInQuote'

export default (contactInformation, quoteInformation) => {
  return fetch(route, {
    method: 'POST',
    body: JSON.stringify({
      contactInformation,
      quoteInformation
    })
  })
}