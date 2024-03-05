import React from "react";
import {Button, Flex, Image} from 'antd';
import {Header} from "antd/es/layout/layout";
import logo from "../img/mustlogo.png";
import kc from "../keycloak/KeyCloakSetting";
import {initKeycloak, isAuthenticated} from '../keycloak/keycloak';

const Nav = () => {
    console.log('isAuthenticated123', isAuthenticated)
    return (
        < >
            <Header style={{background: "#1F2544"}}>
                <Flex justify={"space-between"} align={"center"} style={{width: "100%", height:"100%"}}>
                    <Image
                        src={logo}
                    />
                    {isAuthenticated && (<Button onClick={() => kc.logout()}>
                        Гарах
                    </Button>)}
                </Flex>
            </Header>
        </>
    );
};

export default Nav;
