

export const ApiCall = async (message, link) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/ask/${link}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        console.log(`React app url ${process.env.REACT_APP_API_URL}`)
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