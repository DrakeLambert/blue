using Api.Email.Mailgun;
using Api.ServiceRegistration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Email
{
    public static class EmailServiceCollectionExtensions
    {
        public static IServiceCollection AddEmail(this IServiceCollection services) => services
            .AddMailgun()
            .AddOptions<EmailOptions>()
                .Configure<IConfiguration>((options, configuration) =>
                    configuration.GetSection("email").Bind(options))
                .ValidateDataAnnotations()
                .Services
            .Decorate<IEmailMessageSender, EmailMessageSenderEnabler>();
    }
}