import { useState, createContext } from 'react';

const SelectedVaccinesContext = createContext();
function SelectedVaccinesProvider({ children }) {
    // danh sách Vaccine đã chọn
    const [selectedVaccines, setSelectedVaccines] = useState([]);

    // Hàm thêm Vaccine vào danh sách
    const handleSelectVaccine = (vaccine) => {
        setSelectedVaccines((prevSelected) => [...prevSelected, vaccine]);
    };

    // hàm xóa vaccine ra khỏi danh sách được chọn
    const handleDeleteVaccine = (vaccine) => {
        setSelectedVaccines((prevSelected) => prevSelected.filter((item) => item.name !== vaccine.name));
    };

    // useEffect(() => {
    //     try {
    //         const storedUser = localStorage.getItem('user');
    //         if (storedUser) {
    //             setUser(JSON.parse(storedUser)); // Khôi phục trạng thái từ localStorage
    //         }
    //     } catch (error) {
    //         console.error('Error reading user from localStorage:', error);
    //     }
    // }, []);

    return (
        <SelectedVaccinesContext.Provider
            value={{ selectedVaccines, setSelectedVaccines, handleSelectVaccine, handleDeleteVaccine }}
        >
            {children}
        </SelectedVaccinesContext.Provider>
    );
}

export { SelectedVaccinesContext, SelectedVaccinesProvider };
