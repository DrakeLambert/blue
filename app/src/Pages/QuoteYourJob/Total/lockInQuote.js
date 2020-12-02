const route = '/api/lockInQuote'

/**
 * @returns {Promise<Response>}
 */
export default (contactInformation, quoteInformation) => {
  return fetch(route, {
    method: 'POST',
    body: JSON.stringify({
      contactInformation,
      quoteInformation
    })
  })
}