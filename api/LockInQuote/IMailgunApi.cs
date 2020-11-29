using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Refit;

namespace Api.LockInQuote
{
    public interface IMailgunApi
    {
        [Post("/v3/{domain}/messages")]
        Task SendMessage(string domain, [Body(BodySerializationMethod.UrlEncoded)] MailgunMessage message);
    }

    public class MailgunMessage
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

    public class MailgunAuthenticationHandler : DelegatingHandler
    {
        private readonly string _apiKey;

        private const string _userName = "api";

        public MailgunAuthenticationHandler(IOptionsSnapshot<ApiOptions> options)
        {
            _apiKey = options.Value.MailgunApiKey;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var parameter = $"{_userName}:{_apiKey}";

            var encodedParameter = Convert.ToBase64String(Encoding.UTF8.GetBytes(parameter));

            var authorizationHeader = new AuthenticationHeaderValue("Basic", encodedParameter);

            request.Headers.Authorization = authorizationHeader;

            return base.SendAsync(request, cancellationToken);
        }
    }
}
