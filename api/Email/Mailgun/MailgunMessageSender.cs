using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Refit;

namespace Api.Email.Mailgun
{
    public class MailgunMessageSender : IEmailMessageSender
    {
        private readonly IMailgunApi _api;
        private readonly MailgunOptions _options;
        private readonly ILogger _logger;

        public MailgunMessageSender(IMailgunApi api, IOptionsSnapshot<MailgunOptions> options, ILogger<MailgunMessageSender> logger)
        {
            _api = api;
            _options = options.Value;
            _logger = logger;
        }

        public async Task SendMessageAsync(EmailMessage message)
        {
            if (!_options.Enabled)
            {
                return;
            }

            var request = new MailgunRequest
            {
                From = $"",
                To = message.ToEmailAddress,
                Subject = message.Subject,
                Text = message.Text
            };

            try
            {
                await _api.SendMessageAsync(_options.Domain, request);
            }
            catch (ApiException apiException)
            {
                _logger.LogError(apiException, "Error sending email. SendGrid response: {code} {body}", apiException.StatusCode, apiException.Content);
                throw;
            }
        }
    }
}