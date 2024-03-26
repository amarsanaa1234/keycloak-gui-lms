import { KeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import React, {useContext, useState} from "react";
import contextLogin from "../components/contextLogin";
import contextKeycloak from "../keycloak/contextKeycloak";
import Homepage from "../pages/Homepage";

const { REACT_APP_KEYCLOAK_URL, REACT_APP_KEYCLOAK_REALM, REACT_APP_KEYCLOAK_CLIENT_ID } = process.env;

const keycloak = new Keycloak({
    realm: REACT_APP_KEYCLOAK_REALM,
    url: REACT_APP_KEYCLOAK_URL,
    clientId: REACT_APP_KEYCLOAK_CLIENT_ID,
    "ssl-required": "external",
    verifyTokenAudience: true,
    "public-client": true,
});

const keycloakProviderInitConfig = {
    promiseType: "native",
    checkLoginIframe: false,
    onLoad: 'login-required'
};
// keycloak.init({
//     onLoad: 'check-sso'
// });
const MainKeycloak = () => {
    const { setKeycloakToken, setLoggedUserDetail } = useContext(contextLogin);
    const [loadingUseEffect, setLoadingUseEffect] = useState(true);
    const [loadingKeycloak, setLoadingKeycloak] = useState(true);

    const loginUser = () => {
        keycloak.login();
    };
    const logoutUser = () => {
        keycloak.logout();
    };

    const onKeycloakEvent = (event) => {
        console.log(event);
        if (event === 'onReady') {
            setLoadingKeycloak(false);
        } else if (event === "onAuthSuccess") {
        } else if (event === "onAuthError") {
        }
    };
    const onKeycloakTokens = (tokens) => {
        const { token } = tokens;
        if (token) {
            setKeycloakToken(token);
            setLoggedUserDetail(keycloak.tokenParsed);
        }
    };

    React.useEffect(() => {
        console.log("bishu")
        setLoadingUseEffect(false)
    }, []);

    return (
        <div>
            {!loadingUseEffect && (
                <KeycloakProvider
                    keycloak={keycloak}
                    initConfig={keycloakProviderInitConfig}
                    onTokens={onKeycloakTokens}
                    onEvent={onKeycloakEvent}
                >
                    <contextKeycloak.Provider
                        value={{
                            loginUser,
                            logoutUser,
                        }}
                    >
                        {!loadingKeycloak &&
                        <>HAHA</>
                            // <Homepage />
                        }
                    </contextKeycloak.Provider>
                </KeycloakProvider>
            )}
        </div>
    );
};

MainKeycloak.propTypes = {};

export default MainKeycloak;
