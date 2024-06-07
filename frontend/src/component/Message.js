import React from "react";
import { Avatar } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

export default function Message({ question, isUserMessage }) {
    
    const containerStyle = {
        display: 'flex',
        justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
        marginBottom: '10px',
    };

    const messageStyle = {
        backgroundColor: isUserMessage ? "rgb(107 185 238)" : "rgb(127 153 179)",
        overflowY: "auto",
        color: '#fff',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '75%',
        textAlign: "left",
        scrollbarWidth: 'thin',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 0.5s ease-in-out',
        animationName: 'fadeIn',
    };
    
    const avatarStyle = {
        marginRight: isUserMessage ? '0' : '10px',
        marginLeft: isUserMessage ? '10px' : '0',
        backgroundColor: isUserMessage ? "rgb(107 185 238)" : "rgb(127 153 179)",
    };

    const createMarkup = () => {
        if (typeof question === "string") {
            return { __html: question };
        } else {
            return { __html: question.toString() };
        }
    };
    return (
        <>
            <div style={containerStyle}>
                {!isUserMessage && <Avatar size={35} icon={<RobotOutlined />} style={avatarStyle} />}
                <span style={messageStyle} dangerouslySetInnerHTML={createMarkup()} />
                {isUserMessage && <Avatar size={35} icon={<UserOutlined />} style={avatarStyle} />}
            </div>
            <style>
                {`
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
        </>
    )
}