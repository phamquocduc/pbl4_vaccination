import { useState, createContext, Children } from 'react';

const UserContext = createContext();

function UserProvider({ Children }) {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData); // Cập nhật thông tin user
    };

    const logout = () => {
        setUser(null); // logout là xóa thông tin user
    };

    return <UserContext.Provider value={{ user, login, logout }}>{Children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
