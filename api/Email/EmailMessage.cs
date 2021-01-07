using System;
using System.Collections.Generic;
using System.Linq;

namespace Api.Email
{
    public class EmailMessage
    {
        public EmailMessage(IEnumerable<string> toEmailAddresses, string subject, string text,
            IEnumerable<string> ccEmailAddresses = null, IEnumerable<string> bccEmailAddresses = null, EmailAttachment attachment = null)
        {
            if (toEmailAddresses is null)
            {
                throw new ArgumentNullException(nameof(toEmailAddresses));
            }

            if (string.IsNullOrWhiteSpace(subject))
            {
                throw new ArgumentException($"'{nameof(subject)}' cannot be null or whitespace", nameof(subject));
            }

            if (!toEmailAddresses.Any())
            {
                throw new ArgumentException("Collection cannot be empty.", nameof(toEmailAddresses));
            }

            ToEmailAddresses = toEmailAddresses;
            Subject = subject;
            Text = text ?? throw new ArgumentNullException(nameof(text));
            CcEmailAddresses = ccEmailAddresses ?? new string[0];
            BccEmailAddresses = bccEmailAddresses ?? new string[0];
            Attachment = attachment;
        }

        public IEnumerable<string> ToEmailAddresses { get; }

        public IEnumerable<string> CcEmailAddresses { get; }

        public IEnumerable<string> BccEmailAddresses { get; }

        public string Text { get; }

        public string Subject { get; }

        public EmailAttachment Attachment { get; }
    }
}