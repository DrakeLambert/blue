using System.Threading.Tasks;
using Refit;

namespace Api.Email.Mailgun
{
    public interface IMailgunApi
    {
        [Post("/v3/{domain}/messages")]
        Task SendMessageAsync(string domain, [Body(BodySerializationMethod.UrlEncoded)] MailgunRequest request);
    }
}