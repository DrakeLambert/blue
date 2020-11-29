using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Api.LockInQuote
{
    public class Function
    {
        private readonly ILogger _logger;

        private readonly QuoteReceivedMessenger _messenger;

        private static readonly JsonSerializerOptions _serializationOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public Function(ILogger<Function> logger, QuoteReceivedMessenger messenger)
        {
            _logger = logger;
            _messenger = messenger;
        }

        [FunctionName("LockInQuote")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest request)
        {
            Request lockInQuoteRequest;
            try
            {
                lockInQuoteRequest = await JsonSerializer.DeserializeAsync<Request>(request.Body, _serializationOptions);
            }
            catch (JsonException jsonException)
            {
                var body = await request.ReadAsStringAsync();
                _logger.LogError(jsonException, "Unable to deserialize body {body}", body);
                return new BadRequestObjectResult(new ProblemDetails
                {
                    Title = "Request body was invalid.",
                    Detail = jsonException.Message
                });
            }

            try
            {
                await _messenger.SendMessageAsync(lockInQuoteRequest);
            }
            catch (QuoteReceivedMessengerException e)
            {
                _logger.LogError(e, "Error sending quote received message.");

                return new ObjectResult(new ProblemDetails
                {
                    Title = "There was an issue locking in your quote. Please contact us."
                })
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }

            return new AcceptedResult();
        }
    }
}
