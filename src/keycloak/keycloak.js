import kc from "./KeyCloakSetting";

let isAuthenticated = false;

const initKeycloak = async () => {
    try {
        const auth = await kc.init({
            onLoad: kc.onLoad,
            KeycloakResponseType: 'code',
            silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
            checkLoginIframe: false,
            pkceMethod: 'S256'
        });

        if (auth) {
            console.info("Authenticated");
            isAuthenticated = true;
            kc.onTokenExpired = () => {
                console.log('token expired');
            };
        } else {
            console.warn("Not authenticated");
            isAuthenticated = false;
        }
    } catch (error) {
        console.error("Authenticated Failed:", error);
        isAuthenticated = false;
    }
};

export { initKeycloak, isAuthenticated };