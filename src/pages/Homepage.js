import React, {useEffect, useState} from 'react';
import { LaptopOutlined,MenuUnfoldOutlined, MenuFoldOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Layout, Menu, Table, theme} from 'antd';


const { Header, Content, Sider } = Layout;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const teacherDataSource = [
    {
        key: '1',
        name: 'teacher_1',
        age: 32,
        address: 'MS_D209',
    },
    {
        key: '2',
        name: 'teacher_2',
        age: 42,
        address: 'GG_R234',
    },
];
const studentDataSource = [
    {
        key: '1',
        name: 'student_1',
        age: 32,
        address: 'b200910803',
    },
    {
        key: '2',
        name: 'student_2',
        age: 42,
        address: 'b200910039',
    },
];
const Columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];


const App = (roles) => {
    const [collapsed, setCollapsed] = useState(false);
    const [dataCourse, setDataCourse] = useState([]);

    const role = () => {
        roles.roles.map((item, index)  => {
            console.log('item', item)
            if(item === "client_student"){
                setDataCourse(studentDataSource);
            }else{
                setDataCourse(teacherDataSource);
            }
        })
    }

    useEffect(() => {
        role();
    }, []);


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
            <Layout style={{marginTop: '200px'}}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    width={200}
                    height={'100%'}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items2}
                    />
                </Sider>
                <Layout
                    style={{
                        height: '100%',
                        padding: '0 24px 24px',
                    }}
                >
                    <Header
                        style={{
                            display: "flex",
                            background: colorBgContainer,

                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Table dataSource={dataCourse} columns={Columns} />;
                    </Content>
                </Layout>
            </Layout>
    );
};
export default App;
