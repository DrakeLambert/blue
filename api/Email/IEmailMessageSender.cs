using System.Threading.Tasks;

namespace Api.Email
{
    public interface IEmailMessageSender
    {
        Task SendMessageAsync(EmailMessage message);
    }
}