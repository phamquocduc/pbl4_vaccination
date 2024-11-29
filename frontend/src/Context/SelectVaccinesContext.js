import { useState, createContext, useEffect } from 'react';
import Record from '~/components/Record';

const SelectVaccinesContext = createContext();

function SelectVaccinesProvider({ children }) {
    // Danh sách vaccine vừa chon để mua
    const [selectVaccines, setSelectVaccines] = useState(() => {
        const storedVaccines = localStorage.getItem('selectVaccines');
        return storedVaccines ? JSON.parse(storedVaccines) : [];
    });

    // Ngày đăng kí
    const [selectedDate, setSelectedDate] = useState(() => {
        return localStorage.getItem('selectedDate') || null;
    });

    // Giờ đăng kí
    const [selectedTime, setSelectedTime] = useState(() => {
        return localStorage.getItem('selectedTime') || null;
    });

    // Record chọn để đăng kí
    const [selectedRecord, setselectedRecord] = useState(() => {
        const storedRecord = localStorage.getItem('selectedRecord');
        return storedRecord ? JSON.parse(storedRecord) : null;
    });

    // Hàm thêm Vaccine vào danh sách
    const AddVaccine = (vaccine) => {
        setSelectVaccines((prevSelected) => [...prevSelected, vaccine]);
    };

    // hàm xóa vaccine ra khỏi danh sách được chọn
    const DeleteVaccine = (vaccine) => {
        setSelectVaccines((prevSelected) => prevSelected.filter((item) => item.name !== vaccine.name));
    };

    //set ngày
    const ChooseTime = (date, time) => {
        setSelectedDate(date);
        setSelectedTime(time);
    };

    // Hàm chọn Record để đăng kí
    const ChooseRecord = (record) => {
        setselectedRecord(record);
    };
    // Hàm xóa
    // Lưu dữ liệu vào localStorage mỗi khi state thay đổi
    useEffect(() => {
        localStorage.setItem('selectVaccines', JSON.stringify(selectVaccines));
    }, [selectVaccines]);

    useEffect(() => {
        if (selectedDate) {
            localStorage.setItem('selectedDate', selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (selectedTime) {
            localStorage.setItem('selectedTime', selectedTime);
        }
    }, [selectedTime]);

    useEffect(() => {
        if (selectedRecord) {
            localStorage.setItem('selectedRecord', JSON.stringify(selectedRecord));
        }
    }, [selectedRecord]);

    return (
        <SelectVaccinesContext.Provider
            value={{
                selectVaccines,
                selectedDate,
                selectedTime,
                selectedRecord,
                setSelectedDate,
                setSelectedTime,
                ChooseRecord,
                AddVaccine,
                DeleteVaccine,
                setSelectVaccines,
            }}
        >
            {children}
        </SelectVaccinesContext.Provider>
    );
}

export { SelectVaccinesContext, SelectVaccinesProvider };
