using Refit;

namespace Api.Email.Mailgun
{
    public class MailgunRequest
    {
        [AliasAs("to")]
        public string To { get; set; }
        [AliasAs("from")]
        public string From { get; set; }
        [AliasAs("subject")]
        public string Subject { get; set; }
        [AliasAs("text")]
        public string Text { get; set; }
    }
}
