import React from 'react';
import {Avatar, Button, Card, Layout, Menu} from 'antd';
import Meta from "antd/es/card/Meta";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import TeacherLesson from "../teacherLesson/TeacherLesson";
import TeacherResponsibility from "../teacherResponsibility/TeacherResponsibility";

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

const MainTeacher = () => {

    return (
        <Router>
            <Layout>
                <Content>
                    <Header style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Menu theme="dark" mode="horizontal" style={{
                            maxWidth: 700,
                            width: 700,
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}>
                            <Link to="/TeacherLesson"><Button type="default">НҮҮР</Button></Link>
                            <Link to="/TeacherResponsibility"><Button type="default">Хичээлийн Мэдээлэл оруулах</Button></Link>
                            <Link to="/lesson"><Button type="default">НЭМЭЛТ ДААЛГАВАР ОРУУЛАХ</Button></Link>
                        </Menu>
                    </Header>
                    <Layout style={LayoutStyle}>
                        <Content style={headerStyle}>
                            <h4 style={{color: '#000'}}>ИДЭВХТЭЙ УЛИРАЛ: ХАВАР</h4>
                            <Card style={{width: 300, marginTop: 16}}>
                                <Meta
                                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"/>}
                                    title="Багшийн Нэр"
                                    description="CS.203"
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
                                    element={<TeacherLesson />}
                                ></Route>
                                <Route
                                    path="/TeacherLesson"
                                    element={<TeacherLesson />}
                                ></Route>
                                <Route
                                    path="/TeacherResponsibility"
                                    element={<TeacherResponsibility />}
                                ></Route>
                                {/*<Route*/}
                                {/*    path="/lesson"*/}
                                {/*    element={<Lesson />}*/}
                                {/*></Route>*/}
                            </Routes>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Router>
    )
}
export default MainTeacher;