import React, { useState, useEffect } from 'react';
import BaseScreen from "./BaseScreen";
import { Table, Space } from "antd";
import { Typography } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'

export default function BookScreen(props) {
    const [books, setBooks] = useState([]);
    const { Title } = Typography;

    let history = useHistory();

    useEffect( () => {
        axios
            .get("/books/")
            .then(response => {
                console.log(response.data)
                setBooks(response.data)
            })
            .finally(() => {
            })
    }, []);

    function handleBookRedirect(id){
        console.log(id);

        history.push("/editbook/" + id);

    }

    const columns = [
       {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: 'Publisher',
        dataIndex: 'publisher',
        key: 'publisher',
      },
      {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Edit</a>
            <a><Link to={`/deletebook/${record.id}`}>Delete</Link></a>
          </Space>
        ),
      },
    ];

    return (
        <BaseScreen>
                <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <Title level={3}>Books</Title>
                            </Col>
                            <Col span={12}>
                                <Link to={`/addbook`}><Button type="primary">Add Book</Button></Link>
                            </Col>
                        </Row>
                        <Table
                            columns={columns}
                            dataSource={books}
                            onRow={(record, rowIndex) => {
                                return {
                                  onClick: event => {
                                    console.log(record, rowIndex);
                                    handleBookRedirect(record.id)
                                  },

                                };
                            }}
                        />
                    </Col>
                    <Col span={6}></Col>
                </Row>
        </BaseScreen>
    )
}



