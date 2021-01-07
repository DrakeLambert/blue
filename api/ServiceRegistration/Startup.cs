using Api.Email;
using Api.LockInQuote;
using Api.ServiceRegistration;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(Startup))]
namespace Api.ServiceRegistration
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder) => builder.Services
            .AddEmail()
            .AddLockInQuote();
    }
}