import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProvider({ children }) {
    // tạo useState để lưu giá trị của user
    const [user, setUser] = useState();

    //
    const login = (userData) => {
        setUser(userData); // Cập nhật thông tin user
        localStorage.setItem('user', JSON.stringify(userData)); // lưu token vào localStorage để lưu trữ trang
    };

    const logout = () => {
        setUser(null); // logout là xóa thông tin user
        localStorage.removeItem('user');
    };

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser)); // Khôi phục trạng thái từ localStorage
            }
        } catch (error) {
            console.error('Error reading user from localStorage:', error);
        }
    }, []);

    return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
