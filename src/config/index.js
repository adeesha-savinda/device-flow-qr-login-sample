const IDP_HOST = '<HOST> ex: localhost or 192.168.1.100 or identityserver.com';
const IDP_PORT = '<PORT> ex: 9443 which is the default port for WSO2 Identity Server';

export const IDP_BASE_URL = `https://${IDP_HOST}:${IDP_PORT}`;

export const IDP_DEVICE_AUTH_EP = `https://${IDP_HOST}:${IDP_PORT}/oauth2/device_authorize`; // WSO2 Identiyty Server default device authorize endpoint

export const CLIENT_ID = '<CLIENT ID OF THE CONFIGURED APPLICATION>';