import React from 'react';
import {Layout} from "antd";


const { Footer} = Layout;
const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#001529',
    marginTop: 40
};
const MainFooter = () => {
    return (
        <Footer style={footerStyle}>
            © 2024 Мэдээллийн технологийн төв
        </Footer>
    )
}
export default MainFooter;