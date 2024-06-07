// const BASE_URL = 'http://127.0.0.1:5000';
// `${BASE_URL}/ask`

export const ApiCall = async (message, link) => {
    try {
        const response = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error ishaq:', error);
        console.error('Response status ishaq:', error.response.status);
        console.error('Response data ishaq:', error.response.data)
        return { error: 'An error occurred while sending the message to the backend' };

    }
};