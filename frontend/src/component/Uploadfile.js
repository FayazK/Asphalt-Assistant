import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Card } from 'antd';

const { Meta } = Card;
const { Dragger } = Upload;
const draggerStyle = {
    border: '2px dashed #1890ff',
    height: '500px',
    backgroundColor: '#f0f2f5',
    width: '80%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    
};
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    width: '650px',
    margin: 0,
    padding: 0,
    backgroundColor: '#eeeeee',
    borderRadius:'20px'
};
const containerstyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
}


const props = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:5000/upload',
    onChange(info) {
        const { status, response  } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            const errorMessage = response && response.error && response.error.message;
            message.error(`${info.file.name} file upload failed.${errorMessage || 'Unknown error'}`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const UploadFile = () => (
    <>
        <h3  style={{ textAlign: 'center', marginBottom: '20px' }}>Upload files to create assistant</h3>
        <div style={containerstyle}>
        <Card
            hoverable
            style={containerStyle}
        >
            <Dragger {...props} style={draggerStyle}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text" >Click here to upload files or drag file here</p>
                <p className="ant-upload-hint"  >
                    This file will be used as knowledge of the newly created assistant later you can chat with this assistant once created.
                </p>
            </Dragger>
        </Card>
        </div>
    </>
);
export default UploadFile;