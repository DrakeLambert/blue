using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Api.ServiceRegistration
{
    /// <remarks>
    /// Implementation from https://greatrexpectations.com/2018/10/25/decorators-in-net-core-with-dependency-injection
    /// </remarks>
    public static class DecoratorServiceCollectionExtensions
    {
        public static IServiceCollection Decorate<TBaseService, TDecorator>(this IServiceCollection services)
            where TBaseService : class
            where TDecorator : class, TBaseService
        {
            var baseServices = services
                .Where(service => service.ServiceType == typeof(TBaseService))
                .ToList();

            if (!baseServices.Any())
            {
                throw new InvalidOperationException($"Cannot decorate type {typeof(TBaseService).Name} because it is not registered.");
            }

            var decoratorFactory = ActivatorUtilities.CreateFactory(typeof(TDecorator), new[] { typeof(TBaseService) });

            var decoratedServices = baseServices.Select(baseService => ServiceDescriptor.Describe(
                serviceType: typeof(TBaseService),
                implementationFactory: services => (TBaseService)decoratorFactory(services, new[] { services.CreateInstance(baseService) }),
                lifetime: baseService.Lifetime));

            services.RemoveAll<TBaseService>();
            services.Add(decoratedServices);

            return services;
        }

        private static object CreateInstance(this IServiceProvider services, ServiceDescriptor descriptor)
        {
            if (descriptor.ImplementationInstance != null)
            {
                return descriptor.ImplementationInstance;
            }

            if (descriptor.ImplementationFactory != null)
            {
                return descriptor.ImplementationFactory(services);
            }

            return ActivatorUtilities.GetServiceOrCreateInstance(services, descriptor.ImplementationType);
        }
    }
}