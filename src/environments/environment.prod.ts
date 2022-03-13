export const environment = {
  api: {
    server: window.location.origin,
    auth: {
      prefix: 'auth',
      target: {
        login: 'login',
        signup: 'signup',
        logout: 'logout',
        refresh: 'refresh',
      }
    },
    map: {
      prefix: 'map',
      target: {
        reverse: 'reverse'
      }
    }
  },
  production: true
};