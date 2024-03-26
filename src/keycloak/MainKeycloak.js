import { KeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import React, {useContext, useState} from "react";
import contextLogin from "../components/contextLogin";
import contextKeycloak from "../keycloak/contextKeycloak";
import Homepage from "../pages/Homepage";
import MainTeacher from "../components/teacherComponents/MainTeacher";
import MainStudent from "../components/studentComponents/mainStudent/MainStudent";
import MainHeader from "../components/toolComponents/MainHeader";
import {Layout} from "antd";
import MainFooter from "../components/toolComponents/MainFooter";
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
const { Content } = Layout;

const layoutStyle = {
    borderRadius: '8px',
    width: '100vw',
    height: '100vh',
}
const contentStyle = {
    textAlign: 'center',
    height: '100vh'
}
const MainKeycloak = () => {
    const { setKeycloakToken, setLoggedUserDetail } = useContext(contextLogin);
    const [loadingUseEffect, setLoadingUseEffect] = useState(true);
    const [loadingKeycloak, setLoadingKeycloak] = useState(true);
    const [role, setRole] = useState([]);

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
            console.log('token: ', keycloak.tokenParsed);
            setKeycloakToken(token);
            setLoggedUserDetail(keycloak.tokenParsed);
            setRole(keycloak.tokenParsed.resource_access.keycloak_rest_api.roles);
        }
    };
    const roleComponents = role.map((item, index)=> {
            if (item === 'client_student') {
                return <MainStudent/>
            } else if(item === 'client_teacher'){
                return  <MainTeacher/>
            }
        }
    )

    React.useEffect(() => {
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
                            <Layout style={layoutStyle}>
                                <Content style={contentStyle}>
                                    <MainHeader/>
                                    {roleComponents}
                                    <MainFooter/>
                                </Content>
                            </Layout>
                        }
                    </contextKeycloak.Provider>
                </KeycloakProvider>
            )}
        </div>
    );
};

MainKeycloak.propTypes = {};

export default MainKeycloak;
