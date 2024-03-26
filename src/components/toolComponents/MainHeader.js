import React from 'react';
import {Button, Image, Layout, Menu} from "antd";
import shutisImage from '../../img/mustlogo.png';
import contextKeycloak from "../../keycloak/contextKeycloak";


const { Header} = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    lineHeight: '64px',
    display: 'flex',
};
const MainHeader = () => {

    const { logoutUser } = React.useContext(contextKeycloak);

    return (
        <Header style={headerStyle}>
            <div className="demo-logo">
                <Image
                    width={400}
                    src={shutisImage}
                />
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                style={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <Button type="primary" onClick={logoutUser}>Гарах</Button>
            </Menu>
        </Header>
    )
}
export default MainHeader;