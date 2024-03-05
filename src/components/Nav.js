import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import {Button, Flex, Image, Layout} from 'antd';
import {Header} from "antd/es/layout/layout";
import logo from "../img/mustlogo.png";

const Nav = () => {
    const { keycloak, initialized } = useKeycloak();
    return (
            <Header style={{background: "#1F2544"}}>
                <Flex justify={"space-between"} align={"center"} style={{width: "100%", height:"100%"}}>
                    <Image
                        src={logo}
                    />
                    {!!keycloak.authenticated && (<Button onClick={() => keycloak.logout()}>
                        Гарах
                    </Button>)}
                </Flex>
            </Header>
    );
};

export default Nav;
