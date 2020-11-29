using System;
using Api;
using Api.LockInQuote;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Refit;

[assembly: FunctionsStartup(typeof(Startup))]
namespace Api
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder) => builder.Services
            .AddOptions<ApiOptions>()
                .Configure<IConfiguration>((options, configuration) => configuration.Bind(options))
                .Services
            .AddTransient<MailgunAuthenticationHandler>()
            .AddRefitClient<IMailgunApi>()
                .AddHttpMessageHandler<MailgunAuthenticationHandler>()
                .ConfigureHttpClient((services, client) =>
                {
                    var options = services.GetRequiredService<IOptionsSnapshot<ApiOptions>>().Value;
                    client.BaseAddress = new Uri(options.MailgunBaseAddress);
                })
                .Services
            .AddTransient<QuoteReceivedMessenger>();
    }
}