import React from 'react';
import {Space, Table, Tag} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
const columns = [
    {
        title: 'Хичээлийн нэр',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Хичээлийн код',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Нийт оюутаны тоо',
        dataIndex: 'totulStudent',
        key: 'totulStudent',
    },
    {
        title: 'Бие даалт оруулсан оюутан',
        dataIndex: 'inputLesson',
        key: 'inputLesson',
    },
    {
        title: 'Хичээлийн хуваарь',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a><EyeOutlined /> Харах</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'Бакалаврын дипломын төсөл /танхим /',
        code: 'F.CS330',
        totulStudent: 65,
        inputLesson: 30,
    },
    {
        key: '2',
        name: 'Программ хангамжийн төслийн менежмент /танхим /',
        code: 'F.CS315',
        totulStudent: 65,
        inputLesson: 30,
    },
    {
        key: '3',
        name: 'Параллель программчлал /танхим /',
        code: 'F.CS306',
        totulStudent: 65,
        inputLesson: 30,
    },
];
const TableStyle = {
    marginTop: 20
}
const TeacherLesson = () => {
    return(
        <div style={TableStyle}>
            <h1>Холбоост хичээл</h1>
            <Table style={{marginTop: 30}} columns={columns} dataSource={data} />
        </div>
    )
}

export default TeacherLesson;