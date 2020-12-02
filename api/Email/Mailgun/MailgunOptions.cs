namespace Api.Email.Mailgun
{
    public class MailgunOptions
    {
        public string ApiKey { get; set; }
        public string BaseAddress { get; set; }
        public string Domain { get; set; }
        public bool Enabled { get; set; }
    }
}
