import React from 'react';
import { Table } from 'antd';

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
        title: 'БИЕ ДААЛТ',
        dataIndex: 'index',
        key: 'index',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        code: 32,
        index: 0
    },
    {
        key: '2',
        name: 'Jim Green',
        code: 42,
        index: 0
    },
    {
        key: '3',
        name: 'Joe Black',
        code: 32,
        index: 0
    },
];
const TableStyle = {
    marginTop: 80
}
const Lesson = () => {
    return(
        <div style={TableStyle}>
            <h1>Сонгосон хичээл</h1>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
}

export default Lesson;