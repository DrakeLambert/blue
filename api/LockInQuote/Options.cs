using System.ComponentModel.DataAnnotations;

namespace Api.LockInQuote
{
    public class Options
    {
        [Required]
        [MinLength(1)]
        public string[] ToEmailAddresses { get; set; }
    }
}
