import React, { useState} from "react";
import './App.css'
import {Button, ConfigProvider, Image} from "antd";
import MainKeycloak from "./keycloak/MainKeycloak";
import ContextLogin from "./components/contextLogin";
import mnMn from "antd/locale/mn_MN";
const App = () => {

    const [keycloakToken, setKeycloakToken] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [orgInfo, setOrgInfo] = useState(null);
    const [loggedUserDetail, setLoggedUserDetail] = useState();
    const [userCompPer, setUserCompPer] = useState();
    const [reLoadUser, setReLoadUser] = useState(0);
    const [isUserRequest, setIsUserRequest] = useState(false);
    const [systemExceptionMessages, setSystemExceptionMessages] = useState();
    const [exceptionMessage, setExcMessage] = useState();
    return (
        <ConfigProvider
            locale={mnMn}
            theme={{
                token: {
                    colorPrimary: "#1490ff",
                },
            }}
        >
            <ContextLogin.Provider
                value={{
                    keycloakToken,
                    setKeycloakToken,
                    loggedUser,
                    setLoggedUser,
                    reLoadUser,
                    setReLoadUser,
                    loggedUserDetail,
                    setLoggedUserDetail,
                    isUserRequest,
                    setIsUserRequest,
                    orgInfo,
                    setOrgInfo,
                    userCompPer,
                    setUserCompPer,
                    systemExceptionMessages,
                    setSystemExceptionMessages,
                    exceptionMessage
                }}
            >
               <MainKeycloak />

            </ContextLogin.Provider>
        </ConfigProvider>
    )
}

export default App;
