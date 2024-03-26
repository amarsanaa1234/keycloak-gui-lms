import React from 'react';
import {Layout, Menu} from "antd";


const { Footer} = Layout;
const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#001529',
};
const MainFooter = () => {
    return (
        <Footer style={footerStyle}>
            © 2005-2024 Монгол Улсын Шинжлэх Ухаан Технологийн Их Сургууль, Мэдээллийн технологийн төв
        </Footer>
    )
}
export default MainFooter;