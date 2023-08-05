export const auth_config = {
  "domain": process.env['AUTH_DOMAIN'],
  "clientId": process.env['AUTH_CLIENT'],
  "audience": process.env['AUTH_AUDIENCE'],
  "apiUri": process.env['API_URL'],
  "appUri": process.env['APP_URL'],
  "errorPath": "/error"
}
