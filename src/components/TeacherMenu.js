import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Button, Menu} from 'antd';
import kc from "../keycloak/KeyCloakSetting";
import {initKeycloak, isAuthenticated} from '../keycloak/keycloak';

const items = [
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
        disabled: true,
    },
    {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
        key: 'alipay',
    },
];
const TeacherMenu = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return
    <>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
        {isAuthenticated && (<Button onClick={() => kc.logout()}>
            Гарах
        </Button>)}
    </>
};
export default TeacherMenu;