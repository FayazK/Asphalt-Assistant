import React from "react"
import { useState } from "react"
import { Input } from 'antd';


export default function InputBox({ onSubmit }) {
    const [message, setMessage] = useState('')
    const [isFocused, setIsFocused] = useState(false);
    const HandleSubmit = (e) => {
        e.preventDefault();
        onSubmit(message);
        setMessage('');
    }
    const inputContainerStyle = {
        position: 'relative',
        width: '700px',
        margin: '0 auto',
    };
    const inputstyle = {
        width: '700px',
        height: '60px',
        borderRadius: '20px',
        transition: 'box-shadow 0.3s',
        boxShadow: isFocused ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none',
        padding: '0 50px 0 20px',
    }
    const buttonStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100px',
        borderRadius: '0 20px 20px 0', 
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    };
    return (
        <>
            <div className="container fixed-bottom" style={{ marginBottom: "20px" }}>
                <form onSubmit={HandleSubmit}>
                    <div style={inputContainerStyle}>
                        <Input type="text" name='u_input' id='input'
                            style={inputstyle}
                            placeholder="Enter your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <button className="btn-outline-secondary" style={buttonStyle} > <i class="bi-arrow-up-square-fill" style={{ fontSize: '1.7rem', color: 'black' }}></i> </button>
                    </div>
                </form>
            </div>
        </>
    )
}