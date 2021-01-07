using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Linq;
using Microsoft.Extensions.Options;
using Refit;
using Api.Email;
using System;

namespace Api.LockInQuote
{
    public class QuoteReceivedMessenger
    {
        private readonly Options _options;
        private readonly ILogger _logger;
        private readonly IEmailMessageSender _emailSender;

        private static readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions { WriteIndented = true };

        public QuoteReceivedMessenger(IOptionsSnapshot<Options> options, ILogger<QuoteReceivedMessenger> logger, IEmailMessageSender emailSender)
        {
            _options = options.Value;
            _logger = logger;
            _emailSender = emailSender;
        }

        public async Task SendMessageAsync(Request request)
        {
            _logger.LogInformation("Sending email for new quote request.");

            var subject = "Blue: New Quote Locked In";
            var message = new EmailMessage(
                _options.ToEmailAddresses,
                subject,
                text: JsonSerializer.Serialize(request, _jsonOptions));

            try
            {
                await _emailSender.SendMessageAsync(message);
            }
            catch (Exception exception)
            {
                var sendingException = QuoteReceivedMessengerException.SendingFailed(exception);
                throw sendingException;
            }
        }
    }

}
