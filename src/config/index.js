const IDP_HOST = 'localhost';
const IDP_PORT = 9443;

export const IDP_BASE_URL = `https://${IDP_HOST}:${IDP_PORT}`;

export const IDP_DEVICE_AUTH_URL = `https://${IDP_HOST}:${IDP_PORT}/oauth2/device_authorize`; // WSO2 IS default device authorize endpoint
export const IDP_TOKEN_URL = `https://${IDP_HOST}:${IDP_PORT}/oauth2/token`; // WSO2 IS default token endpoint

export const CLIENT_ID = 'Jp0PGHmJ424CDVeOScvOcAis1tMa';

export const POLLING_INTERVAL = 5000; // In Milliseconds. Defauult value is 5000 ms (5 s)
export const POLLING_TIMEOUT = 10 // In minutes. Default value is 10 minutes

export const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:device_code';