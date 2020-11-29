namespace Api.LockInQuote
{
    public class ApiOptions
    {
        public string MailgunApiKey { get; set; }

        public string MailgunBaseAddress { get; set; }

        public string MailgunDomain { get; set; }

        public string FromEmailAddress { get; set; }

        public string[] ToEmailAddresses { get; set; }
    }
}
