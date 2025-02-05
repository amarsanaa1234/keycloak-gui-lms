import React from 'react';
import {Avatar, Button, Card, Layout, Menu} from 'antd';
import Meta from "antd/es/card/Meta";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Lesson from "../lesson/Lesson";
import Responsibility from "../responsibility/Responsibility";


const { Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    width: 300,
    maxWidth:300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItem: 'center',
    gap: 10,
};

const LayoutStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 30
}

const { Header} = Layout;

const MainStudent = () => {
    return (
        <Router>
            <Layout>
                <Content>
                    <Header style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Menu theme="dark" mode="horizontal" style={{
                                maxWidth: 500,
                                width: 500,
                                display: "flex",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Link to="/lesson"><Button type="default">НҮҮР</Button></Link>
                            <Link to="/responsibility"><Button type="default">БИЕ ДААЛТ</Button></Link>
                            <Link to="/lesson"><Button type="default">НЭМЭЛТ ДААЛГАВАР</Button></Link>
                        </Menu>
                    </Header>
                    <Layout style={LayoutStyle}>
                        <Content style={headerStyle}>
                            <h4 style={{color: '#000'}}>ИДЭВХТЭЙ УЛИРАЛ: ХАВАР</h4>
                            <Card style={{width: 300, marginTop: 16}}>
                                <Meta
                                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"/>}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                            <div style={{
                                border: '1px solid #f0f0f0',
                                background: '#ffffff',
                                color: '#000',
                                borderRadius: 8,
                            }} >
                                <p>Улирал сонгох</p>
                            </div>
                            <Card style={{width: 300, marginTop: 16, textAlign:'start'}}>
                                <h3>МЭДЭЭ, МЭДЭЭЛЭЛ</h3>
                                <div style={{borderTop: '1px solid #000'}}>
                                    <p>Өндөржүүлсэн бэлэн байдлын үед сургалтын үйл ажиллагааны оюутанд зориулсан зөвлөмж</p>
                                </div>
                            </Card>
                            <Card style={{width: 300, marginTop: 16, textAlign:'start'}}>
                                <h3>ТУСЛАМЖ</h3>
                                <div style={{borderTop: '1px solid #000'}}>
                                    <p>Гарын авлага</p>
                                </div>
                            </Card>
                        </Content>
                        <Content>
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Lesson />}
                                ></Route>
                                <Route
                                    path="/lesson"
                                    element={<Lesson />}
                                ></Route>
                                <Route
                                    path="/responsibility"
                                    element={<Responsibility />}
                                ></Route>
                                <Route
                                    path="/lesson"
                                    element={<Lesson />}
                                ></Route>
                            </Routes>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Router>
    )
}
export default MainStudent;