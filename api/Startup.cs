using Api;
using Api.Email;
using Api.LockInQuote;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(Startup))]
namespace Api
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder) => builder.Services
            .AddOptions<Options>()
                .Configure<IConfiguration>((options, configuration) => configuration.Bind(options))
                .Services
            .AddEmail()
            .AddTransient<QuoteReceivedMessenger>();
    }
}