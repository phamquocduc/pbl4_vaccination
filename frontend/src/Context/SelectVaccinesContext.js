import { useState, createContext } from 'react';
import Record from '~/components/Record';

const SelectVaccinesContext = createContext();

function SelectVaccinesProvider({ children }) {
    const [selectVaccines, setSelectVaccines] = useState([]); // Danh sách vaccine vừa chon để mua
    const [selectedDate, setSelectedDate] = useState(); // Ngày đăng kí
    const [selectedTime, setselectedTime] = useState(); // Giờ đăng kí
    const [selectedRecord, setselectedRecord] = useState(); // Record chọn để đăng kí

    // Hàm thêm Vaccine vào danh sách
    const AddVaccine = (vaccine) => {
        setSelectVaccines((prevSelected) => [...prevSelected, vaccine]);
    };

    // hàm xóa vaccine ra khỏi danh sách được chọn
    const DeleteVaccine = (vaccine) => {
        setSelectVaccines((prevSelected) => prevSelected.filter((item) => item.name !== vaccine.name));
    };

    //set ngày
    const ChooseTime = ({ date, time }) => {
        setSelectedDate(date);
        setselectedTime(time);
    };

    // Hàm chọn Record để đăng kí
    const ChooseRecord = ({ record }) => {
        setselectedRecord(record);
    };
    // Hàm xóa

    return (
        <SelectVaccinesContext.Provider
            value={{
                selectVaccines,
                selectedDate,
                selectedTime,
                selectedRecord,
                ChooseRecord,
                AddVaccine,
                setSelectVaccines,
            }}
        >
            {children}
        </SelectVaccinesContext.Provider>
    );
}

export { SelectVaccinesContext, SelectVaccinesProvider };

// import { useState, createContext, useEffect } from 'react';

// const SelectVaccinesContext = createContext();

// function SelectVaccinesProvider({ children }) {
//     // Khôi phục dữ liệu từ localStorage khi component load lần đầu
//     const [selectVaccines, setSelectVaccines] = useState(() => {
//         const storedVaccines = localStorage.getItem('selectVaccines');
//         return storedVaccines ? JSON.parse(storedVaccines) : [];
//     });

//     const [selectedDate, setSelectedDate] = useState(() => {
//         return localStorage.getItem('selectedDate') || null;
//     });

//     const [selectedTime, setselectedTime] = useState(() => {
//         return localStorage.getItem('selectedTime') || null;
//     });

//     const [selectedRecord, setselectedRecord] = useState(() => {
//         const storedRecord = localStorage.getItem('selectedRecord');
//         return storedRecord ? JSON.parse(storedRecord) : null;
//     });

//     // Hàm thêm Vaccine vào danh sách
//     const AddVaccine = (vaccine) => {
//         setSelectVaccines((prevSelected) => {
//             const updatedList = [...prevSelected, vaccine];
//             localStorage.setItem('selectVaccines', JSON.stringify(updatedList)); // Lưu vào localStorage
//             return updatedList;
//         });
//     };

//     // Hàm xóa vaccine
//     const DeleteVaccine = (vaccine) => {
//         setSelectVaccines((prevSelected) => {
//             const updatedList = prevSelected.filter((item) => item.name !== vaccine.name);
//             localStorage.setItem('selectVaccines', JSON.stringify(updatedList)); // Lưu vào localStorage
//             return updatedList;
//         });
//     };

//     // Chọn ngày và giờ
//     const ChooseTime = ({ date, time }) => {
//         setSelectedDate(date);
//         setselectedTime(time);
//         localStorage.setItem('selectedDate', date); // Lưu ngày
//         localStorage.setItem('selectedTime', time); // Lưu giờ
//     };

//     // Chọn record
//     const ChooseRecord = ({ record }) => {
//         setselectedRecord(record);
//         localStorage.setItem('selectedRecord', JSON.stringify(record)); // Lưu record
//     };

//     return (
//         <SelectVaccinesContext.Provider
//             value={{
//                 selectVaccines,
//                 selectedDate,
//                 selectedTime,
//                 selectedRecord,
//                 ChooseRecord,
//                 AddVaccine,
//                 DeleteVaccine,
//                 ChooseTime,
//             }}
//         >
//             {children}
//         </SelectVaccinesContext.Provider>
//     );
// }

// export { SelectVaccinesContext, SelectVaccinesProvider };
