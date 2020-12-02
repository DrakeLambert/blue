namespace Api.Email
{
    public class EmailMessage
    {
        public string ToEmailAddress { get; set; }

        public string FromEmailUserName { get; set; }

        public string Text { get; set; }

        public string Subject { get; set; }
    }
}