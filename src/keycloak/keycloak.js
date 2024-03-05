const keycloak = {
    realm: "keycloakSSO",
    url: "http://localhost:8080/",
    clientId: "keycloak_rest_api",
    onLoad: 'check-sso', // check-sso | login-required
    KeycloakResponseType: 'code',
};

export default keycloak;