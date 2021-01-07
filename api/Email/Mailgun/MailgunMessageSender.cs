using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Refit;

namespace Api.Email.Mailgun
{
    public class MailgunMessageSender : IEmailMessageSender
    {
        private readonly IMailgunApi _api;
        private readonly MailgunOptions _mailgunOptions;
        private readonly ILogger _logger;
        private readonly EmailOptions _emailOptions;

        public MailgunMessageSender(IMailgunApi api, IOptionsSnapshot<MailgunOptions> mailgunOptions, ILogger<MailgunMessageSender> logger, IOptionsSnapshot<EmailOptions> emailOptions)
        {
            _api = api;
            _mailgunOptions = mailgunOptions.Value;
            _logger = logger;
            _emailOptions = emailOptions.Value;
        }

        public async Task SendMessageAsync(EmailMessage message)
        {
            try
            {
                if (message.Attachment is EmailAttachment)
                {
                    await SendMessageWithAttachmentCoreAsync(message);
                }
                else
                {
                    await SendMessageCoreAsync(message);
                }
            }
            catch (ApiException apiException)
            {
                _logger.LogError(apiException, "Error sending email. SendGrid response: {code} {body}", apiException.StatusCode, apiException.Content);
                throw;
            }
        }

        private async Task SendMessageCoreAsync(EmailMessage message)
        {
            var request = new MailgunRequest
            {
                From = _emailOptions.FromEmailAddress,
                To = FormatEmailAddressList(message.ToEmailAddresses),
                Cc = FormatEmailAddressList(message.CcEmailAddresses),
                Bcc = FormatEmailAddressList(message.BccEmailAddresses),
                Subject = message.Subject,
                Text = message.Text
            };

            await _api.SendMessageAsync(_mailgunOptions.Domain, request);
        }

        private async Task SendMessageWithAttachmentCoreAsync(EmailMessage message)
        {
            var attachment = new StreamPart(message.Attachment.Content, message.Attachment.FileName, message.Attachment.ContentType.ToString());

            await _api.SendMessageWithAttachmentAsync(
                _mailgunOptions.Domain,
                attachment,
                FormatEmailAddressList(message.ToEmailAddresses),
                FormatEmailAddressList(message.CcEmailAddresses),
                FormatEmailAddressList(message.BccEmailAddresses),
                _emailOptions.FromEmailAddress,
                message.Subject,
                message.Text);
        }

        private string FormatEmailAddressList(IEnumerable<string> toEmailAddresses) => toEmailAddresses switch
        {
            IEnumerable<string> _ when toEmailAddresses.Any() => string.Join(',', toEmailAddresses),
            _ => null
        };
    }
}