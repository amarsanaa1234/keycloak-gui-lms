import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import PrivateRoute from "./helpers/PrivateRoute";
import './App.css'
import {Button, Image} from "antd";
import shutis_logo from "./img/odon-must-sm.png";
import {initKeycloak, isAuthenticated} from './keycloak/keycloak'
import kc from "./keycloak/KeyCloakSetting"
const App = () => {

    const [authInitialized, setAuthInitialized] = useState(false);
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        initKeycloak().then(() => {
            setAuthInitialized(true);
            const roles = kc.resourceAccess && kc.resourceAccess.keycloak_rest_api && kc.resourceAccess.keycloak_rest_api.roles || [];
            setUserRoles(roles);
        });
    }, []);


    return (
        <div className="App">
            {isAuthenticated ?
                <>
                    <div>
                        <Nav/>
                    </div>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<WelcomePage roles={userRoles}/>}/>
                            <Route
                                path="/secured"
                                element={
                                    <PrivateRoute>
                                        <SecuredPage />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </> :
                <>
                    <div>
                        <Image
                            width={400}
                            src={shutis_logo}
                        />
                        <Button type="primary" style={{background: "#121212", boxShadow: "0 0 0"}}
                                onClick={() => kc.login()}>
                            Нэвтрэх
                        </Button>
                    </div>
                    <p className={"mainTitle"}>ШИНЖЛЭХ УХААН, ТЕХНОЛОГИЙН ИХ СУРГУУЛЬ</p>
                </>
            }
        </div>
    )
}

export default App;
