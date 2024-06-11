import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, error } from 'antd';
import UploadFile from './Uploadfile';
import ChatWindow from './ChatWindow';
import { BrowserRouter } from 'react-router-dom';
import config from "../config";

const { Meta } = Card;
// const BASE_URL = 'http://127.0.0.1:5000/';

const cardStyle = {
  width: 200,
  margin: '0 auto',
  borderRadius: '10px',
  backgroundColor: '#eeeeee',
  borderRadius: '20px',
  transition: 'transform 0.3s ease',

};

const AssistantCards = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("")
  const [link, setLink] = useState('')
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/`);
      const jsonData = await response.json();
      setData(jsonData);

      setData(prevData => ([
        ...prevData,
        {
          name: 'Add new',
          date: 'Click here!',
          image: '/plus.png',
          link: 'no link'
        }
      ]));
    } catch (error) {
      setError(error);
      console.error('Error:', error);
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  };

  const handleClick = (e, name, link) => {
    e.preventDefault()
    setQuery(name)
    setLink(link)
  }
  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert message="Error" description="Failed to load data." type="error" showIcon />
      </div>
    );
  }

  if (query === "") {
    return (
      <div style={{ marginTop: "10px", }}>
        <Row gutter={[10, 10]} style={{ margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          {data.map((item, index) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={6}
              style={{ padding: 0, display: 'flex', justifyContent: 'center', margin: '10px' }}
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Card
                  hoverable
                  style={cardStyle}
                  onClick={(e) => handleClick(e, item.name, item.link)}
                  cover={<img alt={item.name} src={item.image} style={{ height: '180px' }} />}
                >
                  {index === data.length - 1 ? (
                    <Meta title={item.name} description={item.date} />
                  ) : (
                    <Meta title={`File name: ${item.name}`} description={`Date created: ${item.date}`} />
                  )}
                  <style>
                    {`
                      .ant-card-meta-description {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      }
                    `}
                  </style>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
  else if (query === "Add new") {
    return (
      <UploadFile />
    )
  } else {
    return (
      <ChatWindow link={link} />
    )

  }
};

export default AssistantCards;
