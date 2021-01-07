using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.LockInQuote
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddLockInQuote(this IServiceCollection services) => services
            .AddOptions<Options>()
                .Configure<IConfiguration>((options, configuration) => configuration.GetSection("LockInQuote").Bind(options))
                .ValidateDataAnnotations()
                .Services
            .AddTransient<QuoteReceivedMessenger>();
    }
}