using System.ComponentModel.DataAnnotations;

namespace Api.Email
{
    public class EmailOptions
    {
        [Required]
        public string FromEmailAddress { get; set; }

        [Required]
        public bool? Enabled { get; set; } = false;
    }
}