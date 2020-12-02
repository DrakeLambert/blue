using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Refit;

namespace Api.Email.Mailgun
{
    public static class MailgunServiceCollectionExtensions
    {
        public static IServiceCollection AddMailgun(this IServiceCollection services) => services
            .AddTransient<IEmailMessageSender, MailgunMessageSender>()
            .AddOptions<MailgunOptions>()
                .Configure<IConfiguration>((options, configuration) =>
                    configuration.GetSection("mailgun").Bind(options))
                .Services
            .AddTransient<MailgunAuthenticationHandler>()
            .AddRefitClient<IMailgunApi>()
                .AddHttpMessageHandler<MailgunAuthenticationHandler>()
                .ConfigureHttpClient((services, client) =>
                {
                    var options = services.GetRequiredService<IOptionsSnapshot<MailgunOptions>>().Value;
                    client.BaseAddress = new Uri(options.BaseAddress);
                })
                .Services;
    }
}