using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Linq;
using Microsoft.Extensions.Options;
using Refit;

namespace Api.LockInQuote
{
    public class QuoteReceivedMessenger
    {
        private readonly ApiOptions _options;
        private readonly ILogger _logger;
        private readonly IMailgunApi _mailGunApi;

        private static readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions { WriteIndented = true };

        public QuoteReceivedMessenger(IOptionsSnapshot<ApiOptions> options, ILogger<QuoteReceivedMessenger> logger, IMailgunApi mailGunApi)
        {
            _options = options.Value;
            _logger = logger;
            _mailGunApi = mailGunApi;
        }

        public async Task SendMessageAsync(Request request)
        {
            _logger.LogInformation("Sending email for new quote request.");

            var message = new MailgunMessage
            {
                From = _options.FromEmailAddress,
                To = _options.ToEmailAddresses.Aggregate((rest, next) => rest + "," + next),
                Subject = "Blue: New Quote Locked In",
                Text = JsonSerializer.Serialize(request, _jsonOptions)
            };

            try
            {

                await _mailGunApi.SendMessage(_options.MailgunDomain, message);
            }
            catch (ApiException apiException)
            {
                var sendingException = QuoteReceivedMessengerException.SendingFailed();

                _logger.LogError(sendingException, "Error sending email. SendGrid response: {code} {body}", apiException.StatusCode, apiException.Content);

                throw sendingException;
            }
        }
    }

}
