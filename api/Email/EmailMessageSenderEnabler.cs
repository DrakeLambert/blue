using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Api.Email
{
    public class EmailMessageSenderEnabler : IEmailMessageSender
    {
        private readonly IEmailMessageSender _emailMessageSender;
        private readonly ILogger _logger;
        private readonly EmailOptions _options;

        public EmailMessageSenderEnabler(IEmailMessageSender emailMessageSender, IOptions<EmailOptions> options, ILogger<EmailMessageSenderEnabler> logger)
        {
            _emailMessageSender = emailMessageSender;
            _logger = logger;
            _options = options.Value;
        }

        public async Task SendMessageAsync(EmailMessage message)
        {
            if (_options.Enabled.Value)
            {
                await _emailMessageSender.SendMessageAsync(message);
            }
            else
            {
                var exception = new EmailMessageSendingDisabledException();
                string toEmailAddresses = message.ToEmailAddresses.Aggregate((rest, next) => $"{rest}, {next}");
                _logger.LogError(exception, "Email sending is disabled. Not sending email with subject '{subject}' to '{to}'.", message.Subject, toEmailAddresses);
                throw exception;
            }
        }
    }
}