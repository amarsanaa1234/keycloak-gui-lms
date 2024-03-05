import Keycloak from "keycloak-js";

const kc = {
    realm: "keycloakSSO",
    url: "http://localhost:8080/",
    clientId: "keycloak_rest_api",
};
const keycloakSetting = new Keycloak(kc);
export default keycloakSetting;