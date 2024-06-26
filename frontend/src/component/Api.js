export const ApiCall = async (message, link,chat_id) => {
    // message: conecnt of message, link: uuid of particular record, chat_id: chat_id (can be null or have id valu)
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/ask/${link}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, chat_id })
        });
        console.log(`React app url ${process.env.REACT_APP_API_URL}/ask/${link}`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error :', error);
        console.error('Response status :', error.response.status);
        console.error('Response data :', error.response.data)
        return { error: 'An error occurred while sending the message to the backend' };

    }
};