import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const VaccineContext = createContext();

function VaccineProvider({ children }) {
    const [vaccines, setVaccines] = useState([
        {
            name: 'Vắc xin Hắc lào',
            origin: 'GSK(Bỉ)',
            type: 'Tiêm vào da',
            effect: 'Vắc xin Hắc lào',
            availableDoses: '1000',
            price: '3,890,000',
        },
        {
            //id: '',
            name: 'Vaccine Vero Cell của Sinopharm',
            origin: 'Trung Quốc',
            type: 'Tiêm vào da',
            effect: 'covid',
            availableDoses: '1000',
            //images: string[],
            price: '200,000',
        },
        {
            //id: '',
            name: 'Vaccine COVID-19 Vaccine AstraZeneca',
            origin: '',
            type: 'Tiêm vào da',
            effect: 'covid',
            availableDoses: '1000',
            //images: string[],
            price: '100,000',
        },
        {
            //id: '',
            name: 'Vaccine Gam-COVID-Vac ',
            origin: 'Nga',
            type: 'Tiêm vào da',
            effect: 'covid',
            availableDoses: '1000',
            //images: string[],
            price: '200,000',
        },
    ]);

    // Lấy danh sách vaccine từ API
    // useEffect(() => {
    //     const fetchVaccines = async () => {
    //         try {
    //             const response = await axios.get('/api/vaccines'); // Đường dẫn API của bạn
    //             setVaccines(response.data);
    //         } catch (err) {
    //             console.error('Error fetching vaccines:', err);
    //             setError('Failed to fetch vaccine data.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchVaccines();
    // }, []);

    return <VaccineContext.Provider value={{ vaccines }}>{children}</VaccineContext.Provider>;
}

export { VaccineContext, VaccineProvider };
