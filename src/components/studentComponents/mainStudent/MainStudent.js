import React from 'react';
import {Layout, Menu, theme} from 'antd';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
const { Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('НҮҮР', '1', <PieChartOutlined />),
    getItem('ЦАХИМ СУРГАЛТ', '2', <DesktopOutlined />),
    getItem('БАНКНЫ КАРТ ЗАХИАЛГА', '3', <ContainerOutlined />),
    getItem('ОЮУТАН', 'sub1', <MailOutlined />, [
        getItem('Хувийн мэдээлэл', '5'),
        getItem('Сургалтын төлөвлөгөө', '6'),
        getItem('Төлбөрийн мэдээлэл', '7'),
        getItem('Сорил, явцын оноо', '8'),
    ]),
    getItem('ХИЧЭЭЛ', 'sub2', <AppstoreOutlined />, [
        getItem('Хичээл сонголт 1', '9'),
        getItem('Хичээл сонголт 2', '10'),
        getItem('ТОДОРХОЙЛОЛТ', 'sub3', null, [getItem('ТОДОРХОЙЛОЛТ-Англи', '11'), getItem('ТОДОРХОЙЛОЛТ-Монгол', '12')]),
    ]),
];
const MainStudent = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
            <Layout style={{height:'100%'}}>
                <Sider
                    style={{
                        background: colorBgContainer,
                    }}
                    width={256}
                >
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        items={items}
                    />
                </Sider>
                <Content
                    style={{
                        padding: '0 24px',
                        minHeight: 280,
                        fontSize: '40px',
                        fontWeight: 'bold'
                    }}
                >
                    Student
                </Content>
            </Layout>
    )
}
export default MainStudent;