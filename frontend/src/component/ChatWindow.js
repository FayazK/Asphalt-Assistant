import React from "react";
import InputBox from "./InputBox";
import Message from "./Message";
import { useState } from "react";
import { ApiCall } from "./Api";
import { Spin } from "antd";

export default function ChatWindow({ link }){
    console.log(`linnnnnn ${link}`)
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleQuestionSubmit = async (question) => {
        setQuestionsAndAnswers(prevState => [...prevState, { question, answer: '' }]); 
        setLoading(true);

        try {
            const responseData = await ApiCall(question, link);
            console.log(`link chatwindow.js === ${link}`)
            updateAnswer(responseData.message, question);
        } catch (error) {
            console.error('Error fetching data:', error);
            updateAnswer('An error occurred while fetching data.', question);
        }finally {
            setLoading(false); 
        }
    };

    const updateAnswer = (answer, question) => {
        setQuestionsAndAnswers(prevState =>
            prevState.map(qa => (qa.question === question ? { ...qa, answer } : qa))
        );
    };
    const stylecontainer = {overflow:'auto' ,  padding: '10px', display:'flex',flexDirection:'column-reverse', height: "73vh", width: '57%',margin: '0 auto'}
    const spinnerContainerStyle = { 
        position: 'fixed',
        bottom: 120,
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        marginLeft: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        zIndex: 9999
    }
    return(
        <>
         <style>
            {`
            .container::-webkit-scrollbar {
                display: none;
            }
            `}
        </style>
        <div className="container" style={stylecontainer}>
        {questionsAndAnswers.slice().reverse().map((qa, index) => (
                <div key={index}>
                    <Message question={qa.question} isUserMessage={true} />  
                    {qa.answer && <Message question={qa.answer} isUserMessage={false} />} {/* Render the answer if available */}
                </div>
            ))}
        <InputBox onSubmit={handleQuestionSubmit} />
        {loading && (
                <div style={spinnerContainerStyle}>
                    <Spin />
                </div>
            )}
        </div>
        
        </>
    )
}