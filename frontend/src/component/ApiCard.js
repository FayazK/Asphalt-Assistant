import config from "../config";

const [data, setData] = useState([]);



// const BASE_URL = 'http://127.0.0.1:5000/';
export const ApiCard = async () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/`);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error:', error);
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    };
}