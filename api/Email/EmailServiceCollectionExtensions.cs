using Api.Email.Mailgun;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Email
{
    public static class EmailServiceCollectionExtensions
    {
        public static IServiceCollection AddEmail(this IServiceCollection services) => services
            .AddMailgun();
    }
}