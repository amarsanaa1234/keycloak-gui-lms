import React from 'react';
import {Button, Layout, Menu} from "antd";
import contextKeycloak from "../../keycloak/contextKeycloak";


const { Header} = Layout;
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
                <h1>ЦАХИМ СУРГАЛТ</h1>
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