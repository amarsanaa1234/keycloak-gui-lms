import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {Button, Layout, Menu, message, Modal, Table, theme} from 'antd';
import contextLogin from "../components/contextLogin";
import contextKeycloak from "../keycloak/contextKeycloak"


const Homepage = () => {

    const {
        keycloakToken,
        setLoggedUser,
        reLoadUser,
        setReLoadUser,
        setIsUserRequest,
        exceptionMessage
    } = useContext(contextLogin);
    const { logoutUser } = React.useContext(contextKeycloak);
    const [loading, setLoading] = React.useState(true);

    const setToken = (token) => {
        axios.interceptors.request.use(
            (config) => {
                if (token) config.headers.Authorization = `Bearer ${token}`;
                else config.headers.Authorization = "";
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {



                if (
                    error.request &&
                    error.request.status === 500 &&
                    error.request.responseText
                ) {
                    var obj = JSON.parse(error.request.responseText);
                    if (obj.statusCode === 601) {
                        setReLoadUser(reLoadUser + 1);
                    }
                    if (obj.statusCode === 606) {
                        setIsUserRequest(true);
                    }
                }
                if (error && error.response && error.response.status === 401) {
                    Modal.confirm({
                        title: "Нэвтрэх эрхийн хугацаа дууслаа.",
                        // icon: <ExclamationCircleOutlined />,
                        maskClosable: true,
                        okText: "Гарах",
                        cancelButtonProps: {
                            hidden: true
                        },
                        onOk() {
                            logoutUser();
                        }
                    });
                    // } else if (error && error.response && error.response.status === 601) {
                    //   setReLoadUser(reLoadUser + 1);
                } else {
                    // This is important, so that unhandled cases make axios throw errors
                    return Promise.reject(error);
                }
            }
        );
    };

    React.useEffect(() => {
        if (keycloakToken) setToken(keycloakToken);
        else setLoading(false);
    }, [keycloakToken, reLoadUser]);

    return (
            <Layout style={{marginTop: '200px'}}>
                <p>asdas</p>
            </Layout>
    );
};
export default Homepage;
