using System.Threading.Tasks;
using Refit;

namespace Api.Email.Mailgun
{
    public interface IMailgunApi
    {
        [Post("/v3/{domain}/messages")]
        Task SendMessageAsync(string domain, [Body(BodySerializationMethod.UrlEncoded)] MailgunRequest request);

        [Multipart]
        [Post("/v3/{domain}/messages")]
        Task SendMessageWithAttachmentAsync(string domain, StreamPart attachment, string to, string cc, string bcc, string from, string subject, string text);
    }
}