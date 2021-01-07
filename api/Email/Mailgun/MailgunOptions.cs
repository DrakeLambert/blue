using System.ComponentModel.DataAnnotations;

namespace Api.Email.Mailgun
{
    public class MailgunOptions
    {
        [Required]
        public string ApiKey { get; set; }

        [Required]
        public string BaseAddress { get; set; }

        [Required]
        public string Domain { get; set; }
    }
}
