import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: '7622f0f2-a7a5-4159-b23c-7c3b54947322',
    enableAutoRouteTracking: true
  }
})
appInsights.loadAppInsights()

export const trackPageView = () => {
  appInsights.trackPageView()
}
