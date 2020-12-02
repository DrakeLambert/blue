using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace Api.Email.Mailgun
{
    public class MailgunAuthenticationHandler : DelegatingHandler
    {
        private readonly string _apiKey;

        private const string _userName = "api";

        public MailgunAuthenticationHandler(IOptionsSnapshot<MailgunOptions> options)
        {
            _apiKey = options.Value.ApiKey;
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
