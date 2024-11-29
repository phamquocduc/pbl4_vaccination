import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const VaccineContext = createContext();

function VaccineProvider({ children }) {
    const [vaccines, setVaccines] = useState([]);
    // {
    //     name: 'Vaccine Vero Cell của Sinopharm',
    //     origin: 'Trung Quốc',
    //     type: 'Tiêm qua da',
    //     effect: 'covid',
    //     availableDoses: 10000,
    //      doseNumber: 2,
    //      durationIntervals: 30,
    //     images: null,
    //     price: 200000,
    //     description: null,
    // },

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVaccines = async () => {
            try {
                const response = await axios.get('http://localhost:3000/vaccine');
                setVaccines(response.data);
            } catch (err) {
                console.error('Error fetching vaccines:', err);
                setError('Failed to fetch vaccine data.');
            } finally {
                setLoading(false);
            }
        };

        fetchVaccines();
    }, []);

    if (loading) return <p>Loading vaccines...</p>;
    if (error) return <p>{error}</p>;

    return <VaccineContext.Provider value={{ vaccines }}>{children}</VaccineContext.Provider>;
}

export { VaccineContext, VaccineProvider };
