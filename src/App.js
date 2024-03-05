import React, { useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import PrivateRoute from "./helpers/PrivateRoute";
import './App.css'
import {Button, Image} from "antd";
import shutis_logo from "./img/odon-must-sm.png";
import keycloak from './keycloak/keycloak'
import Keycloak from 'keycloak-js';


let kc = new Keycloak(keycloak);

kc.init({
    onLoad: keycloak.onLoad,
    KeycloakResponseType: 'code',
    silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html", checkLoginIframe: false,
    pkceMethod: 'S256'
}).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
        console.log('auth', auth)
        console.log('Keycloak', kc)
        kc.onTokenExpired = () => {
            console.log('token expired')
        }
    }
}, () => {
    console.error("Authenticated Failed");
});

function App() {

    console.log('kc///////', !kc.authenticated);

    return (
        <div className="App">
            {kc.authenticated ?
                <>
                    <Nav/>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<WelcomePage/>}/>
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

    // return (
    //     <div className="App">
    //         {kc.authenticated &&
    //         <>
    //             <Nav/>
    //             <BrowserRouter>
    //                 <Routes>
    //                     <Route exact path="/" element={<WelcomePage/>}/>
    //                     <Route
    //                         path="/secured"
    //                         element={
    //                             <PrivateRoute>
    //                                 <SecuredPage />
    //                             </PrivateRoute>
    //                         }
    //                     />
    //                 </Routes>
    //             </BrowserRouter>
                {/*{role === "client_admin" ?*/}
                {/*    <div>*/}
                {/*        admin*/}
                {/*    < /div> : <></>*/}
                {/*}*/}
                {/*{role === "client_student" ?*/}
                {/*    <div>*/}
                {/*        student*/}
                {/*    < /div> :*/}
                {/*    <>*/}
                {/*        <Nav/>*/}
                {/*        <BrowserRouter>*/}
                {/*            <Routes>*/}
                {/*                <Route exact path="/" element={<WelcomePage/>}/>*/}
                {/*                <Route*/}
                {/*                    path="/secured"*/}
                {/*                    element={*/}
                {/*                        <PrivateRoute>*/}
                {/*                            <SecuredPage />*/}
                {/*                        </PrivateRoute>*/}
                {/*                    }*/}
                {/*                />*/}
                {/*            </Routes>*/}
                {/*        </BrowserRouter>*/}
                {/*    </>*/}
                {/*}*/}
    //         </>
    //         }
    //     </div>
    // );
}

export default App;
